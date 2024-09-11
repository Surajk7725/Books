import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useParams } from 'react-router-dom'; 
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../authcontext';

export default function CommentCard({ bookTitle, bookAuthor }) {
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState("");
  const { title } = useParams();
  const [username, setUsername] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const baseURL = process.env.REACT_APP_API_URL;
  const profilePicURL = user?.profilePic ? `${baseURL}${user.profilePic.replace('\\', '/')}` : 'https://default-profile-pic-url.com/avatar.png';

  // Fetch comments when the component loads
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/books/${title}/comments`);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Failed to load comments.");
      }
    };

    fetchComments();
  }, [title]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    try {
      const response = await axiosInstance.post("/books/comment", {
        title: bookTitle,
        author: bookAuthor,
        comment: newComment,
      });
      setComments([...comments, response.data]); 
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error('Failed to post comment');
    }
  };

  // Handle adding a reply to a comment
  const handleAddReply = async (commentId) => {
    if (!reply.trim()) {
      toast.error('Reply cannot be empty');
      return;
    }
    try {
      await axiosInstance.post("/books/comment/reply", {
        title: bookTitle,
        author: bookAuthor,
        commentId: commentId,
        reply: reply,
      });
      setReply("");
      setShowReplyBox(null);

      // Re-fetch comments after submission
      const response = await axiosInstance.get(`/books/${title}/comments`);
      setComments(response.data);
      toast.success("Reply added successfully");
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error('Failed to add reply');
    }
  };

  // Handle showing and hiding reply box
  const handleReplyClick = (commentId) => {
    setShowReplyBox(showReplyBox === commentId ? null : commentId);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Book Comments</h2>
          </div>
          <hr className="border-gray-300 mb-6" />

          {/* Comment Input Section */}
          <div className="mb-6">
            <div className="flex items-start space-x-4">
              <img
                className="h-12 w-12 rounded-full border-2 border-gray-300 object-cover"
                src={profilePicURL}
                alt="avatar"
              />
              <textarea
                placeholder="Leave a comment..."
                className="flex-1 resize-none bg-gray-50 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <button
              className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleAddComment}
            >
              Submit
            </button>
          </div>

          {/* Comments Section */}
          <div>
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first to comment! 💡</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="mb-6">
                  <div className="flex items-start space-x-4">
                    <img
                      className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                      src={comment.user.profilePic ? `${baseURL}${comment.user.profilePic.replace('\\', '/')}` : 'https://default-profile-pic-url.com/avatar.png'}
                      alt="avatar"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-800">{comment.username}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{comment.comment}</p>
                      <div className="mt-2 flex space-x-4">
                        <button
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                          onClick={() => handleReplyClick(comment._id)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 3a1 1 0 00-.894.553L7.382 7H4a1 1 0 000 2h3.382l1.724 3.447A1 1 0 0010 13a1 1 0 001-1V4a1 1 0 00-1-1z" />
                          </svg>
                          Reply
                        </button>
                      </div>

                      {/* Reply Box */}
                      {showReplyBox === comment._id && (
                        <div className="mt-4 flex items-start space-x-4">
                          <img
                            className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                            src={profilePicURL}
                            alt="avatar"
                          />
                          <div className="flex-1">
                            <textarea
                              placeholder="Write your reply..."
                              className="w-full resize-none bg-gray-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="2"
                              value={reply}
                              onChange={(e) => setReply(e.target.value)}
                            />
                            <button
                              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                              onClick={() => handleAddReply(comment._id)}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 ml-12">
                          {comment.replies.map((reply) => (
                            <div key={reply._id} className="mb-4">
                              <div className="flex items-start space-x-4">
                                <img
                                  className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                                  src={reply.user.profilePic ? `${baseURL}${reply.user.profilePic.replace('\\', '/')}` : 'https://default-profile-pic-url.com/avatar.png'}
                                  alt="avatar"
                                />
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <h5 className="text-sm font-medium text-gray-800">{reply.user.username}</h5>
                                    <span className="text-sm text-gray-500">
                                      {new Date(reply.createdAt).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-gray-700">{reply.comment}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}



