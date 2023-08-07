import React from "react";
import * as apis from "@/apis";
import { PostCard } from "@/components/posts";
import { IPost } from "@/interface/post";

const Posts = async () => {
  const posts = await apis.apiGetPosts();
  return (
    <div className="flex flex-col gap-5 flex-1">
      {posts?.length > 0 ? (
        <>
          {posts &&
            posts?.map((post: IPost) => (
              <PostCard key={post._id} post={post} />
            ))}
        </>
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center">
          <p>No posts</p>
        </div>
      )}
    </div>
  );
};

export default Posts;
