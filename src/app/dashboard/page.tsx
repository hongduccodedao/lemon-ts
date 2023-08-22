"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as apis from "@/apis";
import { useSelector } from "react-redux";
import { PostCard } from "@/components/posts";
import { IPost } from "@/interface/post";
import Link from "next/link";
import { paths } from "@/utils/paths";

interface MenuItem {
  id: number;
  name: string;
}

const menu: MenuItem[] = [
  {
    id: 0,
    name: "Liked Posts",
  },
  {
    id: 1,
    name: "Saved Posts",
  },
];

const Dashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [postsId, setPostIds] = useState<string[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { current, isLogged } = useSelector((state: any) => state.user);

  const getPosts = async () => {
    let response: string[] = [];
    if (activeMenu === 0) {
      response = await apis.apiGetLikedPosts(current._id);
    } else if (activeMenu === 1) {
      response = await apis.apiGetSavedPosts(current._id);
    }
    if (response.length > 0) {
      setPostIds(response);
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeMenu]);

  const getPost = async (id: string) => {
    const response = await apis.apiGetPostById(id);
    return response as IPost | undefined;
  };

  useEffect(() => {
    const getPostsData = async () => {
      const postsData = await Promise.all(postsId.map((id) => getPost(id)));
      setPosts(postsData.filter((post) => post !== undefined) as IPost[]);
    };
    if (postsId.length > 0) {
      getPostsData();
    }
  }, [postsId]);

  return (
    <>
      {isLogged ? (
        <div className="max-w-[1200px] w-full mx-auto my-10 flex gap-10">
          <div className="basis-1/4">
            {menu.map((item) => (
              <div
                key={item.id}
                className={`
              ${
                activeMenu === item.id ? "bg-ctp-green text-ctp-base" : ""
              } border-b border-ctp-overlay0 p-3 hover:bg-ctp-green hover:text-ctp-base transition-all ease-in-out duration-300 cursor-pointer rounded-md
            `}
                onClick={() => setActiveMenu(item.id)}
              >
                <div>{item.name}</div>
              </div>
            ))}
          </div>
          <div className="w-full flex-1">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-[700px] mx-auto bg-ctp-surface0 p-5 rounded-lg my-20">
          <h3 className="text-center font-bold text-3xl">
            You need to login to create a post
          </h3>
          <div className="text-center">
            <Link href={paths.LOGIN} className="text-ctp-green hover:underline">
              Go to Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
