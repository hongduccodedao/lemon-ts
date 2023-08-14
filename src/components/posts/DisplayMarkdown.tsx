"use client";
import dynamic from "next/dynamic";

const Markdown = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false },
);

interface Props {
  content: string;
}

const DisplayMarkdown = ({ content }: Props) => {
  return (
    <div data-color-mode="dark">
      <div className="wmde-markdown-var"> </div>
      <Markdown source={content} />
    </div>
  );
};

export default DisplayMarkdown;
