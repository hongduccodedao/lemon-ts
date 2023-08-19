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
    <Link
      className="flex-auto w-full bg-ctp-surface0 rounded-lg cursor-pointer shadow-md"
      title={post.title}
      href={`/posts/${post.slug}`}
    >
      {post.image && (
        <div className="relative w-full h-24">
          <Image
            src={post.image}
            alt="thumbnail"
            layout="fill"
            className="rounded-t-md object-cover object-center"
          />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src={post.user?.avatar}
              alt="avatar"
              layout="fill"
              className="rounded-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col">
            <Link
              className="text-sm"
              href={`/${post.user?._id}`}
              title={`${post.user?.firstName} ${post.user?.lastName}`}
            >
              {post.user?.firstName} {post.user?.lastName}
            </Link>
            <span className="text-xs text-ctp-subtext0">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div className="py-3 px-10">
          <h2 className="text-4xl font-bold hover:text-ctp-green">
            {post.title}
          </h2>
          <div className="flex items-center gap-3 mt-2">
            {post.tags.map((tag) => (
              <span
                className="text-sm text-ctp-subtext0 hover:bg-ctp-surface1 p-1 rounded-md"
                key={tag}
                title={tag}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-10 mt-2 text-sm justify-between">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 bg-ctp-surface2 px-3 py-1 rounded-xl"
                title={`${post.likes} likes`}
              >
                <RiHeartAddLine className="text-xl text-ctp-red" />
                <span className="">{post.likes} likes</span>
              </div>
              <div
                className="flex items-center gap-2 bg-ctp-surface2 px-3 py-1 rounded-xl"
                title={`${post.comments} comments`}
              >
                <RiChat1Line className="text-xl text-ctp-blue" />
                <span className="">{post.comments} comments</span>
              </div>
            </div>
            <button
              className="text-xl text-ctp-text hover:text-ctp-mauve"
              title={`Save ${post.title}`}
            >
              <RiBookmarkFill />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
