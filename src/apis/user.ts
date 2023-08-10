import axios from "@/axios";
import { getToken } from "@/utils/functions";

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

export const apiVerifyCaptCha = async (captcha: string) => {
  const response = await axios({
    method: "GET",
    url: `/handleCaptcha/${captcha}`,
  });

  return response.data;
};

export const apiUpdateUser = async (firstName: string, lastName: string) => {
  const response = await axios({
    method: "PUT",
    url: "/user",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: {
      firstName,
      lastName,
    },
  });

  return response.data;
};
