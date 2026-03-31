"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapSchema, type MapInput } from "@/lib/schemas";
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
import ButtonValidation from "@/components/button-validation";
import { cn } from "@/lib/utils";

interface MapCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MapInput) => Promise<void>;
  isLoading: boolean;
}

export default function MapCreationDialog({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: MapCreationDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MapInput>({
    resolver: zodResolver(MapSchema),
    defaultValues: {
      link: "",
    },
  });

  const handleOnSubmit = async (data: MapInput) => {
    await onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-neutral-900 border border-neutral-800">
        <AlertDialogHeader>
          <AlertDialogTitle>Ajouter une nouvelle carte</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <AlertDialogDescription className="space-y-4">
            <div className="space-y-1">
              <Input
                type="text"
                placeholder="Lien de la carte (ex: https://example.com)"
                {...register("link")}
                className={cn(
                  "rounded-md border border-neutral-700 bg-neutral-950",
                  errors.link && "border-destructive",
                )}
              />
              {errors.link && (
                <p className="text-xs text-destructive">
                  {errors.link.message}
                </p>
              )}
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter className="mt-6">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Annuler
            </Button>
            <ButtonValidation
              title="Ajouter"
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
