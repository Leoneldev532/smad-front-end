import { getProducts } from "@/app/lemon";
import axiosInstance from "@/lib/api.intercept";
import { Email, Project, User } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getAllProjectOneUserFunc = async (idUser: string | null | undefined): Promise<Project[]> => {
    if (!idUser) throw new Error("Invalid user ID");
    const response = await axiosInstance.get(`./api/users/${idUser}/projects`);
    return response.data;
};

export const getAllEmailsOneProjectFunc = async (idUser: string | null | undefined, idProject: string): Promise<Email[]> => {
    if (!idUser || !idProject) throw new Error("Invalid user ID or project ID");
    const response = await axiosInstance.get(`./api/users/${idUser}/projects/${idProject}/emails`);
    return response.data;
};

export const getAllUserInfo = async (idUser: string | null | undefined): Promise<User> => {
    if (!idUser) throw new Error("Invalid user ID");
    const response = await axiosInstance.get(`./api/users/${idUser}`);
    return response.data;
};

export const getAllUserTrial_planFunc = async (idUser: string | null | undefined): Promise<{ trial_is_finished: boolean }> => {
    if (!idUser) throw new Error("Invalid user ID");
    const response = await axiosInstance.get(`./api/users/${idUser}/trialplan`);
    return response.data;
};

export const deleteProject = async (idUser: string | null | undefined, idProject: string): Promise<Email[]> => {
    if (!idUser || !idProject) throw new Error("Invalid user ID or project ID");
    const response = await axiosInstance.delete(`./api/users/${idUser}/projects/${idProject}/delete`);
    return response.data;
};

export const deleteEmail = async (idUser: string | null | undefined, idProject: string, idEmail: string): Promise<Email[]> => {
    if (!idUser || !idProject || !idEmail) throw new Error("Invalid user ID, project ID, or email ID");
    const response = await axiosInstance.delete(`./api/users/${idUser}/projects/${idProject}/emails/${idEmail}/delete`);
    return response.data;
};

export const updateEmail = async (idUser: string | null | undefined, idProject: string, idEmail: string, newValue: string): Promise<Email[]> => {
    if (!idUser || !idProject || !idEmail || !newValue) throw new Error("Invalid parameters");
    console.log(newValue);
    const response = await axiosInstance.put(`./api/users/${idUser}/projects/${idProject}/emails/${idEmail}/update`, {
        newEmail: newValue
    });
    return response.data;
};

export const createProject = async (idUser: string | null | undefined, nameProject: string) => {
    if (!idUser || !nameProject) throw new Error("Invalid user ID or project name");
    const response = await axiosInstance.post(`./api/users/${idUser}/projects`, {
        name: nameProject
    });
    return response.data;
};

export const updateProject = async (idUser: string | null | undefined, idProject: string, newNameProject: string) => {
    if (!idUser || !idProject || !newNameProject) throw new Error("Invalid parameters");
    const response = await axiosInstance.put(`./api/users/${idUser}/projects/${idProject}/update`, {
        name: newNameProject
    });
    return response.data;
};

export const addEmailAddress = async (idUser: string | null | undefined, idProject: string, nameEmail: string) => {
    if (!idUser || !idProject || !nameEmail) throw new Error("Invalid parameters");
    const response = await axiosInstance.post(`./api/users/${idUser}/projects/${idProject}/emails`, {
        email: nameEmail
    });
    return response.data;
};

export const useGetAllEmailsOneProject = (userId: string | null | undefined, idProject: string) => {
    return useQuery({
        queryKey: ["getAllEmailsOneProjectFunc", userId, idProject],
        queryFn: () => getAllEmailsOneProjectFunc(userId, idProject),
        gcTime: 5 * 60 * 1000,
        enabled: !!userId && !!idProject,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchInterval: false, 
        retry: 3,
    });
};

export const useGetAllProjectsOfOneUser = (userId: string | null | undefined) => {
    
    return useQuery({
        queryKey: ["getAllProjectsOneUser", userId],
        queryFn: () => getAllProjectOneUserFunc(userId),
        gcTime: 5 * 60 * 1000,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: !!userId,
        refetchInterval: false, 
        retry: 3,
    });
};

export const getprivateKeyUser = async (idUser: string | null | undefined): Promise<{ privateKey: string, expiresAt: string }> => {
    if (!idUser) throw new Error("Invalid user ID");
    const response = await axiosInstance.get(`./api/users/${idUser}/privateKey`);
    return response.data;
};

export const setSubscriptionTrial = async (idUser: string | null | undefined) => {
    // if (!idUser) throw new Error("Invalid user ID");
    const response = await axiosInstance.put(`./api/users/${idUser}/trialplan/update`, {});
    return response.data;
};

export const useGetprivateKeyOfOneUser = (userId: string | null | undefined) => {
    return useQuery({
        queryKey: ["privateKeyOfOneUser", userId],
        queryFn: () => getprivateKeyUser(userId),
        enabled: !!userId,
        gcTime: Infinity,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    });
};

export const useGetPricingProducts = () => {
    return useQuery({
        queryKey: ["pricing_products"],
        queryFn: () => getProducts(),
        gcTime: 5 * 60 * 1000,
        staleTime: Infinity,
        refetchOnWindowFocus: false
    });
};

export const useAllUserTrialplan = (userId: string | null | undefined) => {
   
    return useQuery({
        queryKey: ["getAllUserTrial_plan"],
        queryFn: () => getAllUserTrial_planFunc(userId),
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!userId
    });
};

export const useGetAllUserInfo = (userId: string | null | undefined) => {
    return useQuery({
        queryKey: ["userInfos", userId],
        queryFn: () => getAllUserInfo(userId),
        gcTime: 5 * 60 * 1000, 
        staleTime: Infinity, 
        refetchOnWindowFocus: false, 
        refetchInterval: false, 
        retry: 3,
        enabled: !!userId 
    });
};
