import Image from "next/image";
import icons from "@/utils/icons";
import Link from "next/link";
import moment from "moment";
import { IPost } from "@/interface/post";

const { RiBookmarkFill, RiHeartAddLine, RiChat1Line } = icons;

interface Props {
  post: IPost;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="w-full bg-ctp-surface0 rounded-lg cursor-pointer shadow-md p-[10px]">
      <div className="relative w-full h-[200px]">
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="mt-3">
        <Link href={`/posts/${post.slug}`} className="text-2xl font-bold hover:text-ctp-green">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 my-2">
          {post.tags.map((tag) => (
            <Link
              href={`/tags/${tag}`}
              key={tag}
              className="inline-flex items-center gap-2 border border-ctp-subtext0 rounded-full px-2 text-sm"
            >
              <div className={`h-3 w-3 bg-ctp-green rounded-full`}></div>
              {tag}
            </Link>
          ))}
        </div>
        <div className="bg-ctp-surface1 p-2 rounded-md mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <Image
                src={post.user?.avatar}
                alt="avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <Link
                className="text-lg font-semibold"
                href={`/${post.user?._id}`}
                title={`${post.user?.firstName} ${post.user?.lastName}`}
              >
                {post.user?.firstName} {post.user?.lastName}
              </Link>
              <span className="text-ctp-subtext0">
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <span>
            <RiBookmarkFill className="text-2xl"/>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
