import axios from "@/axios";

export const apiGetCurrentUser = async () => {
  const response = await axios({
    method: "GET",
    url: "/user/getCurrent",
  });
  return response.data;
};
