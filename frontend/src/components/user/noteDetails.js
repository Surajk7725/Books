import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import NavBar from '../navbar';
import Footer from '../footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const NoteDetail = ({ note, setNotes, notes }) => {
  if (!note) {
    return <p>Note not found</p>;
  }

  const editNote = () => {
    // Logic to edit note can be added here
    // Example: set a state to edit mode and show edit form
  };

  const deleteNote = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter((n) => n !== note);
      setNotes(updatedNotes);
      toast.success('Note deleted successfully');
    }
  };

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="p-6 mb-20 relative pb-72">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4">{note.title}</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{note.content}</p>

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

          <div className="flex items-center justify-between text-gray-800 dark:text-gray-100 mt-4">
            <p className="text-black text-sm">{formatDate(note.date)}</p>
            <div className="flex space-x-2 text-2xl">
              <button onClick={editNote} className="text-blue-500">
                <AiOutlineEdit />
              </button>
              <button onClick={deleteNote} className="text-red-500">
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoteDetail;
