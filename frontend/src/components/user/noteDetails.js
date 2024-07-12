// import React from 'react';
// import { AiOutlineClose } from 'react-icons/ai';

// const formatDate = (dateString) => {
//   const options = { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric', 
//     hour: '2-digit', 
//     minute: '2-digit', 
//     second: '2-digit', 
//     hour12: false 
//   };
//   return new Date(dateString).toLocaleString('en-US', options);
// };

// const NoteDetail = ({ note, onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto relative">
//         <div className="absolute top-4 right-4">
//           <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
//             <AiOutlineClose size={24} />
//           </button>
//         </div>
//         <h2 className="text-2xl font-bold mb-4 text-center">{note.title}</h2>
//         <p className="mb-4 text-gray-700">{note.content}</p>
        
//         {note.file && (
//           <a
//             href={URL.createObjectURL(note.file)}
//             download
//             className="block mt-2 text-blue-500 underline"
//           >
//             {note.file.name}
//           </a>
//         )}
//         {note.media && note.media.type.startsWith('image/') && (
//           <img
//             src={URL.createObjectURL(note.media)}
//             alt="Note visual"
//             className="w-full h-auto object-cover mt-4 rounded"
//           />
//         )}
//         {note.media && note.media.type.startsWith('video/') && (
//           <video
//             controls
//             src={URL.createObjectURL(note.media)}
//             className="w-full h-auto object-cover mt-4 rounded"
//           />
//         )}
//         {note.song && (
//           <audio controls className="w-full mt-4">
//             <source src={URL.createObjectURL(note.song)} type={note.song.type} />
//             Your browser does not support the audio element.
//           </audio>
//         )}
        
//         <p className="text-gray-600 mt-4 text-right">{formatDate(note.date)}</p>
//       </div>
//     </div>
//   );
// };

// export default NoteDetail;


import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

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
        <p className="mb-4 text-gray-700">{note.content}</p>
        
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
            className="w-full h-auto max-h-64 object-cover mt-4 rounded"
          />
        )}
        {note.media && note.media.type.startsWith('video/') && (
          <video
            controls
            src={URL.createObjectURL(note.media)}
            className="w-full h-auto max-h-64 object-cover mt-4 rounded"
          />
        )}
        {note.song && (
          <audio controls className="w-full mt-4">
            <source src={URL.createObjectURL(note.song)} type={note.song.type} />
            Your browser does not support the audio element.
          </audio>
        )}
        
        <p className="text-gray-600 mt-4 text-right">{formatDate(note.date)}</p>
      </div>
    </div>
  );
};

export default NoteDetail;


