import { useEffect, useState } from "react";
import {
  ValidationRules,
  FormData,
  EmailSubmissionState,
  FormValidationState,
} from "@/lib/type";
import { saveEmailToExternalAPI2 } from "@/hook/query";

const getErrorMessage = (error: any) => error.message || "An error occurred";

const defaultValidationRules: ValidationRules = {
  email: (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      return "Email address is required";
    } else if (!emailRegex.test(email)) {
      return "Email address must be valid";
    }
    return null;
  },
};

const useEmailForm = (
  project_id: string,
  private_key: string,
  customValidationRules?: ValidationRules,
) => {
  const validationRules = customValidationRules || defaultValidationRules;

  const [data, setData] = useState({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const validationErrors: Record<string, string> = {};
    Object.keys(validationRules).forEach((email: string) => {
      const rule: any = validationRules[email];
      const error = rule(data.email as any);
      if (error) {
        validationErrors[email] = error;
      }
    });
    return validationErrors;
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
      await saveEmailToExternalAPI2(data.email, project_id, private_key);
      setSuccess(true);
    } catch (error) {
      setErrors({ email: getErrorMessage(error) });
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
