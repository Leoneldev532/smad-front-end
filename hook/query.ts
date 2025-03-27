import { getProducts } from "@/app/lemon";
import { GetAudience } from "@/components/GetAudience";
import axiosInstance from "@/lib/api.intercept";
import { Developer, Email, Project, User } from "@/lib/type";
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
    const response = await axiosInstance.put(`./api/users/${idUser}/projects/${idProject}/emails/${idEmail}/update`, {
        newEmail: newValue
    });
    return response.data;
};

export const createProject = async (idUser: string | null | undefined, nameProject: string,isCheckedFieldNameUser:boolean) => {
    if (!idUser || !nameProject ) throw new Error("Invalid user ID or project name");
    const response = await axiosInstance.post(`./api/users/${idUser}/projects`, {
        name: nameProject,
        withName:isCheckedFieldNameUser
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

export const addEmailAddress = async (idUser: string | null | undefined, idProject: string, nameEmail: string,withName:boolean,name:string) => {
    if (!idUser || !idProject || !nameEmail) throw new Error("Invalid parameters");
    const response = await axiosInstance.post(`./api/users/${idUser}/projects/${idProject}/emails`, {
        email: nameEmail,
        name:withName ? name : null
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


export const getResendApiKey = async (idUser: string | null | undefined): Promise<{ resendApiKey: string}> => {
    if (!idUser) throw new Error("Invalid user ID");
    const response = await axiosInstance.get(`./api/users/${idUser}/resend`);
    return response.data;
};

export const setSubscriptionTrial = async (idUser: string | null | undefined) => {
    // if (!idUser) throw new Error("Invalid user ID");
    const response = await axiosInstance.put(`./api/users/${idUser}/trialplan/update`, {});
    return response.data;
};



export const setResendApiKey = async (idUser: string | null | undefined,resendApiKey:string| null | undefined) => {
    const response = await axiosInstance.post(`./api/users/${idUser}/resend/`, {
        resendApiKey
    });
    return response.data;
};


export const getUserProjectsWithEmailsGroupedByDate = async (idUser: string | null | undefined): Promise<
  { projectId: string; emailCountsByDate: Record<string, number> }[]
> => {
  if (!idUser) throw new Error("Invalid user ID");
  const response = await axiosInstance.get(`./api/users/${idUser}/analytics`);
  return response.data;
};


export const GetAllAudienceOfUser = async (resendApiKey: string) => {
    try {
        const response = await axios.get(
            'https://api.resend.com/audiences',
            {
                params:null,
                headers: {
                    Authorization: `Bearer ${resendApiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching audiences:', error);
        throw error;
    }
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



export const useGetDevelopers = () => {
  return useQuery<{developers:Developer[]}>({
    queryKey: ["developers"],
    queryFn: async () => {
      const response = await axios.get('/api/developerForm', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      return response.data;
    },
    gcTime: 5 * 60 * 1000,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
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


export const useGetResendUser = (userId: string | null | undefined) => {
    return useQuery({
        queryKey: ["resendApiKey", userId],
        queryFn: () => getResendApiKey(userId),
        gcTime: 5 * 60 * 1000,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 3,
        enabled: !!userId
    });
};




export const useGetResendUserAudience = (resendApiKey: string | null | undefined) => {
    return useQuery({
        queryKey: ["resendApiKeyAudience"],
        queryFn: () => GetAllAudienceOfUser(resendApiKey || " "),
        gcTime: 5 * 60 * 1000,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 3,
        enabled: !!resendApiKey
    });
};





export const useGetAudience = (audienceId:string) => {
    return useQuery({
        queryKey: ["audienceId", audienceId],
        queryFn: () => GetAudience(audienceId),
        enabled: !!audienceId,
    });
};


export const useGetUserProjectsWithEmailsGroupedByDate = (userId: string | null | undefined) => {
  return useQuery({
    queryKey: ["userProjectsWithEmailsGroupedByDate", userId],
    queryFn: () => getUserProjectsWithEmailsGroupedByDate(userId),
    enabled: !!userId,
    gcTime: 5 * 60 * 1000,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 3,
  });
};
