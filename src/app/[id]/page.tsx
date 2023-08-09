import React from "react";
import Image from "next/image";
import icons from "@/utils/icons";
import { Metadata } from "next";
import * as apis from "@/apis";
import { PostInformation, UserInformation } from "@/components/profile";

const { RiCake2Line, RiMailLine, RiSettingsLine } = icons;

interface Props {
  params: {
    id: string;
  };
}

interface User {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  createdAt: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await apis.apiGetUserById(params.id);
  if (response) {
    return {
      title: `${response.firstName} ${response.lastName}`,
    };
  } else {
    return {
      title: "User not found",
    };
  }
}

const Page = async () => {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto my-10 flex gap-10 flex-col">
        <UserInformation />
        <PostInformation />
      </div>
    </div>
  );
};

export default Page;
