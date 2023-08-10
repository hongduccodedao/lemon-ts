import React from "react";
import { AvatarSetting, InfoSetting } from "@/components/setting";

const Page = () => {
  return (
    <div className="flex gap-10 max-w-[1200px] mx-auto py-10">
      <AvatarSetting />
      <InfoSetting />
    </div>
  );
};

export default Page;
