import axios from "@/axios";

export const apiGetTags = async () => {
  const response = await axios({
    method: "GET",
    url: "/post/getAllTags",
  });

  if (response.data.err === 0) {
    return response.data.data;
  } else {
    return response.data.message;
  }
};
