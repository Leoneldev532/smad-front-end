import React from "react";
import { Button, ButtonProps } from "./ui/button";
import Loader2 from "./loader2";
import { cn } from "@/lib/utils";
import { ButtonValidationProps } from "@/lib/type";

const ButtonValidation: React.FC<ButtonValidationProps> = ({
  title,
  typeButton,
  onClick,
  type,
  isLoading,
  className,
  ...props
}) => {
  return (
    <Button
      variant={type === "negative" ? "destructive" : "default"}
      className={cn("flex gap-x-4 justify-center items-center", className)}
      type={typeButton}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="px-4">
          <Loader2 />
        </div>
      ) : (
        <span>{title}</span>
      )}
    </Button>
  );
};

export default ButtonValidation;
