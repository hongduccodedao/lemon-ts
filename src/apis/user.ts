import axios from "@/axios";

const accessToken = () => {
  let localStorageData = window.localStorage.getItem("persist:lemon/user");
  if (localStorageData && typeof localStorageData === "string") {
    localStorageData = JSON.parse(localStorageData);
    const AToken = JSON.parse(localStorageData.token);
    return AToken;
  }
};
export const apiGetCurrentUser = async () => {
  const response = await axios({
    method: "GET",
    url: "/user/getCurrent",
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  });
  return response.data;
};
