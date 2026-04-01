import { LoaderPropsType } from "@/lib/type";
import { cn } from "@/lib/utils";
import React from "react";

const Loader: React.FC<LoaderPropsType> = ({
  height = "6",
  width = "6",
}: LoaderPropsType) => {
  return (
    <div
      className={cn(
        "h-8 w-8 rounded-full border-2 border-t-2 max-w-full max-h-full border-t-white border-l-transparent border-b-transparent border-r-transparent animate-spin",
        height ? `h-${height}` : "",
        width ? `w-${width}` : "",
      )}
    ></div>
  );
};

export default Loader;
