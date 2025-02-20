import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

type ValidationRules = {
    [key: string]: (value: any) => string | null;
};

type FormData = {
    [key: string]: any;
};

const API_URL = "https://api.smadmail.com/api/v1/email/save";
const CONTENT_TYPE = "application/json";

const getErrorMessage = (axiosError: AxiosError) => axiosError.message || 'An error occurred';

const defaultValidationRules: ValidationRules = {
    email: (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        if (!email) {
            return 'L\'adresse email est requise';
        } else if (!emailRegex.test(email)) {
            return 'L\'adresse email doit être valide';
        }
        return null;
    },
};

const useEmailForm = (project_id: string, private_key: string, customValidationRules?: ValidationRules) => {
    const validationRules = customValidationRules || defaultValidationRules;

    const [data, setData] = useState<FormData>({ email: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const validationErrors: Record<string, string> = {};
        Object.keys(validationRules).forEach((key) => {
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
                setData({ email: "" });
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

const EmailRegistrationForm: React.FC = () => {
    const project_id = process.env.API_SMAD_PROJECT_ID || " ";
    const private_key = process.env.API_SMAD_PRIVATE_KEY || " ";

    const { data, setData, errors, handleSubmit, loading, success } = useEmailForm(project_id, private_key);

    return (
        <section className="form-section">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="form-container">
                <div className="input-container">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="email-icon"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                    </svg>
                    <label htmlFor="email-input" className="sr-only">Email</label>
                    <input
                        id="email-input"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        className="email-input"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="submit-button"
                    aria-label="save"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="loading-spinner"></div>
                    ) : success ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="success-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    ) : (
                        'save'
                    )}
                </button>
            </form>
            {errors.email && <p className="error-message">{errors.email}</p>}
        </section>
    );
};

export default EmailRegistrationForm;
