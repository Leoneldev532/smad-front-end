"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, type ProjectInput } from "@/lib/schemas";
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

interface ProjectCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectInput) => Promise<void>;
  isLoading: boolean;
}

export default function ProjectCreationDialog({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: ProjectCreationDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectInput>({
    resolver: zodResolver(ProjectSchema) as any,
    defaultValues: {
      name: "",
      withName: false,
    },
  });

  const handleOnSubmit = async (data: ProjectInput) => {
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
          <AlertDialogTitle>Créer un projet</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <AlertDialogDescription className="space-y-4">
            <div className="space-y-1">
              <Input
                type="text"
                placeholder="Nom du projet"
                {...register("name")}
                className={cn(
                  "rounded-md border border-neutral-700 bg-neutral-950",
                  errors.name && "border-destructive",
                )}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="addNameUser"
                {...register("withName")}
                className="mr-2 size-4 rounded bg-neutral-950 border-neutral-700"
              />
              <label htmlFor="addNameUser" className="text-sm cursor-pointer">
                Ajouter un champ &quot;Nom&quot; pour les utilisateurs
              </label>
            </div>
          </AlertDialogDescription>

          <AlertDialogFooter className="pt-6">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Annuler
            </Button>
            <ButtonValidation
              title="Créer"
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
