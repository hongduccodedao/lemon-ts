import axios from "@/axios";

// get token from localStorage
export const getToken = (): string | null => {
  const localStorageData = window.localStorage.getItem("persist:lemon/user");

  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);

    if (typeof parsedData === "object" && "token" in parsedData) {
      const accessToken = parsedData.token;
      return accessToken.replace(/"/g, "");
    }
  }

  return null;
};

export const apiGetCurrentUser = async () => {
  const response = await axios({
    method: "GET",
    url: "/user/getCurrent",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
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

export const apiLogin = async (email: string, password: string) => {
  const response = await axios({
    method: "POST",
    url: "/auth/login",
    data: {
      email,
      password,
    },
  });

  return response.data;
};

export const apiRegister = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  const response = await axios({
    method: "POST",
    url: "/auth/register",
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });

  return response.data;
};
