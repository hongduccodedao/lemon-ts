import { Metadata } from "next";
import * as apis from "@/apis";

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
  return (
    <div>
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ) : (
        <h1>Post not found</h1>
      )}
    </div>
  );
};

export default BlogPostPage;
