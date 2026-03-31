import { useEffect, useState } from "react";
import { EmailSchema } from "@/lib/schemas";
import {
  ValidationRules,
  FormData,
  EmailSubmissionState,
  FormValidationState,
} from "@/lib/type";
import { ApiService } from "@/lib/api-service";

const useEmailForm = (
  project_id: string,
  private_key: string,
  customValidationRules?: ValidationRules,
) => {
  const [data, setData] = useState({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const result = EmailSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      return fieldErrors;
    }
    return {};
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await ApiService.saveEmailExternalAlt(
        data.email,
        project_id,
        private_key,
      );
      setSuccess(true);
    } catch (error: any) {
      setErrors({ email: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setData({ email: " " });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return {
    data,
    setData,
    errors,
    handleSubmit,
    loading,
    success,
  };
};

export default useEmailForm;
