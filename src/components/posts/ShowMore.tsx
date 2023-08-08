"use client";
import React from "react";
import icons from "@/utils/icons";
import { MenuShare } from "@/components/posts";

const { RiMoreFill } = icons;

const ShowMore = () => {
  const [isShow, setIsShow] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 items-center cursor-pointer relative">
      <RiMoreFill className="text-2xl" onClick={() => setIsShow(!isShow)} />
      {isShow && <MenuShare />}
    </div>
  );
};

export default ShowMore;
