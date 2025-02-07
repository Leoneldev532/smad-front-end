import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
    baseURL: process.env.NEXTAUTH_URL, // Remplacez par votre URL d'API
});

// const session =  getSession(); // Récupérer la session
// Interceptor de requête
axiosInstance.interceptors.request.use(
    async (config) => {

        // if (session?.user) {
        //     const {  expires } = session; // Supposons que expires est dans user

        //     const currentTime = new Date(); // Temps actuel

        //     // Vérifier si le token est expiré
        //     if (new Date(expires) < currentTime) {
        //         return Promise.reject({ response: { status: 401, message: "Token expired" } });
        //     }

        //     // Ajouter le header Authorization
        //     // config.headers.Authorization = `Bearer ${accessToken}`;
        // }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Exporter l'instance Axios
export default axiosInstance;
