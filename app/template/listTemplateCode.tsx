export const logicImportString = `import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";`;

export const logicEmailSubmition: string = `
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


const API_URL = "https://api.smadmail.com/api/v1/email/save";
const CONTENT_TYPE = "application/json";

const getErrorMessage = (axiosError: AxiosError) => axiosError.message || 'An error occurred';

const defaultValidationRules: ValidationRules = {
    email: (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

`;

export const TabTemplateCode = [
  {
    id: 1,
    code: `const project_id = process.env.SMAD_PROJECT_ID|| " ";
    const private_key = process.env.SMAD_API_PRIVATE_KEY  || " ";

    const { data, setData, errors, handleSubmit, loading, success } = useEmailForm(project_id, private_key);
 const formClasses = "flex bg-neutral-700 border border-neutral-700/40 py-0.5 px-0.5 overflow-hidden rounded-xl justify-between";
    const buttonClasses = "px-3 w-1/3 rounded-xl py-1  group  flex justify-center items-center text-black font-bold hover:bg-neutral-900 hover:text-white transition-all ease duration-300  text-sm bg-yellow-500";
    const inputClasses = "px-2.5 appearance-none  text-neutral-400 font-medium py-2.5 outline-none text-sm w-full bg-neutral-700 text-capitalize";

    return (
        <section className="flex flex-col py-10">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className={formClasses}>
                <div className="flex w-8/12 px-1.5 overflow-hidden justify-start items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 stroke-neutral-500"
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
                        className={inputClasses}
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className={buttonClasses}
                    aria-label="save"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="animate-spin h-5 w-5 border-2 group-hover:border-t-white group-hover:border-b-transparent  border-b-transparent border-r-transparent border-neutral-900 rounded-full"></div>
                    ) : success ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    ) : (
                        'save'
                    )}
                </button>
            </form>
            {errors.email && <p className="text-red-500 mt-2 w-full text-center">{errors.email}</p>}
        </section>)
        `,
  },
  {
    id: 2,
    code: `
         const project_id = process.env.SMAD_PROJECT_ID || " ";
    const private_key = process.env.SMAD_API_PRIVATE_KEY  || " ";

    const { data, setData, errors, handleSubmit, loading, success } = useEmailForm(project_id, private_key);

    // Constantes pour les classes CSS
  
    const formClasses = "flex bg-neutral-700 border border-neutral-700/40 py-0.5 px-0.5 overflow-hidden rounded-full justify-between";
    const buttonClasses = "px-3 w-1/3 rounded-full py-1  group  flex justify-center items-center text-black font-bold hover:bg-neutral-900 hover:text-white transition-all ease duration-300  text-sm bg-yellow-500";
    const inputClasses = "px-2.5 appearance-none  text-neutral-400 font-medium py-2.5 outline-none text-sm w-full bg-neutral-700 text-capitalize";

    return (
        <section className="flex flex-col py-10">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className={formClasses}>
                <div className="flex w-8/12 px-1.5 overflow-hidden justify-start items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 stroke-neutral-500"
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
                        className={inputClasses}
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className={buttonClasses}
                    aria-label="save"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="animate-spin h-5 w-5 border-2 group-hover:border-t-white group-hover:border-b-transparent  border-b-transparent border-r-transparent border-neutral-900 rounded-full"></div>
                    ) : success ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    ) : (
                        'save'
                    )}
                </button>
            </form>
            {errors.email && <p className=" mt-2 w-full text-red-500 text-center">{errors.email}</p>}
        </section>)
        `,
  },
  {
    id: 3,
    code: `
           const project_id = process.env.SMAD_PROJECT_ID  || " ";
    const private_key = process.env.SMAD_API_PRIVATE_KEY  || " ";

    const { data, setData, errors, handleSubmit, loading, success } = useEmailForm(project_id, private_key);

    // Constantes pour les classes CSS
    const formClasses = "flex bg-neutral-700 border border-neutral-700/40 py-0.5 px-0.5 overflow-hidden rounded-full justify-between";
    const buttonClasses = " w-1/5 rounded-full py-1  group  flex justify-center items-center text-black font-bold hover:bg-neutral-900 hover:text-white transition-all ease duration-300  text-sm bg-yellow-500";
    const inputClasses = "px-2.5 appearance-none   text-neutral-400 font-medium py-2.5 outline-none text-sm w-full bg-neutral-700 text-capitalize";

    return (
        <section className="flex flex-col py-10">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className={formClasses}>
                <div className="flex w-8/12 px-1.5 overflow-hidden justify-start items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 stroke-neutral-500"
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
                        className={inputClasses}
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className={buttonClasses}
                    aria-label="save"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="animate-spin h-5 w-5 border-2 group-hover:border-t-white group-hover:border-b-transparent  border-b-transparent border-r-transparent border-neutral-900 rounded-full"></div>
                    ) : success ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>
                    )}
                </button>
            </form>
            {errors.email && <p className=" mt-2 w-full text-red-500 text-center">{errors.email}</p>}
        </section>)
        
        `,
  },
];
