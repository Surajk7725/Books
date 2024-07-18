import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  SearchIcon,
  DocumentIcon,
  PlusCircleIcon,
  MenuIcon,
  XIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { SiOpenai as OpenAiIcon } from "react-icons/si";
import { OpenAI } from "openai";

export default function Sidebar({ documents, setCurrentDocumentIndex, createPage }) {
  const [open, setOpen] = useState(0);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChatGPTForm, setShowChatGPTForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = () => {
    navigate('/home');
  };

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatGPTClick = () => {
    setShowChatGPTForm(true);
    closeDrawer();
  };

  const handleChatGPTSubmit = async () => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: "user", content: question }],
      });

      setAnswer(response.choices[0]);
    } catch (error) {
      console.error("Error generating response from ChatGPT:", error);
      setAnswer("An error occurred while generating the answer.");
    }
  };

  const handleCloseChatGPTForm = () => {
    setShowChatGPTForm(false);
    setQuestion("");
    setAnswer("");
  };



  return (
    <>
      <button
        onClick={openDrawer}
        className="text-gray-600 hover:text-gray-800 focus:outline-none fixed top-4 left-4 z-50"
      >
        {isDrawerOpen ? (
          ""
        ) : (
          <MenuIcon className="h-8 w-8" />
        )}
      </button>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-white shadow-xl">
            <div className="p-4 h-full">
              <div className="mb-2 flex items-center justify-between p-4">
                <h5 className="text-gray-900 font-bold">Book Hub</h5>
                <XIcon
                  onClick={closeDrawer}
                  className="h-6 w-6 cursor-pointer text-gray-600"
                />
              </div>
              <div className="p-2 -ml-4">
                <div className="relative flex items-center">
                  <SearchIcon className="h-5 w-5 absolute left-2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <ul className= " flex flex-col space-y-2 mt-8 h-full">
                <li>
                  <button
                    className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 ${
                      open === 1 ? "bg-gray-200" : ""
                    }`}
                    onClick={handleChatGPTClick}
                  >
                    <OpenAiIcon className="h-5 w-5 mr-3 text-gray-700" />
                    <span className="flex-1 text-left text-gray-700">ChatGPT</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 ${
                      open === 2 ? "bg-gray-200" : ""
                    }`}
                    onClick={createPage}
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-3 text-gray-700" />
                    <span className="flex-1 text-left text-gray-700">New Page</span>
                  </button>
                </li>
                <li>
                {filteredDocuments.map((doc, index) => (
                  <button
                    key={index}
                    className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 ${
                      open === 3 ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setCurrentDocumentIndex(index)}
                  >
                    <DocumentIcon className="h-5 w-5 mr-3 text-gray-700" />
                    <span className="flex-1 text-left text-gray-700">{doc.title || 'Untitled'}</span>
                  </button>
                 ))}  
                </li>
                <li className="absolute bottom-2 flex flex-col space-y-2">
                  <button
                    className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 ${
                      open === 4 ? "bg-gray-200" : ""
                    }`}
                    onClick={handleLogout}
                  >
                    <LogoutIcon className="h-5 w-5 mr-3 text-gray-700" />
                    <span className="flex-1 text-left text-gray-700">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1 bg-black bg-opacity-50" onClick={closeDrawer}></div>
        </div>
      )}

      {showChatGPTForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleCloseChatGPTForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <XIcon className="h-6 w-6 cursor-pointer text-gray-600" />
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              AI Prompt
            </h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="question"
                >
                  Question
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="question"
                  type="text"
                  placeholder="Enter your question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="button"
                onClick={handleChatGPTSubmit}
              >
                Submit
              </button>
            </form>
            <div className="mt-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="answer"
              >
                Answer
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="answer"
                rows="4"
                placeholder="AI answer will appear here..."
                value={answer}
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      )}

    </>
  );
}




