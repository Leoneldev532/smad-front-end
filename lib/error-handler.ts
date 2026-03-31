import { toast } from "sonner";
import { AxiosError } from "axios";

/**
 * Centralized error handler to provide consistent feedback for API and application errors.
 * @param error The error object caught in a try/catch or promise rejection.
 */
export const handleError = (error: any) => {
  if (error?.isAxiosError || error instanceof AxiosError) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;

    if (status === 401) {
      toast.error("Vous devez vous connecter", {
        description: "Votre session a expiré ou vous n'êtes pas autorisé.",
      });
      return;
    }

    if (status === 500) {
      toast.error("Une erreur est survenue dans nos services", {
        description: "Nos équipes ont été notifiées. Veuillez réessayer plus tard.",
      });
      return;
    }

    // Handle other status codes or generic axios errors
    const message = (axiosError.response?.data as any)?.message || axiosError.message || "Une erreur inattendue est survenue";
    toast.error(message);
  } else if (error instanceof Error) {
    // Handle generic JavaScript errors
    toast.error(error.message || "Une erreur est survenue");
  } else {
    // Fallback for unknown error types
    toast.error("Une erreur inconnue est survenue");
  }
};
