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
import { ProjectCreationDialogProps } from "@/lib/type";

export default function ProjectCreationDialog({
  isOpen,
  onClose,
  projectName,
  setProjectName,
  isCheckedFieldNameUser,
  setIsCheckedFieldNameUser,
  onSubmit,
  isLoading,
}: ProjectCreationDialogProps) {
  const handleSetProjectName = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="">Create a project</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={onSubmit}>
          <AlertDialogDescription>
            <Input
              type="text"
              value={projectName}
              onChange={handleSetProjectName}
              placeholder="name"
              className=" rounded-md border border-neutral-700"
            />
            <div className="flex items-center mt-4">
              <input
                checked={isCheckedFieldNameUser}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setIsCheckedFieldNameUser(e.target.checked)
                }
                type="checkbox"
                id="addNameUser"
                className="mr-2 size-5 rounded-lg"
              />
              <label htmlFor="addNameUser" className="text-sm">
                Add name Field
              </label>
            </div>
          </AlertDialogDescription>

          <AlertDialogFooter className="pt-3">
            <Button type="reset" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <ButtonValidation
              title={"create"}
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
