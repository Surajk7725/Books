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
