import icons from "@/utils/icons";
import Image from "next/image";
import { DisplayMarkdown, ShowMore } from "@/components/posts";

const {
  RiBookmarkLine,
  RiHeartAddLine,
  RiChat1Line,
  RiMoreFill,
  RiHeartAddFill,
} = icons;

interface Props {
  likes: number;
  comments: number;
}


const LikeComment = ({likes, comments} : Props) => {
  return (
    <div className="flex flex-col gap-7 mt-10">
      <div className="flex flex-col gap-2 items-center cursor-pointer select-none">
        <RiHeartAddLine className="text-2xl hover:text-ctp-red" />
        <span className="text-ctp-subtext0">{likes}</span>
      </div>
      <div className="flex flex-col gap-2 items-center cursor-pointer">
        <RiChat1Line className="text-2xl" />
        <span className="text-ctp-subtext0">{comments}</span>
      </div>
      <div className="flex flex-col gap-2 items-center cursor-pointer">
        <RiBookmarkLine className="text-2xl" />
      </div>
      <ShowMore />
    </div>
  );
};

export default LikeComment;
