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

export default function Sidebar({ documents, setCurrentDocumentIndex, createPage }) {
  const [open, setOpen] = useState(0);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = () => {
    navigate('/home');
  };

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
    </>
  );
}




