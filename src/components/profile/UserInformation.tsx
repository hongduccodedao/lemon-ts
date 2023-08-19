"use client";
import React from "react";
import { usePathname } from "next/navigation";
import * as apis from "@/apis";
import Image from "next/image";
import icons from "@/utils/icons";
import { useSelector } from "react-redux";
import Link from "next/link";
import { paths } from "@/utils/paths";

const { RiCake2Line, RiMailLine, RiSettingsLine } = icons;

const avatarDefault =
  "https://res.cloudinary.com/diip1zrth/image/upload/v1691030887/lemon-page-code/image_processing20201216-8146-1bkbicd_thj77c.png";

interface User {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  createdAt: Date;
}

const UserInformation = () => {
  const pathname = usePathname();
  const [user, setUser] = React.useState<User>();
  const { current } = useSelector((state: any) => state.user);

  const getUser = async () => {
    const response = await apis.apiGetUserById(pathname as string);
    setUser(response);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex gap-10">
      <div className="relative w-[250px] h-[250px]">
        <Image
          src={user?.avatar || avatarDefault}
          alt="avatar"
          layout="fill"
          className="rounded-full object-cover border-4 border-ctp-surface0 shadow-xl"
        />
      </div>
      <div className="flex-1 flex flex-col gap-10">
        <div className="w-full h-[250px] bg-ctp-surface0 rounded-xl p-8 flex justify-center flex-col gap-5 relative shadow-lg">
          {current?._id === pathname.slice(1) && (
            <Link href={paths.SETTING} title="Setting">
              <RiSettingsLine className="absolute top-10 right-10 cursor-pointer text-2xl hover:text-ctp-green" />
            </Link>
          )}
          <h1 className="font-bold text-5xl">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="flex items-center gap-10 text-ctp-subtext0">
            <span className="flex items-center gap-3">
              <RiCake2Line className="inline-block text-2xl" />
              <span className="">
                Joined on {new Date(user?.createdAt || "").toDateString()}
              </span>
            </span>
            <span className="flex items-center gap-3">
              <RiMailLine className="inline-block text-2xl" />
              <span className="">
                <a href={`mailto:${user?.email}`} className="font-bold">
                  {user?.email}
                </a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
