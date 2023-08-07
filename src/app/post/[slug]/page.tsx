import { Metadata } from "next";
import axios from "axios";
import { apiGetPostBySlug } from "@/app/post";

interface Props {
  params: {
    slug: string;
  };
}

interface Post {
  title: string;
  content: string;
  slug: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await axios.get(
    `https://lemon-code-page.onrender.com/api/post/${params.slug}`,
  );

  if (response.data.err === 0) {
    return {
      title: response.data.data.title,
      description: response.data.data.content,
    };
  } else {
    return {
      title: "Post not found",
      description: "Post not found",
    };
  }
}

export async function generateStaticParams() {
  const response = await axios.get(
    `https://lemon-code-page.onrender.com/api/post/getAll`,
  );

  if (response.data.err === 0) {
    return response.data.data.map((post: any) => ({
      params: {
        slug: post.slug,
      },
    }));
  } else {
    return [];
  }
}

const BlogPostPage = async ({ params }: Props) => {
  const post = await apiGetPostBySlug(params.slug);

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
