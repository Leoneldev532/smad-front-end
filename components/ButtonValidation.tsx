import React from 'react';
import { Button } from './ui/button';
import Loader2 from './Loader2';
import { cn } from '@/lib/utils';

// Définir le type des props
type ButtonType = {
  title: string;
  typeButton: "button" | "reset" | "submit";
  onClick?: () => void;
  type: "positive" | "negative";
  isLoading: boolean;
  className?:string
};

const ButtonValidation: React.FC<ButtonType> = ({
  title,
  typeButton,
  onClick,
  type,
  isLoading,
  className
}) => {
  return (
    <Button
      variant={type === "negative" ? "destructive" : "default"}
      className={cn("flex gap-x-4 justify-center items-center",className)}
      type={typeButton}
      onClick={onClick}
      disabled={isLoading} 
    >
      {isLoading ? <div className="px-4"><Loader2 /></div> : <span>{title}</span>}
    </Button>
  );
};

export default ButtonValidation;
