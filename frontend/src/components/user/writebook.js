import React, { useState, useEffect, useRef, useCallback } from "react";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import { FaEllipsisV } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StarterKit from "@tiptap/starter-kit";
import SlashCommand from "./slashCommand";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Links from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import DropdownStyle from "./bubbleButtons/dropDownStyle";
import Marks from "./bubbleButtons/marks";
import DropdownLinkInput from "./bubbleButtons/dropDownLinkInput";
import Sidebar from "./bubbleButtons/sidebar";
import axiosInstance from '../axiosInstance';

function Writebook() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const containerRef = useRef(null);

  const [documents, setDocuments] = useState([
    {
      title: "Untitled",
      coverImage: null,
      iconImage: null,
      content: "<p></p>",
    },
  ]);

  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentDocument = documents[currentDocumentIndex];


  const editor = useEditor({
    extensions: [
      StarterKit,
      SlashCommand,
      Image,
      Underline,
      Color,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock,
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "border-t-2 border-black", // Tailwind CSS classes for a thick black line
        },
      }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Links.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: "Press '/' for commands, or enter some text....",
      }),
    ],
    content: currentDocument.content, // Set initial content
    autofocus: true,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setDocuments((docs) =>
        docs.map((doc, index) =>
          index === currentDocumentIndex ? { ...doc, content: newContent } : doc
        )
      );
    },
    // To remove editor box which is in the black color
    editorProps: {
      attributes: {
        class: "focus:outline-none",
        style: "white-space: pre-wrap;"
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(currentDocument.content, false, {preserveWhitespace: "full"});
    }
  }, [currentDocument, editor]);

  const createPage = useCallback(() => {
    const newDocument = {
      title: "Untitled",
      coverImage: null,
      iconImage: null,
      content: "<p></p>",
    };
    setDocuments((docs) => [...docs, newDocument]);
    setCurrentDocumentIndex(documents.length);
  }, [documents.length]);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setDocuments((docs) =>
      docs.map((doc, index) =>
        index === currentDocumentIndex ? { ...doc, title: newTitle } : doc
      )
    );
  };

  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocuments((docs) =>
          docs.map((doc, index) =>
            index === currentDocumentIndex ? { ...doc, coverImage: e.target.result } : doc
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocuments((docs) =>
          docs.map((doc, index) =>
            index === currentDocumentIndex ? { ...doc, iconImage: e.target.result } : doc
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCoverImage = () => {
    setDocuments((docs) =>
      docs.map((doc, index) =>
        index === currentDocumentIndex ? { ...doc, coverImage: null } : doc
      )
    );
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post('/api/content/save', currentDocument);
      toast.success('Book content saved successfully!');
    } catch (error) {
      console.error('Error saving document:', error);
      toast.error('Failed to save book content.');
    }
  };

  const handlePublish = async () => {
    try {
      const response = await axiosInstance.post('/api/content/publish', { id: currentDocument.id });
      toast.success('Book published successfully!');
    } catch (error) {
      console.error('Error publishing document:', error);
      toast.error('Failed to publish book.');
    }
  };

  const handleDelete = async () => {
    if (documents.length > 1) {
      try {
        const documentId = currentDocument.id; 
        await axiosInstance.delete(`/api/content/${documentId}`);
        const updatedDocuments = documents.filter(doc => doc.id !== documentId);
        setDocuments(updatedDocuments);
        setCurrentDocumentIndex(0);
        toast.success('Document deleted successfully!');
      } catch (error) {
        console.error('Error deleting document:', error);
        toast.error('Failed to delete document.');
      }
    } else {
      setDocuments([{
        title: "Untitled",
        coverImage: null,
        iconImage: null,
        content: "<p></p>",
      }]);
      setCurrentDocumentIndex(0);
    }
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="absolute top-0 left-0  w-full" style={{ height: '1.5cm', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
      <h1 className="text-2xl text-center font-bold text-gray-800 mr-2 mt-4">Write Your Own Ideas</h1>
      <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          documents={documents}
          setCurrentDocumentIndex={setCurrentDocumentIndex}
          createPage={createPage}
        />
      </div>
        
      {currentDocument.coverImage && (
        <div
          className="relative w-screen h-64 bg-cover bg-center mt-6 group"
          style={{ backgroundImage: `url(${currentDocument.coverImage})` }}
        >
          {currentDocument.iconImage && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-20">
              <img
                src={currentDocument.iconImage}
                alt="Icon"
                className="absolute top-1/2 transform -translate-y-1/2 left-1/2 w-20 h-20 object-cover rounded-full border-4 border-white"
              />
            </div>
          )}

          <div className="absolute bottom-2 right-24 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white flex">
            <button
              className="inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none hover:bg-gray-600 hover:text-white rounded-md py-1 cursor-pointer text-gray-700 text-xs transition duration-200 px-2 gap-2 bg-white rounded-r-none h-[26px] disabled:opacity-100"
              type="button"
              onClick={() => document.getElementById("coverImageInput").click()}
            >
              Change
            </button>
            <div className="w-px bg-black"></div>
            <button
              className="inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none hover:bg-gray-600 hover:text-white rounded-md py-1 cursor-pointer text-gray-700 text-xs transition duration-200 px-2 gap-2 bg-white rounded-l-none h-[26px] disabled:opacity-100"
              type="button"
              onClick={handleRemoveCoverImage}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <main className={`flex flex-col h-full w-full mt-18 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <section className="flex flex-col flex-1 w-full">
          <div className="group flex flex-col shrink-0 px-10 md:px-24 w-full max-w-[900px] mx-auto relative pt-10">
            <div className="h-6 inline-flex gap-2 mt-5">
              {!currentDocument.iconImage && (
                <button
                  className="inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-[30px] rounded-md py-1 cursor-pointer text-sm md:!opacity-0 group-hover:!opacity-80 transition-opacity duration-200 px-2 gap-2"
                  type="button"
                  onClick={() => document.getElementById("iconImageInput").click()}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M2 3C1.44772 3 1 3.44772 1 4V11C1 11.5523 1.44772 12 2 12H13C13.5523 12 14 11.5523 14 11V4C14 3.44772 13.5523 3 13 3H2ZM0 4C0 2.89543 0.895431 2 2 2H13C14.1046 2 15 2.89543 15 4V11C15 12.1046 14.1046 13 13 13H2C0.895431 13 0 12.1046 0 11V4ZM2 4.25C2 4.11193 2.11193 4 2.25 4H4.75C4.88807 4 5 4.11193 5 4.25V5.75454C5 5.89261 4.88807 6.00454 4.75 6.00454H2.25C2.11193 6.00454 2 5.89261 2 5.75454V4.25ZM12.101 7.58421C12.101 9.02073 10.9365 10.1853 9.49998 10.1853C8.06346 10.1853 6.89893 9.02073 6.89893 7.58421C6.89893 6.14769 8.06346 4.98315 9.49998 4.98315C10.9365 4.98315 12.101 6.14769 12.101 7.58421ZM13.101 7.58421C13.101 9.57302 11.4888 11.1853 9.49998 11.1853C7.51117 11.1853 5.89893 9.57302 5.89893 7.58421C5.89893 5.5954 7.51117 3.98315 9.49998 3.98315C11.4888 3.98315 13.101 5.5954 13.101 7.58421Z" // Don't give logic
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Add Icon</span>
                </button>
              )}
              {!currentDocument.coverImage && (
                <button
                  className="inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-[30px] rounded-md py-1 cursor-pointer text-sm md:!opacity-0 group-hover:!opacity-80 transition-opacity duration-200 px-2 gap-2"
                  type="button"
                  onClick={() => document.getElementById("coverImageInput").click()}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" // Don't give logic
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Add Cover</span>
                </button>
              )}
            </div>
            <div className="flex items-center mt-4">
            <h1 className="outline-none py-5 opacity-0 sr-only">{currentDocument.title}</h1>
              <input
                type="text"
                value={currentDocument.title}
                onChange={handleTitleChange}
                placeholder="Untitled"
                className="text-4xl font-extrabold text-gray-900 w-full focus:outline-none focus:ring-0 border-none bg-transparent"
              />
              <div className="absolute bottom-2 right-24 z-10 transition-opacity bg-white flex">
                <div className="relative">
                  <button onClick={toggleMenu} className="text-gray-700 p-2 rounded-full hover:bg-gray-300">
                    <FaEllipsisV />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                      <button
                        onClick={handleDelete}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <input
        type="file"
        id="coverImageInput"
        className="hidden"
        accept="image/*"
        onChange={handleCoverImageUpload}
      />
      <input
        type="file"
        id="iconImageInput"
        className="hidden"
        accept="image/*"
        onChange={handleIconImageUpload}
      />

      <div
        className={`editor relative w-full ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } cursor-text flex-1 px-10 md:px-24 pb-16`}
      >
        <div
          className="container w-full max-w-[708px] mx-auto h-full mt-4"
          ref={containerRef}
        >
          <EditorContent editor={editor} className="prose max-w-none" />
          {editor && containerRef.current && (
            <div>
              <BubbleMenu
                editor={editor}
                tippyOptions={{ duration: 100 }}
                className="text-menu-shadow z-[999999] bg-white rounded-md w-max cursor-auto"
                shouldShow={({ editor }) => {
                  const { from, to } = editor.state.selection;
                  return from !== to;
                }}
              >
                <div className="flex">
                  <DropdownStyle editor={editor} container={containerRef.current} />
                  <Marks editor={editor} />
                  <DropdownLinkInput editor={editor} container={containerRef.current} />
                </div>
              </BubbleMenu>
            </div>
          )}
        </div>
      </div>

      {/* Save and Publish Buttons */}
      <div className="w-full flex justify-center mt-8">
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Writebook;



