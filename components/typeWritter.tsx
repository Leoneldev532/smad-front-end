import React, { useEffect, useState } from 'react';

const Typewriter = ({ text, delay }:{text:string,delay:number}) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setCurrentText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, delay);

    return () => clearInterval(typingInterval); 
  }, [text, delay]);

  return <span>{currentText}</span>;
};


