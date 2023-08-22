"use client";
import icons from "@/utils/icons";
import * as apis from "@/apis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const { RiHeartAddLine, RiHeartAddFill } = icons;

interface Props {
  isLiked: boolean;
  totalLikes: number;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalLikes: React.Dispatch<React.SetStateAction<number>>;
  pid: string;
  uid: string;
}

const Like = ({
  isLiked,
  totalLikes,
  setIsLiked,
  setTotalLikes,
  uid,
  pid,
}: Props) => {
  const { isLogged } = useSelector((state: any) => state.user);
  const handleLike = async () => {
    if (!isLogged) return toast.error("You must login to like this post");
    try {
      if (!isLiked) {
        const response = await apis.apiLikePost(pid, 1, uid);
        if (response) {
          setIsLiked(true);
          setTotalLikes(totalLikes + 1);
        }
      } else {
        const response = await apis.apiLikePost(pid, -1, uid);
        if (response) {
          setIsLiked(false);
          setTotalLikes(totalLikes - 1);
        }
      }
    } catch (error) {
      console.log("🚀 ~ handleLike ~ error:", error);
    }
  };

  return (
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
  );
};

export default Like;
