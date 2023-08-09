"use client";
import React from "react";
import { usePathname } from "next/navigation";
import * as apis from "@/apis";
import { PostCard } from "@/components/posts";
import icons from "@/utils/icons";
import { IPost } from "@/interface/post";

const { RiFileList3Line } = icons;

const PostInformation = () => {
  const pathname = usePathname();
  const [data, setData] = React.useState<any>();

  const getPosts = async () => {
    const response = await apis.apiGetPostByUserId(pathname.slice(1));
    setData(response);
  };

  React.useEffect(() => {
    getPosts();
  }, []);

  console.log(data);

  return (
    <div className="flex gap-10">
      <div className="bg-ctp-surface0 rounded-xl p-5 shadow-lg w-[250px] max-h-20">
        <div className="inline-flex items-center gap-2">
          <RiFileList3Line className="inline-block text-2xl" />
          <span className="">{data?.length || 0} posts published</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {data?.length > 0 ? (
          data?.map((post: IPost) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center">
            <p>No post published</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostInformation;
