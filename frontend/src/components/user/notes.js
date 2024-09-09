import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlinePushpin, AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NavBar from '../navbar';
import Footer from './footer';
import NoteDetail from './noteDetails';
import axiosInstance from '../axiosInstance';

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return new Date(dateString).toLocaleString('en-US', options);
};

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentNote, setCurrentNote] = useState({ title: '', content: '', file: null, media: null, song: null });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/notes/display')
      .then((response) => setNotes(response.data))
      .catch(() => toast.error('Failed to fetch notes'));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setCurrentNote({ ...currentNote, [name]: files[0] });
    } else {
      setCurrentNote({ ...currentNote, [name]: value });
    }
  };

  const addNote = () => {
    if (currentNote.title && currentNote.content) {
      const formData = new FormData();
      formData.append('title', currentNote.title);
      formData.append('content', currentNote.content);
      if (currentNote.file) formData.append('file', currentNote.file);
      if (currentNote.media) formData.append('media', currentNote.media);
      if (currentNote.song) formData.append('song', currentNote.song);

      const request = isEditing
        ? axiosInstance.put(`/notes/update/${notes[editIndex]._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        : axiosInstance.post('/notes/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      request
        .then((response) => {
          const updatedNotes = isEditing
            ? notes.map((note, index) => (index === editIndex ? response.data : note))
            : [...notes, response.data];
          setNotes(updatedNotes);
          toast.success(isEditing ? 'Note edited successfully' : 'Note added successfully');
        })
        .catch(() => toast.error(isEditing ? 'Failed to edit note' : 'Failed to add note'));

      resetForm();
    } else {
      toast.error('Title and Content are required');
    }
  };

  const resetForm = () => {
    setCurrentNote({ title: '', content: '', file: null, media: null, song: null });
    setIsEditing(false);
    setEditIndex(null);
    setIsFormVisible(false);
  };

  const editNote = (index) => {
    setCurrentNote(notes[index]);
    setIsEditing(true);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const deleteNote = (index) => {
    axiosInstance
      .delete(`/notes/delete/${notes[index]._id}`)
      .then(() => {
        setNotes(notes.filter((_, i) => i !== index));
        toast.success('Note deleted successfully');
      })
      .catch(() => toast.error('Failed to delete note'));
  };

  const pinNote = (index) => {
    const noteToPin = notes[index];
    const formData = new FormData();
    formData.append('isPinned', JSON.stringify(!noteToPin.isPinned)); // Toggle pin status
    if (noteToPin.file) formData.append('file', noteToPin.file);
    if (noteToPin.media) formData.append('media', noteToPin.media);
    if (noteToPin.song) formData.append('song', noteToPin.song);

    axiosInstance
      .put(`/notes/pin/${noteToPin._id}`, formData)
      .then((response) => {
        const updatedNotes = notes.map((note, i) => (i === index ? response.data : note));
        const pinnedNotes = updatedNotes.filter((note) => note.isPinned);
        const unpinnedNotes = updatedNotes.filter((note) => !note.isPinned);
        setNotes([...pinnedNotes, ...unpinnedNotes]); // Reorder with pinned notes first
      })
      .catch(() => toast.error('Failed to pin/unpin note'));
  };


  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewNote = (note) => {
    setSelectedNote(note);
  };

  const closeNoteDetail = () => {
    setSelectedNote(null);
  };

  const renderContent = (content) => {
    const truncatedContent = content.split(' ').slice(0, 43).join(' ');
    return <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />;
  };

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="p-6 mb-20 relative pb-72">
        <div className="absolute top-0 right-0">
          <div className="relative max-w-md mr-10 mt-10">
            <input
              type="text"
              placeholder="Search Notes..."
              className="p-2 border rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BsSearch className="absolute top-3 right-3 text-gray-400" />
          </div>
        </div>

        {selectedNote ? (
          <NoteDetail note={selectedNote} onClose={closeNoteDetail} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-24">
            {filteredNotes.map((note, index) => (
              <div
                key={index}
                className="w-full h-auto flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 mb-6 py-5 px-4 shadow-md relative min-h-[300px]"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    pinNote(index);
                  }}
                  className={`absolute top-2 right-2 ${note.isPinned ? 'text-yellow-500' : 'text-gray-500'} text-2xl`}
                >
                  <AiOutlinePushpin />
                </button>


                <div className="flex-1">
                  <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{note.title}</h4>
                  {renderContent(note.content)}
                  <button onClick={() => viewNote(note)} className="text-blue-500 underline mt-2">
                    More
                  </button>

                  {/* Display Images */}
                  {note.media && (note.media.endsWith('.jpg') || note.media.endsWith('.jpeg') || note.media.endsWith('.png')) && (
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/${note.media}`}
                      alt="Note visual"
                      className="w-full h-32 object-cover mt-2 rounded"
                    />
                  )}

                  {/* Display Videos */}
                  {note.media && (note.media.endsWith('.mp4') || note.media.endsWith('.mov') || note.media.endsWith('.avi')) && (
                    <video controls className="w-full h-32 object-cover mt-2 rounded">
                      <source src={`${process.env.REACT_APP_API_URL}/uploads/${note.media}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  {/* Display Audio (Songs) */}
                  {note.song && (note.song.endsWith('.mp3') || note.song.endsWith('.wav') || note.song.endsWith('.ogg')) && (
                    <audio controls className="w-full mt-2">
                      <source src={`${process.env.REACT_APP_API_URL}/uploads/${note.song}`} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}

                  {/* Display Other Files (e.g., PDFs, Docs) */}
                  {note.file && (
                    <a
                      href={`${process.env.REACT_APP_API_URL}/uploads/${note.file}`}
                      download
                      className="block mt-2 text-blue-500 underline"
                    >
                      {note.file}
                    </a>
                  )}
                </div>

                <button
                  onClick={() => viewNote(note)}
                  className="p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                >
                  View
                </button>

                <div className="flex items-center justify-between text-gray-800 dark:text-gray-100 mt-4">
                  <p className="text-green-500 text-sm">{formatDate(note.date)}</p>
                  <div className="flex space-x-2 text-2xl">
                    <button onClick={() => editNote(index)} className="text-blue-500">
                      <AiOutlineEdit />
                    </button>
                    <button onClick={() => deleteNote(index)} className="text-red-500">
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isFormVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-4"> {/* Added mx-4 */}
              <div className="flex justify-end">
                <button className="text-gray-400 hover:text-gray-600" onClick={resetForm}>
                  <AiOutlineClose />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Note' : 'Add Note'}</h2>
              <input
                type="text"
                name="title"
                placeholder="Note Title"
                className="w-full mb-4 p-2 border rounded"
                value={currentNote.title}
                onChange={handleInputChange}
              />
              <ReactQuill
                value={currentNote.content}
                onChange={(value) => setCurrentNote({ ...currentNote, content: value })}
                className="mb-4"
              />
              <label className="block mb-2 font-bold text-gray-700">Attach a File:</label>
              <input
                type="file"
                name="file"
                className="p-2 border rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
              />
              <label className="block mb-2 font-bold text-gray-700">Attach an Image or Video:</label>
              <input
                type="file"
                name="media"
                className="p-2 border rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*,video/*"
                onChange={handleInputChange}
              />
              <label className="block mb-2 font-bold text-gray-700">Attach a Song:</label>
              <input
                type="file"
                name="song"
                className="p-2 border rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="audio/*"
                onChange={handleInputChange}
              />
              <button
                onClick={addNote}
                className="p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isEditing ? 'Update Note' : 'Add Note'}
              </button>
            </div>
          </div>
        )}

        <div className="absolute right-10 bottom-[-4rem]">
          <button
            onClick={() => setIsFormVisible(true)}
            className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl shadow-lg"
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Notes;










