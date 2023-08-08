import { Metadata } from "next";
import * as apis from "@/apis";
import icons from "@/utils/icons";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const {
  RiBookmarkLine,
  RiHeartAddLine,
  RiChat1Line,
  RiMoreFill,
  RiHeartAddFill,
} = icons;

interface Props {
  params: {
    slug: string;
  };
}

interface Post {
  title: string;
  content: string;
  slug: string;
  image: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await apis.apiGetPostBySlug(params.slug);

  if (response) {
    return {
      title: response.title,
      description: response.content,
    };
  } else {
    return {
      title: "Post not found",
      description: "Post not found",
    };
  }
}

export async function generateStaticParams() {
  const response = await apis.apiGetPosts();
  if (response && response.length > 0) {
    return response.map((post: Post) => ({
      params: {
        slug: post.slug,
      },
    }));
  } else {
    return [];
  }
}

const BlogPostPage = async ({ params }: Props) => {
  const post = await apis.apiGetPostBySlug(params.slug);
  const user = await apis.apiGetUserById(post?.user);
  return (
    <div>
      {post ? (
        <div>
          <div className="max-w-[1200px] w-full mx-auto mt-5 flex gap-5">
            <div className="flex flex-col gap-7 mt-10">
              <div className="flex flex-col gap-2 items-center cursor-pointer select-none">
                <RiHeartAddLine className="text-2xl hover:text-ctp-red" />
                <span className="text-ctp-subtext0">{post?.likes}</span>
              </div>
              <div className="flex flex-col gap-2 items-center cursor-pointer">
                <RiChat1Line className="text-2xl" />
                <span className="text-ctp-subtext0">{post?.comments}</span>
              </div>
              <div className="flex flex-col gap-2 items-center cursor-pointer">
                <RiBookmarkLine className="text-2xl" />
              </div>
              <div className="flex flex-col gap-2 items-center cursor-pointer relative">
                <RiMoreFill className="text-2xl" />
              </div>
            </div>
            <div className="bg-ctp-surface0 rounded-lg flex-6 w-full ">
              {post?.image && (
                <div className="relative w-full h-72">
                  <Image
                    src={post?.image}
                    alt="thumbnail"
                    layout="fill"
                    className="rounded-t-lg object-cover object-center"
                  />
                </div>
              )}
              <div className="px-6 py-4">
                <h1 className="text-6xl font-bold my-3">{post?.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  {post?.tags?.map((tag: string) => (
                    <span
                      className="text-sm text-gray-500 hover:bg-gray-100 p-1 rounded-md"
                      key={tag}
                      title={tag}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="">
                  {post?.content && (
                    <ReactMarkdown>{post?.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-ctp-surface0 rounded-lg max-w-[350px] w-full inline-block flex-none">
              <div className="w-full h-14 bg-ctp-base rounded-t-lg"></div>
              <div className="px-5 flex">
                <div className="relative w-14 h-14 -translate-y-1/3">
                  <Image
                    src={user?.avatar}
                    alt="thumbnail"
                    layout="fill"
                    className="object-cover object-center rounded-md"
                  />
                </div>
                <span className="text-2xl font-bold ml-5">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Post not found</h1>
      )}
    </div>
  );
};

export default BlogPostPage;
