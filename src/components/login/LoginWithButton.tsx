import React from "react";
import icons from "@/utils/icons";

const { RiGithubFill, RiGoogleFill } = icons;
const LoginWithButton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center gap-3 text-xl bg-ctp-red text-ctp-base py-2 text-center rounded-md">
        <RiGoogleFill />
        Login with Google
      </div>
      <div className="flex items-center justify-center gap-3 text-xl bg-ctp-subtext1 text-ctp-base py-2 text-center rounded-md">
        <RiGithubFill />
        Login with Github
      </div>
    </div>
  );
};

export default LoginWithButton;
