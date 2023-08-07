import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";

interface Post {
  title: string;
  content: string;
}

interface Props {
  post: Post | null;
}

interface PathParams {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const response = await axios.get(
    `https://lemon-code-page.onrender.com/api/post/getAll`,
  );

  if (response.data.err === 0) {
    const paths = response.data.data.map((post: any) => ({
      params: {
        slug: post.slug,
      },
    }));
    return {
      paths,
      fallback: false,
    };
  } else {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps<Props, PathParams> = async ({
  params,
}) => {
  const response = await axios.get(
    `https://lemon-code-page.onrender.com/api/post/${params?.slug}`,
  );

  if (response.data.err === 0) {
    const post: Post = {
      title: response.data.data.title,
      content: response.data.data.content,
    };
    return {
      props: {
        post,
      },
    };
  } else {
    return {
      props: {
        post: null,
      },
    };
  }
};

const BlogPostPage: React.FC<Props> = ({ post }) => {
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
