import React from "react";
import * as apis from "@/apis";

const Tags = async () => {
  const tags = await apis.apiGetTags();

  return (
    <div className=" w-full lg:w-[200px] px-2 lg:px-0">
      <h2 className="text-xl lg:text-2xl font-bold">Tags</h2>
      <div className="w-full h-0.5 bg-ctp-overlay1 my-4"></div>
      <div className="flex flex-wrap lg:flex-col gap-2">
        {tags.length > 0 ? (
          <>
            {tags.map((tag: string) => (
              <div
                key={tag}
                className="hover:bg-ctp-green hover:text-ctp-base p-2 rounded-lg hover:underline cursor-pointer"
              >
                <p>#{tag}</p>
              </div>
            ))}
          </>
        ) : (
          <p>No tags</p>
        )}
      </div>
    </div>
  );
};

export default Tags;
