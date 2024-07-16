import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ title, setTitle, createPage }) => {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    navigate('/home');
  };

  return (
    <div className={`bg-gray-200 h-screen fixed left-0 top-0 ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex flex-col`}>
      
     {/* Header Section with Toggle Button and Title */}
     <div className="flex items-center justify-between px-4 mt-2">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-black-600 ml-8">
            Book Hub
          </h1>
        )}
        <button onClick={toggleSidebar}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
          >
            <path
              d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>


      {/* Menu Items */}
      <div className={`flex flex-col mt-24 space-y-4 px-4 flex-grow ${isCollapsed ? 'items-center mr-24' : ''}`}>

        {/* Search */}
        <div className="flex items-center space-x-2 w-full cursor-pointer hover:bg-gray-300 p-2 rounded-md">
        <button
          type="button"
          className="flex hover:bg-accent w-full items-center px-2 py-[2px] cursor-pointer rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <svg
            width="20"  
            height="20" 
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 p-1 shrink-0"  
          >
            <path
              d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className={`pl-3 text-lg w-max truncate p-2  hover:bg-gray-300 rounded-md cursor-pointer ${isCollapsed ? 'hidden' : ''}`}>  
            Search
          </span>
        </button>
      </div>



        {/* Chatgpt */}
          <div className="flex items-center space-x-2 w-full cursor-pointer hover:bg-gray-300 p-2 rounded-md">
          <button
            type="button"
            className="flex hover:bg-gray-300 w-full items-center px-2 py-[2px] cursor-pointer rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 41.14235318283891 40.0339509076386"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 p-1 shrink-0"
            >
              <path
                d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
                fill="currentColor"
              />
            </svg>
            <span className={`pl-3 text-lg w-max truncate p-2 cursor-pointer hover:bg-gray-300 rounded-md ${isCollapsed ? 'hidden' : ''}`}>
              ChatGPT
            </span>
          </button>
        </div>


        {/* New Page */}
        <div className="flex items-center space-x-2 w-full cursor-pointer hover:bg-gray-300 p-2 rounded-md" onClick={createPage}>
          <button
            type="button"
            className="flex hover:bg-accent w-full items-center px-2 py-[2px] cursor-pointer rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 p-1 shrink-0"
            >
              <path
                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className={`pl-3 text-lg w-max truncate p-2 cursor-pointer hover:bg-gray-300 rounded-md ${isCollapsed ? 'hidden' : ''}`}>New page</span>
          </button>
        </div>

        {/* Untitled */}
        <div className="flex items-center space-x-2 w-full cursor-pointer hover:bg-gray-300 p-2 rounded-md">
          <button
            type="button"
            className="flex hover:bg-accent w-full items-center px-2 py-[2px] cursor-pointer rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 p-1 shrink-0"
            >
              <path
                d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className={`pl-3 text-lg w-max truncate cursor-pointer hover:bg-gray-300 p-2 rounded-md ${isCollapsed ? 'hidden' : ''}`}>{title || 'Untitled'}</span>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mb-8 cursor-pointer hover:bg-gray-300 p-2 rounded-md">
        <button className="flex hover:bg-accent w-full items-center px-2 py-[2px] cursor-pointer rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onClick={handleLogout}>
        <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
          >
            <path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          </svg>
          <span className={`pl-3 text-lg w-max truncate cursor-pointer hover:bg-gray-300 p-2 rounded-md ${isCollapsed ? 'hidden' : ''}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;




