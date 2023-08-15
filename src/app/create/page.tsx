"use client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { Editor, TagsPost } from "@/components/create";
import axios from "@/axios";
import { getToken } from "@/utils/functions";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [fileImage, setFileImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [title, setTitle] = useState<string>("");

  const [tags, setTags] = useState<any>([]);
  const [content, setContent] = useState<string>("");

  const displayImage = (e: any) => {
    const fileInput = e.target;
    const image = fileInput.files[0];
    if (
      image.type !== "image/png" &&
      image.type !== "image/jpg" &&
      image.type !== "image/jpeg"
    ) {
      return toast.error("Image format is not supported");
    }
    if (image.size > 1024 * 1024 * 5) {
      return toast.error("Image size is too large");
    }
    setFileImage(image);
    const selectedImage = URL.createObjectURL(image);

    setSelectedImage(selectedImage);
    setIsImageUploaded(true);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setIsImageUploaded(false);
  };

  const handlePublish = async () => {
    if (!title) {
      return toast.error("Title is required");
    } else if (!content) {
      return toast.error("Content is required");
    } else if (!tags) {
      return toast.error("Tags are required");
    }

    const response = await axios({
      method: "POST",
      url: "/post",
      data: {
        title,
        content,
        tags,
        image: fileImage,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (response.data.err === 0) {
      toast.success("✨ Post created successfully!");
      //   reset form
      setTitle("");
      setContent("");
      setTags([]);
      setSelectedImage(null);
      setIsImageUploaded(false);
      setFileImage(null);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto bg-ctp-surface0 p-5 rounded-lg my-10">
      <div className="flex items-center gap-10">
        {isImageUploaded && (
          <div className="relative max-w-[500px]">
            <Image
              src={selectedImage}
              alt="Selected Image"
              layout="responsive"
              width={100}
              height={100}
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block px-4 py-2 rounded-md border border-ctp-green text-ctp-green hover:bg-ctp-green hover:text-white transition duration-300 ease-in-out"
          >
            {isImageUploaded ? "Change Image" : "Add a cover image"}
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={displayImage}
          />
          {isImageUploaded && (
            <button
              className="inline-block px-4 py-2 rounded-md border border-ctp-red text-ctp-red hover:bg-ctp-red hover:text-white transition duration-300 ease-in-out"
              onClick={handleRemoveImage}
            >
              Remove Image
            </button>
          )}
        </div>
      </div>
      <input
        type="text"
        className="mt-8 w-full outline-none text-6xl placeholder:text-gray-600 font-bold bg-transparent caret-ctp-green"
        placeholder="New post title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="my-3">
        <TagsPost tags={tags} setTags={setTags} />
      </div>
      <Editor content={content} setContent={setContent} />
      <button
        className="cursor-pointer inline-block px-4 py-2 rounded-md border border-ctp-green text-ctp-green hover:bg-ctp-green hover:text-white transition duration-300 ease-in-out mt-5"
        onClick={() => handlePublish()}
      >
        Publish
      </button>
    </div>
  );
};

export default Page;
