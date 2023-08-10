import React from "react";

interface Props {
  isSmall?: boolean;
}

const Loading = ({ isSmall = false }: Props) => {
  return (
    <div
      className={`${
        isSmall ? "w-5 h-5 border-2" : "w-10 h-10 border-4"
      } border-ctp-green rounded-full animate-spin border-t-transparent`}
    ></div>
  );
};

export default Loading;
