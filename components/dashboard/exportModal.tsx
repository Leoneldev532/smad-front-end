"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { downloadCSV } from "@/lib/utils";
import dayjs from "dayjs";
import { Email, ExportModalProps } from "@/lib/type";

export default function ExportModal({
  isOpen,
  onClose,
  projectName,
  emails,
}: ExportModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="">
            Export mail address of project : {projectName}{" "}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <ul className="flex flex-col gap-y-2">
          <li>
            <button
              className="px-4 py-2 w-full group text-xs md:text-sm gap-x-4  border border-neutral-700 line1
    hover:bg-neutral-600 relative  flex justify-center items-center rounded-lg text-center"
              onClick={() =>
                downloadCSV(emails || [], `${projectName}-${dayjs()}`)
              }
            >
              {" "}
              Export To CSV{" "}
            </button>
          </li>
        </ul>

        <div className="w-full flex justify-end items-center">
          <Button className="w-full " onClick={onClose}>
            Cancel
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
