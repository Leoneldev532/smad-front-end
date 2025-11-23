import React from "react";

const SkeletonEmailLine = () => {
  return (
    <div className="flex flex-col gap-y-2 w-full h-full justify-start items-start">
      <div className="flex gap-x-4 w-full justify-start items-start overflow-hidden">
        <div className="w-1/12  h-3    relative overflow-hidden bg-neutral-800 rounded-md ">
          <div className="skeleton-inner w-full h-full "> </div>{" "}
        </div>
        <div className="w-4/12  h-3    relative overflow-hidden bg-neutral-800 rounded-md ">
          <div className="skeleton-inner w-full h-full "> </div>{" "}
        </div>
        <div className="w-2/12  h-3    relative overflow-hidden bg-neutral-800 rounded-md ">
          <div className="skeleton-inner w-full h-full "> </div>{" "}
        </div>
      </div>

      <div className="flex gap-x-4 w-full justify-start items-start overflow-hidden">
        <div className="w-1/12  h-3    relative overflow-hidden bg-neutral-800 rounded-md ">
          <div className="skeleton-inner w-full h-full "> </div>{" "}
        </div>
        <div className="w-6/12  h-3    relative overflow-hidden bg-neutral-800 rounded-md ">
          <div className="skeleton-inner w-full h-full "> </div>{" "}
        </div>
        <div className="w-2/12  h-3    relative overflow-hidden bg-neutral-800 rounded-md ">
          <div className="skeleton-inner w-full h-full "> </div>{" "}
        </div>
      </div>

      <div className="flex gap-x-4 w-full justify-start items-start overflow-hidden">
        <div className="w-1/12  h-3    relative overflow-hidden bg-neutral-800 rounded-md ">
          <div className="skeleton-inner w-full h-full "> </div>{" "}
        </div>
        <div className="w-3/12  h-3    relative overflow-hidden bg-neutral-800 rounded-md ">
          <div className="skeleton-inner w-full h-full "> </div>{" "}
        </div>
        <div className="w-2/12  h-3    relative overflow-hidden bg-neutral-800 rounded-md ">
          <div className="skeleton-inner w-full h-full "> </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default SkeletonEmailLine;
