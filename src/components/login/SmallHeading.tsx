import React from "react";

interface Props {
  text: string;
}

const SmallHeading = ({ text }: Props) => {
  return (
    <div className="relative after:absolute after:w-full after:h-[1px] after:bg-ctp-surface2 after:top-1/2 after:left-0 after:rounded-md my-5">
      <span className="text-xs bg-ctp-surface0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 whitespace-nowrap z-10 text-ctp-text">
        {text}
      </span>
    </div>
  );
};

export default SmallHeading;
