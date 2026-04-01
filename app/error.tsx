"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    toast.error("Oups ! Une erreur critique s'est produite", {
      description: "Nous avons été informés du problème.",
    });
  }, [error]);

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-red-500">
          Quelque chose s&apos;est mal passé !
        </h2>
        <p className="mx-auto max-w-[600px] text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Une erreur inattendue a interrompu l&apos;application. Ne vous
          inquiétez pas, vos données sont en sécurité.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => reset()}
          className="inline-flex h-10 items-center justify-center rounded-md bg-yellow-500 px-8 text-sm font-medium text-black shadow transition-colors hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Réessayer
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-800 bg-black px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Retour à l&apos;accueil
        </button>
      </div>
    </div>
  );
}
