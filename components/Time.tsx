import React from 'react';
import dayjs from 'dayjs';

interface TimeProps {
  date: Date; // La date passée en tant que prop
}

const Time: React.FC<TimeProps> = ({ date }) => {
  const inputDate = dayjs(date);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  let displayText = '';
  let borderColor = '';

  if (inputDate.isSame(today, 'day')) {
    displayText = "Today";
    // borderColor = 'red';
  } else if (inputDate.isSame(yesterday, 'day')) {
    displayText = 'Yesterday';
    // borderColor = 'blue';
  } else {
    displayText = inputDate.format('DD/MM/YYYY');
    // borderColor = 'blue';
  }

  return (
    <div className={"italic text-neutral-500 "}>
      {displayText}
    </div>
  );
};

export default Time;
