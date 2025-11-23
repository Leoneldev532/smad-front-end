"use client";

import { ChangeEvent, FormEvent } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ButtonValidation from "@/components/buttonValidation";
import { EmailAdditionDialogProps } from "@/lib/type";

export default function EmailAdditionDialog({
  isOpen,
  onClose,
  projectName,
  projectIswithName,
  emailAddress,
  setEmailAddress,
  name,
  setName,
  onSubmit,
  isLoading,
}: EmailAdditionDialogProps) {
  const handleSetEmailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value);
  };

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="">
            Add email on project : {projectName}{" "}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={onSubmit}>
          <AlertDialogDescription>
            {projectIswithName && (
              <Input
                type="text"
                required
                value={name}
                onChange={handleSetName}
                placeholder="Name"
                className="rounded-md my-3 border border-neutral-700"
              />
            )}

            <Input
              type="email"
              required
              pattern={"[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"}
              value={emailAddress}
              onChange={handleSetEmailAddress}
              placeholder="monEmail@gmail.com"
              className="rounded-md border border-neutral-700"
            />
          </AlertDialogDescription>

          <AlertDialogFooter className="my-3">
            <Button type="reset" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <ButtonValidation
              title={"Create"}
              isLoading={isLoading}
              typeButton="submit"
              type="positive"
            />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
