"use client";
import icons from "@/utils/icons";
import { DisplayMarkdown, ShowMore } from "@/components/posts";
import * as apis from "@/apis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Like, Save } from "./LikeSave";

const { RiChat1Line } = icons;

interface Props {
  pid: string;
  likes: number;
}

const LikeComment = ({ pid, likes }: Props) => {
  const [totalLikes, setTotalLikes] = useState<number>(likes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { current } = useSelector((state: any) => state.user);
  let uid = current?._id;

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const response = await apis.apiGetLikedPosts(current._id);
        if (response) {
          if (response.includes(pid)) {
            setIsLiked(true);
          }
        }
      } catch (error) {
        console.log("🚀 ~ checkLiked ~ error:", error);
      }
    };
    const checkSaved = async () => {
      try {
        const response = await apis.apiGetSavedPosts(current._id);
        if (response) {
          if (response.includes(pid)) {
            setIsSaved(true);
          }
        }
      } catch (error) {
        console.log("🚀 ~ checkSaved ~ error:", error);
      }
    };
    checkLiked();
    checkSaved();
  }, [current._id, pid]);

  return (
    <div className="flex flex-col gap-7 mt-10">
      <Like
        isLiked={isLiked}
        totalLikes={totalLikes}
        setIsLiked={setIsLiked}
        setTotalLikes={setTotalLikes}
        uid={uid}
        pid={pid}
      />
      <div className="flex flex-col gap-2 items-center cursor-pointer">
        <RiChat1Line className="text-2xl" />
        <span className="text-ctp-subtext0">0</span>
      </div>
      <Save isSaved={isSaved} setIsSaved={setIsSaved} pid={pid} />
      <ShowMore />
    </div>
  );
};

export default LikeComment;
