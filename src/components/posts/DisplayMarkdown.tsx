"use client";
import dynamic from "next/dynamic";

const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false },
);

interface Props {
  content: string;
}

const DisplayMarkdown = ({ content }: Props) => {
  return (
    <div data-color-mode="dark">
      <EditerMarkdown source={content} className="" />
    </div>
  );
};

export default DisplayMarkdown;
