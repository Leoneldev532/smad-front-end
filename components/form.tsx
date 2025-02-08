
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
const formRegisterEmail = ()=> {

type ValidationRules = {
    [key: string]: (value: any) => string | null;
};

type FormData = {
    [key: string]: any;
};

type EmailSubmissionState = {
    handleSubmit: (email: string) => Promise<void>;
    error: string;
    loading: boolean;
    success: boolean;
};

type FormValidationState = {
    data: FormData;
    setData: (data: FormData) => void;
    errors: Record<string, string>;
    handleSubmit: () => Promise<void>;
    loading: boolean;
    success: boolean;
};


const API_URL = "https://smad.leonelyimga.com/api/v1/email/save";
const CONTENT_TYPE = "application/json";

const getErrorMessage = (axiosError: AxiosError) => axiosError.message || 'An error occurred';

const defaultValidationRules: ValidationRules = {
    email: (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        if (!email) {
            return 'L adresse email est requise';
        } else if (!emailRegex.test(email)) {
            return 'L adresse email doit être valide';
        }
        return null;
    },
};

const useEmailForm = (project_id: string, private_key: string, customValidationRules?: ValidationRules) => {
    const validationRules = customValidationRules || defaultValidationRules;

    const [data, setData] = useState({ email: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const validationErrors: Record<string, string> = {};
        Object.keys(validationRules).forEach((key:string) => {
            const rule = validationRules[key];
            const error = rule(data[key]);
            if (error) {
                validationErrors[key] = error;
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
            const response = await axios.post(API_URL, {
                email: data.email,
                project_id,
                private_key
            }, {
                headers: {
                    "Content-Type": CONTENT_TYPE
                }
            });
            console.log(response.data);
            setSuccess(true);
        } catch (error) {
            const axiosError = error as AxiosError;
            setErrors({ email: getErrorMessage(axiosError) });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
                setData({email:" "})
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


 
 }
 export default formRegisterEmail
        