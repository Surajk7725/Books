// import React, { useState } from 'react';

// function Comments() {
//   const [replyVisible, setReplyVisible] = useState(false);

//   const handleReplyClick = () => {
//     setReplyVisible(true);
//   };

//   return (
//     <div>
//       <section className="bg-gradient-to-br from-blue-400 to-teal-400 min-h-screen flex items-center justify-center">
//         <div className="container mx-auto p-5 max-w-full">
//           <div className="bg-white shadow-md rounded-lg overflow-hidden">
//             <div className="p-6">
//               <h4 className="text-center mb-6 text-xl font-semibold">Nested comments section</h4>

//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <img
//                     className="rounded-full shadow-lg mr-4"
//                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
//                     alt="avatar"
//                     width="65"
//                     height="65"
//                   />
//                   <div className="flex-grow">
//                     <div className="flex justify-between items-center">
//                       <p className="mb-1">
//                         Maria Smantha <span className="text-gray-600 text-sm">- 2 hours ago</span>
//                       </p>
//                       <button onClick={handleReplyClick} className="text-blue-500 text-sm">
//                         <i className="fas fa-reply fa-xs"></i> reply
//                       </button>
//                     </div>
//                     <p className="text-sm">
//                       It is a long established fact that a reader will be distracted by the readable content of a page.
//                     </p>

//                     {replyVisible && (
//                       <div className="d-flex flex-start w-full mt-4">
//                         <img
//                           className="rounded-full shadow-lg mr-3"
//                           src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
//                           alt="avatar"
//                           width="40"
//                           height="40"
//                         />
//                         <textarea
//                           className="form-textarea w-full bg-white border rounded p-2"
//                           rows={4}
//                           placeholder="Message"
//                         />
//                         <div className="float-right mt-2 pt-1">
//                           <button className="bg-blue-500 text-white rounded px-2 py-1 mr-1">Post comment</button>
//                           <button className="border border-blue-500 text-blue-500 rounded px-2 py-1">Cancel</button>
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex items-start mt-4">
//                       <a className="mr-4" href="#">
//                         <img
//                           className="rounded-full shadow-lg"
//                           src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
//                           alt="avatar"
//                           width="65"
//                           height="65"
//                         />
//                       </a>
//                       <div className="flex-grow">
//                         <p className="mb-1">
//                           Simona Disa <span className="text-gray-600 text-sm">- 3 hours ago</span>
//                         </p>
//                         <p className="text-sm">
//                           letters, as opposed to using 'Content here, content here', making it look like readable English.
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-start mt-4">
//                       <a className="mr-4" href="#">
//                         <img
//                           className="rounded-full shadow-lg"
//                           src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
//                           alt="avatar"
//                           width="65"
//                           height="65"
//                         />
//                       </a>
//                       <div className="flex-grow">
//                         <p className="mb-1">
//                           John Smith <span className="text-gray-600 text-sm">- 4 hours ago</span>
//                         </p>
//                         <p className="text-sm">
//                           the majority have suffered alteration in some form, by injected humour, or randomised words.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

                
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Comments;

import React, { useState } from "react";

export default function CommentCard() {
  const [showReplyBox, setShowReplyBox] = useState(null);

  const comments = [
    {
      id: 1,
      user: "HXHxKNYxNarutoXAOtXJxJK",
      avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp",
      time: "6 hours ago",
      text: "when animators forgot their budget :-",
    },
    // Add more comments here
  ];

  const handleReplyClick = (commentId) => {
    setShowReplyBox(showReplyBox === commentId ? null : commentId);
  };

  return (
    <section className="min-h-screen bg-gray-200" style={{ padding: "2cm 0 2cm 0" }}>
      <div className="py-5 max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-6">
                {/* Section for number of comments */}
                <div className="flex justify-between items-center">
                  <h5 className="text-lg font-bold">Book Comments</h5>
                </div>
                <hr className="my-4" />

                {/* Comment input section */}
                <div className="mb-4">
                  <div className="flex items-center mb-4">
                    <img
                      className="rounded-full shadow-md mr-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                      alt="avatar"
                      width="60"
                      height="60"
                    />
                    <textarea
                      placeholder="Leave a comment"
                      className="w-full bg-white p-2 border border-gray-300 rounded-md"
                      rows="4"
                    />
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Submit
                  </button>
                </div>

                {/* Comments section */}
                {comments.map((comment) => (
                  <div key={comment.id} className="mb-4">
                    <div className="flex items-center mb-4">
                      <img
                        className="rounded-full shadow-md mr-3"
                        src={comment.avatar}
                        alt="avatar"
                        width="60"
                        height="60"
                      />
                      <div>
                        <h6 className="font-bold mb-1">{comment.user}</h6>
                        <p className="text-gray-500 text-sm">{comment.time}</p>
                      </div>
                    </div>
                    <p className="mb-4">{comment.text}</p>
                    <div className="flex space-x-4 text-gray-600 text-sm">
                      <button
                        className="flex items-center"
                        onClick={() => handleReplyClick(comment.id)}
                      >
                        <i className="far fa-comment-dots mr-2"></i>Reply
                      </button>
                    </div>
                    {showReplyBox === comment.id && (
                      <div className="ml-12 mt-4">
                        <div className="flex items-center mb-4">
                          <img
                            className="rounded-full shadow-md mr-3"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                            alt="avatar"
                            width="40"
                            height="40"
                          />
                          <textarea
                            placeholder="Reply to comment"
                            className="w-full bg-white p-2 border border-gray-300 rounded-md"
                            rows="2"
                          />
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
