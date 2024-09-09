import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import 'react-quill/dist/quill.snow.css';

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

const NoteDetail = ({ note, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <div className="absolute top-4 right-4">
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            <AiOutlineClose size={24} />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">{note.title}</h2>
        <div className="mt-2 text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: note.content }} />
        
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
        <p className="text-gray-600 mt-4 text-right">{formatDate(note.date)}</p>
      </div>
    </div>
  );
};

export default NoteDetail;


