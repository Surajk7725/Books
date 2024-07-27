import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlinePushpin, AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NavBar from '../navbar';
import Footer from './footer';
import NoteDetail from './noteDetails';

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
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
  const [selectedNote, setSelectedNote] = useState(null); // State for selected note

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'text/csv',
        'text/plain',
        'application/vnd.ms-powerpoint' 
      ];
      if (files[0] && allowedTypes.includes(files[0].type)) {
        setCurrentNote({
          ...currentNote,
          [name]: files[0]
        });
      } else {
        toast.error('Please select a valid document file (PDF, DOCX, XLSX, CSV)');
      }
    } else if (name === 'media') {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'video/mp4'];
      if (files[0] && allowedTypes.includes(files[0].type)) {
        setCurrentNote({
          ...currentNote,
          [name]: files[0]
        });
      } else {
        toast.error('Please select a valid image or video file (JPG, JPEG, PNG, SVG, MP4)');
      }
    } else if (name === 'song') {
      const allowedTypes = ['audio/mpeg', 'audio/wav'];
      if (files[0] && allowedTypes.includes(files[0].type)) {
        setCurrentNote({
          ...currentNote,
          [name]: files[0]
        });
      } else {
        toast.error('Please select a valid audio file (MP3, WAV)');
      }
    } else {
      setCurrentNote({
        ...currentNote,
        [name]: value
      });
    }
  };

  const addNote = () => {
    if (currentNote.title && currentNote.content) {
      const noteToAdd = {
        ...currentNote,
        pinned: false,
        date: new Date().toISOString() // Add date here
      };

      if (isEditing) {
        const updatedNotes = notes.map((note, index) => (index === editIndex ? noteToAdd : note));
        setNotes(updatedNotes);
        toast.success('Note edited successfully');
      } else {
        setNotes([...notes, noteToAdd]);
        toast.success('Note added successfully');
      }
      setCurrentNote({ title: '', content: '', file: null, media: null, song: null });
      setIsEditing(false);
      setEditIndex(null);
      setIsFormVisible(false);
    } else {
      toast.error('Title and Content are required');
    }
  };

  const editNote = (index) => {
    setCurrentNote({
      ...notes[index],
      date: notes[index].date
    });
    setIsEditing(true);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    toast.success('Note deleted successfully');
  };

  const pinNote = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, pinned: !note.pinned } : note
    );
    const pinnedNotes = updatedNotes.filter(note => note.pinned);
    const unpinnedNotes = updatedNotes.filter(note => !note.pinned);
    setNotes([...pinnedNotes, ...unpinnedNotes]);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeForm = () => {
    setCurrentNote({ title: '', content: '', file: null, media: null, song: null });
    setIsEditing(false);
    setEditIndex(null);
    setIsFormVisible(false);
  };

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
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-24">
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
                  className={`absolute top-2 right-2 ${note.pinned ? 'text-yellow-500' : 'text-gray-500'} text-2xl`}
                >
                  <AiOutlinePushpin />
                </button>
                
                <div className="flex-1">
                  <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{note.title}</h4>
                  {renderContent(note.content)}
                  <button 
                    onClick={() => viewNote(note)}
                    className="text-blue-500 underline mt-2"
                  >
                    More
                  </button>
                  {note.file && (
                    <a
                      href={URL.createObjectURL(note.file)}
                      download
                      className="block mt-2 text-blue-500 underline"
                    >
                      {note.file.name}
                    </a>
                  )}
                  {note.media && note.media.type.startsWith('image/') && (
                    <img
                      src={URL.createObjectURL(note.media)}
                      alt="Note visual"
                      className="w-full h-32 object-cover mt-2 rounded"
                    />
                  )}
                  {note.media && note.media.type.startsWith('video/') && (
                    <video
                      controls
                      src={URL.createObjectURL(note.media)}
                      className="w-full h-32 object-cover mt-2 rounded"
                    />
                  )}
                  {note.song && (
                    <audio controls className="w-full mt-2">
                      <source src={URL.createObjectURL(note.song)} type={note.song.type} />
                      Your browser does not support the audio element.
                    </audio>
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        editNote(index);
                      }}
                      className="text-blue-500"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(index);
                      }}
                      className="text-red-500"
                    >
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
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"> {/* Adjusted max-w-lg to max-w-2xl */}
              <div className="flex justify-end">
                <button className="text-gray-400 hover:text-gray-600" onClick={closeForm}>
                  <AiOutlineClose />
                </button>
              </div>
              <h2 className="font-bold mb-4 text-xl text-center">{isEditing ? 'Edit Note' : 'Add Note'}</h2>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="p-2 border rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currentNote.title}
                onChange={handleInputChange}
              />
              <div className="mb-2 h-24 overflow-y-scroll">
                <ReactQuill
                  value={currentNote.content}
                  onChange={(content) => setCurrentNote({ ...currentNote, content })}
                  className="mb-10"
                />
              </div>
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










