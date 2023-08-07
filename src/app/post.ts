import axios from "axios";

export const apiGetPostBySlug = async (slug: string) => {
  const response = await axios.get(
    `https://lemon-code-page.onrender.com/api/post/${slug}`,
  );
  return response.data.data;
};
