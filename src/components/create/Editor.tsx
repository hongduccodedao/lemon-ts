import React from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

interface EditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false },
);

const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setContent(value);
    }
  };

  return (
    <div data-color-mode="dark">
      <div className="wmde-markdown-var"></div>
      <MDEditor value={content} onChange={handleChange} />
    </div>
  );
};

export default Editor;
