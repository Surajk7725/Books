import React from 'react';
import { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { colors } from "./data";

const DropdownStyle = ({ editor, container }) => {
  const colorEntries = Object.entries(colors); // Convert colors object to array

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          className="shrink-0 hover:bg-accent border-none shadow-[none] ring-0 rounded-none py-1 px-2 flex items-center"
          type="button"
        >
          <span
            className="w-5 h-5 flex items-center justify-center rounded-sm select-none"
            style={{
              color: editor.getAttributes("textStyle").color,
              background: editor.getAttributes("highlight").color,
            }}
          >
            A
          </span>{" "}
          <CaretSortIcon className="h-4 w-4 opacity-50 text-primary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="overflow-hidden z-[9999] h-[500px] p-0 bg-white"
        container={container}
      >
        <div className="max-h-[500px] custom-scroll overflow-y-auto p-1">
          <DropdownMenuLabel className="text-xxs font-normal py-1">
            Text
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().unsetColor().run();
            }}
            className="cursor-pointer flex gap-2"
          >
            <span className="p-1 border rounded-sm w-6 h-6 text-sm flex items-center justify-center border-gray-300">
              A
            </span>
            Default
          </DropdownMenuItem>
          {colorEntries.map(([key, value], idx) => (
            <DropdownMenuItem
              key={`color-${idx}`}
              onClick={() => {
                console.log(`Setting text color to: ${value}`);
                editor.chain().focus().setColor(value).run();
                editor.chain().focus().unsetHighlight().run();
              }}
              className="cursor-pointer flex gap-2"
            >
              <span
                className="p-1 border rounded-sm w-6 h-6 text-sm flex items-center justify-center border-gray-300"
                style={{
                  color: value,
                }}
              >
                A
              </span>
              {key}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xxs font-normal py-1">
            Background
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().unsetHighlight().run();
            }}
            className="cursor-pointer flex gap-2"
          >
            <span className="p-1 border rounded-sm w-6 h-6 text-sm flex items-center justify-center border-gray-300">
              A
            </span>
            Default
          </DropdownMenuItem>
          {colorEntries.map(([key, value], idx) => (
            <DropdownMenuItem
              key={`background-${idx}`}
              onClick={() => {
                console.log(`Setting background color to: ${value}`);
                editor.commands.setHighlight({ color: value });
                editor.chain().focus().unsetColor().run();
              }}
              className="cursor-pointer flex gap-2"
            >
              <span
                className="p-1 border rounded-sm w-6 h-6 text-sm flex items-center justify-center border-gray-300"
                style={{
                  background: value,
                }}
              >
                A
              </span>
              {key}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownStyle;


