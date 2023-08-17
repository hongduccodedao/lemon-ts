"use client";
import icons from "@/utils/icons";
import { DisplayMarkdown, ShowMore } from "@/components/posts";
import * as apis from "@/apis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const {
  RiBookmarkLine,
  RiHeartAddLine,
  RiChat1Line,
  RiMoreFill,
  RiHeartAddFill,
} = icons;

interface Props {
  pid: string;
  likes: number;
}

const LikeComment = ({ pid, likes }: Props) => {
  const [totalLikes, setTotalLikes] = useState<number>(likes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { current } = useSelector((state: any) => state.user);
  let uid = current?._id;

  const handleLike = async () => {
    try {
      const response = await apis.apiLikePost(pid, 1, uid);
      if (response) {
        setIsLiked(true);
        setTotalLikes(totalLikes + 1);
      }
    } catch (error) {
      console.log("🚀 ~ handleLike ~ error:", error);
    }
  };

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const response = await apis.apiGetLikedPosts( current._id);
        console.log("🚀 ~ checkLiked ~ response:", response);
        if (response) {
          if(response.includes(pid)){
            setIsLiked(true);
          }
        }
      } catch (error) {
        console.log("🚀 ~ checkLiked ~ error:", error);
      }
    };
    checkLiked();
  }, []);

  return (
    <div className="flex flex-col gap-7 mt-10">
      <div
        className="flex flex-col gap-2 items-center cursor-pointer select-none"
        onClick={handleLike}
      >
        {isLiked ? (
          <RiHeartAddFill className="text-2xl text-ctp-red" />
        ) : (
          <RiHeartAddLine className="text-2xl hover:text-ctp-red" />
        )}
        <span className="text-ctp-subtext0">{totalLikes}</span>
      </div>
      <div className="flex flex-col gap-2 items-center cursor-pointer">
        <RiChat1Line className="text-2xl" />
        <span className="text-ctp-subtext0">0</span>
      </div>
      <div className="flex flex-col gap-2 items-center cursor-pointer">
        <RiBookmarkLine className="text-2xl" />
      </div>
      <ShowMore />
    </div>
  );
};

export default LikeComment;
