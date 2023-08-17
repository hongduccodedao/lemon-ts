import axios from "@/axios";
import { getToken } from "@/utils/functions";

export const apiGetPosts = async () => {
  const response = await axios({
    method: "GET",
    url: "/post/getAll",
  });
  if (response.data.err === 0) {
    return response.data.data;
  } else {
    return response.data.message;
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

export const apiGetPostByUserId = async (uid: string) => {
  const response = await axios({
    method: "GET",
    url: `/post/getPostsUser/${uid}`,
  });

  if (response.data.err === 0) {
    return response.data.data;
  } else {
    return response.data.message;
  }
};

export const apiLikePost = async (
  pid: string,
  quantity: number,
  uid: string
) => {
  const response = await axios({
    method: "POST",
    url: `/post/like/${pid}`,
    data: {
      uid,
      quantity,
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (response.data.err === 0) {
    return response.data;
  } else {
    return response.data.message;
  }
};
