import React from 'react';
import { cn } from '@/lib/utils'; // Assurez-vous que le chemin est correct

const iconMap = {
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15l3-3.25M21 12a9 9 0 1-18a9,9,0,0,1,18,0Z" />
    </svg>
  )
};

interface MessageProps {
    text: string;          // Texte du message
    variant?: 'success' | 'error' | 'info' | 'warning'; // Variantes de style
}

const Message: React.FC<MessageProps> = ({ text, variant = 'info' }) => {
    const messageClasses = cn(
        'flex gap-3 px-3 py-2 w-full justify-start items-center rounded',
        {
            'bg-green-100 text-green-800': variant === 'success',
            'bg-red-100/70 text-red-800': variant === 'error',
            'bg-blue-100 text-blue-800': variant === 'info',
            'bg-yellow-100 text-yellow-800': variant === 'warning',
        }
    );

    return (
        <div className={messageClasses}>
            {iconMap[variant]} 
            <span>{text}</span>
        </div>
    );
};

export default Message;
