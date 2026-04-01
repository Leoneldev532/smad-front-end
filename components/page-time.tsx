import React from "react";
import dayjs from "dayjs";
import { TimeProps } from "@/lib/type";

const time: React.FC<TimeProps> = ({ date }) => {
  const inputDate = dayjs(date);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, "day");

  let displayText = "";
  let borderColor = "";

  if (inputDate.isSame(today, "day")) {
    displayText = "Today";
  } else if (inputDate.isSame(yesterday, "day")) {
    displayText = "Yesterday";
  } else {
    displayText = inputDate.format("DD/MM/YYYY");
  }

  return <div className={"italic text-neutral-500 "}>{displayText}</div>;
};

export default time;
