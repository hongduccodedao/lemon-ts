"use client";
import React from "react";
import { useSelector } from "react-redux";

const CheckLogin = () => {
  const { isLogged } = useSelector((state: any) => state.user);

  return <div>{!isLogged && <span>Please login to continue</span>}</div>;
};

export default CheckLogin;
