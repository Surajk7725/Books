import React from "react";
import Text from '../images/text.png';
import Header from '../images/header.png';
import SubHeader from '../images/subheader.png';
import SubsubHeader from '../images/subsubheader.png';
import Bullets from '../images/bulleted-list.png';
import Numbered from '../images/numbered-list.png';
import Quotes from '../images/quote.png';
import Divider from '../images/divider.png';
import Codes from '../images/code.png';
import Images from '../images/image.png';


function createElementNextImage(image, alt, sizes) {
  return (
    <img
      src={image}
      alt={alt}
      className={`w-[${sizes}px] h-[${sizes}px]`}
      width={sizes}
      height={sizes}
    />
  );
}


// Array of slash commands for the editor
export const slashNodes = [
  {
    title: "Text",
    description: "Just start typing with plain text.",
    icon: createElementNextImage(Text, "text", 46),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    icon: createElementNextImage(Header, "header", 46),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    icon: createElementNextImage(SubHeader, "subheader", 46),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    icon: createElementNextImage(SubsubHeader, "subsubheader", 46),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    icon: createElementNextImage(Bullets, "bulleted list", 46),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    icon: createElementNextImage(Numbered, "numbered list", 46),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    icon: createElementNextImage(Quotes, "quote", 46),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setBlockquote().run();
    },
  },
  {
    title: "Divider",
    description: "Visually divide blocks.",
    icon: createElementNextImage(Divider, "horizontal line", 46),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    icon: createElementNextImage(Codes, "code", 46),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setCodeBlock().run();
    },
  },
  {
    title: "Image",
    description: "Insert an image.",
    icon: createElementNextImage(Images, "image", 46),
    command: ({ editor, range }) => {
      const imageUrl = prompt("Enter image URL:");
      if (imageUrl) {
        editor.chain().focus().deleteRange(range).setImage({
          src: imageUrl,
          style: 'display: block; margin-left: auto; margin-right: auto; max-width: 100%; height: auto;',
        }).run();
      }
    },
  },
];

