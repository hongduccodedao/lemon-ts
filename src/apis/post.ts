import axios from "@/axios";

export const apiGetPosts = async () => {
  const response = await axios({
    method: "GET",
    url: "/post/getAll",
  });
  if (response.data?.err === 0) {
    return response.data?.data;
  } else {
    return response.data?.message;
  }
};

export const apiGetPostBySlug = async (slug: string) => {
  const response = await axios({
    method: "GET",
    url: `/post/${slug}`,
  });

  if (response.data.err === 0) {
    return response.data.data;
  } else {
    return response.data.message;
  }
};
