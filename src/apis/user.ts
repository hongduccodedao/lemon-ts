import axios from "@/axios";

export const apiGetCurrentUser = async () => {
  const response = await axios({
    method: "GET",
    url: "/user/getCurrent",
  });
  return response.data;
};

export const apiGetUserById = async (uid: string) => {
  const response = await axios({
    method: "GET",
    url: `/user/${uid}`,
  });

  if (response.data.err === 0) {
    return response.data.data;
  } else {
    return response.data.message;
  }
};
