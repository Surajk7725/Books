import React, { useState } from "react";
import { Link2Icon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const DropdownLinkInput = ({ editor, container }) => {
  const [link, setLink] = useState("");

  const handleLinkSet = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: link }).run();
    }
    setLink("");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="shrink-0 hover:bg-accent border-none shadow-none ring-0 rounded-none py-1 px-2 flex items-center cursor-pointer">
          <Link2Icon className="h-4 w-4 opacity-50 text-primary" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="overflow-hidden z-[9999] p-2" container={container}>
        <div className="flex flex-col">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="p-2 border rounded-sm"
            placeholder="Enter URL"
          />
          <button onClick={handleLinkSet} className="mt-2 p-2 bg-blue-500 text-white rounded-sm w-full">Set Link</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownLinkInput;


