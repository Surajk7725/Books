import React from "react";
import { marks } from "./data";

const Marks = ({ editor }) => {
  return (
    <div>
      {marks.map(({ type, icon: Icon, toggleKeyword }, idx) => (
        <button
          key={idx}
          type="button"
          className={"py-1 px-2 hover:bg-accent shrink-0"}
          onClick={() => editor.chain().focus()[toggleKeyword]().run()}
        >
          <Icon
            className={`pointer-events-none h-5 w-5 ${
              editor.isActive(type) ? "text-blue-400" : "text-primary"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default Marks;






