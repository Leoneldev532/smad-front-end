"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchema, type EmailInput } from "@/lib/schemas";
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

interface EmailAdditionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectIswithName: boolean;
  onSubmit: (data: EmailInput) => Promise<void>;
  isLoading: boolean;
}

export default function EmailAdditionDialog({
  isOpen,
  onClose,
  projectName,
  projectIswithName,
  onSubmit,
  isLoading,
}: EmailAdditionDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailInput>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const handleOnSubmit = async (data: EmailInput) => {
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
          <AlertDialogTitle>
            Ajouter un email au projet : {projectName}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <AlertDialogDescription className="space-y-4">
            {projectIswithName && (
              <div className="space-y-1">
                <Input
                  type="text"
                  placeholder="Nom du contact"
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
            )}

            <div className="space-y-1">
              <Input
                type="email"
                placeholder="nom@exemple.com"
                {...register("email")}
                className={cn(
                  "rounded-md border border-neutral-700 bg-neutral-950",
                  errors.email && "border-destructive",
                )}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </AlertDialogDescription>

          <AlertDialogFooter className="pt-6">
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
