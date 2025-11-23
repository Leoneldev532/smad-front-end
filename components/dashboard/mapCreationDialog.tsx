"use client";

import { FormEvent } from "react";
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
import { MapCreationDialogProps } from "@/lib/type";

export default function MapCreationDialog({
  isOpen,
  onClose,
  mapLink,
  setMapLink,
  onSubmit,
  isLoading,
}: MapCreationDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle>Add a New Map</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={onSubmit}>
          <AlertDialogDescription>
            <Input
              type="text"
              required
              value={mapLink}
              onChange={(e) => setMapLink(e.target.value)}
              placeholder="Enter map link (e.g., https://example.com)"
              className="rounded-md border border-neutral-700"
            />
          </AlertDialogDescription>
          <AlertDialogFooter className="mt-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <ButtonValidation
              title="Add Map"
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
