import axiosInstance from "@/lib/api.intercept";
import {
  AddMapParams,
  DeleteMapParams,
  Developer,
  Email,
  Map,
  MapResponse,
  Project,
  UpdateMapParams,
  User,
} from "@/lib/type";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "@/lib/constants";

export const getAllProjectOneUserFunc = async (
  idUser: string | null | undefined,
): Promise<Project[]> => {
  if (!idUser) throw new Error("Invalid user ID");
  const response = await axiosInstance.get(`./api/users/${idUser}/projects`);
  return response.data;
};

export const getAllMapOfOneProject = async (
  idUser: string | null | undefined,
  projectId: string,
): Promise<Map[]> => {
  if (!idUser || !projectId) throw new Error("Invalid user ID or projectID");
  const response = await axiosInstance.get(
    `./api/users/${idUser}/projects/${projectId}/map`,
  );
  return response.data;
};

export const deleteMapOfOneProject = async (
  idUser: string | null | undefined,
  project_Id: string,
  map_Id: string,
): Promise<Map> => {
  if (!idUser || !project_Id || !map_Id)
    throw new Error("Invalid user ID or projectID or mapId");
  const response = await axios.delete(
    `./api/users/${idUser}/projects/${project_Id}/map/${map_Id}`,
  );
  return response.data;
};

export const getAllEmailsOneProjectFunc = async (
  idUser: string | null | undefined,
  idProject: string,
): Promise<Email[]> => {
  if (!idUser || !idProject) throw new Error("Invalid user ID or project ID");
  const response = await axiosInstance.get(
    `./api/users/${idUser}/projects/${idProject}/emails`,
  );
  return response.data;
};

export const getAllUserInfo = async (
  idUser: string | null | undefined,
): Promise<User> => {
  if (!idUser) throw new Error("Invalid user ID");
  const response = await axiosInstance.get(`./api/users/${idUser}`);
  return response.data;
};

export const getAllUserTrial_planFunc = async (
  idUser: string | null | undefined,
): Promise<{ trial_is_finished: boolean }> => {
  if (!idUser) throw new Error("Invalid user ID");
  const response = await axiosInstance.get(`./api/users/${idUser}/trialplan`);
  return response.data;
};

export const deleteProject = async (
  idUser: string | null | undefined,
  idProject: string,
): Promise<Email[]> => {
  if (!idUser || !idProject) throw new Error("Invalid user ID or project ID");
  const response = await axiosInstance.delete(
    `./api/users/${idUser}/projects/${idProject}/delete`,
  );
  return response.data;
};

export const deleteEmail = async (
  idUser: string | null | undefined,
  idProject: string,
  idEmail: string,
): Promise<Email[]> => {
  if (!idUser || !idProject || !idEmail)
    throw new Error("Invalid user ID, project ID, or email ID");
  const response = await axiosInstance.delete(
    `./api/users/${idUser}/projects/${idProject}/emails/${idEmail}/delete`,
  );
  return response.data;
};

export const updateEmail = async (
  idUser: string | null | undefined,
  idProject: string,
  idEmail: string,
  newValue: string,
): Promise<Email[]> => {
  if (!idUser || !idProject || !idEmail || !newValue)
    throw new Error("Invalid parameters");
  const response = await axiosInstance.put(
    `./api/users/${idUser}/projects/${idProject}/emails/${idEmail}/update`,
    {
      newEmail: newValue,
    },
  );
  return response.data;
};

export const createProject = async (
  idUser: string | null | undefined,
  nameProject: string,
  isCheckedFieldNameUser: boolean,
) => {
  if (!idUser || !nameProject)
    throw new Error("Invalid user ID or project name");
  const response = await axiosInstance.post(`./api/users/${idUser}/projects`, {
    name: nameProject,
    withName: isCheckedFieldNameUser,
  });
  return response.data;
};

export const createMap = async (
  idUser: string | null | undefined,
  project_Id: string,
  link: string,
) => {
  if (!idUser || !project_Id || !link)
    throw new Error("Invalid user ID or project id or link");
  const response = await axiosInstance.post(
    `./api/users/${idUser}/projects/${project_Id}/map`,
    {
      link,
    },
  );
  return response.data;
};

export const updateProject = async (
  idUser: string | null | undefined,
  idProject: string,
  newNameProject: string,
) => {
  if (!idUser || !idProject || !newNameProject)
    throw new Error("Invalid parameters");
  const response = await axiosInstance.put(
    `./api/users/${idUser}/projects/${idProject}/update`,
    {
      name: newNameProject,
    },
  );
  return response.data;
};

export const addEmailAddress = async (
  idUser: string | null | undefined,
  idProject: string,
  nameEmail: string,
  withName: boolean,
  name: string,
) => {
  if (!idUser || !idProject || !nameEmail)
    throw new Error("Invalid parameters");
  const response = await axiosInstance.post(
    `./api/users/${idUser}/projects/${idProject}/emails`,
    {
      email: nameEmail,
      name: withName ? name : null,
    },
  );
  return response.data;
};

export const useGetAllEmailsOneProject = (
  userId: string | null | undefined,
  idProject: string,
) => {
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

export const useGetAllProjectsOfOneUser = (
  userId: string | null | undefined,
) => {
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

export const useGetOneMapOfOneProjectUser = (
  userId: string | null | undefined,
  projectId: string,
) => {
  return useQuery({
    queryKey: ["getMapOfOneProject", userId, projectId],
    queryFn: () => getAllMapOfOneProject(userId, projectId),
    gcTime: 5 * 60 * 1000,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!userId,
    refetchInterval: false,
    retry: 3,
  });
};

export const getprivateKeyUser = async (
  idUser: string | null | undefined,
): Promise<{ privateKey: string; expiresAt: string }> => {
  if (!idUser) throw new Error("Invalid user ID");
  const response = await axiosInstance.get(`./api/users/${idUser}/privateKey`);
  return response.data;
};






export const getUserProjectsWithEmailsGroupedByDate = async (
  idUser: string | null | undefined,
): Promise<
  { projectId: string; emailCountsByDate: Record<string, number> }[]
> => {
  if (!idUser) throw new Error("Invalid user ID");
  const response = await axiosInstance.get(`./api/users/${idUser}/analytics`);
  return response.data;
};



export const useGetprivateKeyOfOneUser = (
  userId: string | null | undefined,
) => {
  return useQuery({
    queryKey: ["privateKeyOfOneUser", userId],
    queryFn: () => getprivateKeyUser(userId),
    enabled: !!userId,
    gcTime: Infinity,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useGetDevelopers = () => {
  return useQuery<{ developers: Developer[] }>({
    queryKey: ["developers"],
    queryFn: async () => {
      const response = await axios.get("/api/developerForm", {
        headers: {
          "Cache-Control": "no-cache",
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
    enabled: !!userId,
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
    enabled: !!userId,
  });
};





export const useGetUserProjectsWithEmailsGroupedByDate = (
  userId: string | null | undefined,
) => {
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

export const useDeleteMapMutation = ({
  idUser,
  projectId,
  mapId,
}: DeleteMapParams): UseMutationResult<
  Map,
  Error,
  void, // Plus besoin de passer des paramètres à mutate
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteMapOfOneProject(idUser, projectId, mapId), // Les paramètres sont déjà connus
    onSuccess: (data: Map) => {
      queryClient.invalidateQueries({
        queryKey: ["maps", data.projectId],
      });
      toast.success("Map deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Error during deletion: ${error.message}`);
    },
    onSettled: () => {
      // console.log("Mutation completed");
    },
  });
};

export const useAddMapMutation = ({
  idUser,
  projectId,
  link,
  onSuccessCallBack,
}: AddMapParams) => {
  const queryClient = useQueryClient();
  return useMutation<MapResponse, Error, void>({
    mutationFn: async () => {
      const response = await axios.post(
        `./api/users/${idUser}/projects/${projectId}/map`,
        { link },
      );
      return response.data;
    },
    onSuccess: (data: MapResponse) => {
      onSuccessCallBack();
      queryClient.invalidateQueries({
        queryKey: ["maps", data.projectId],
      });
      toast.success("Map added successfully");
    },
    onError: (error: Error) => {
      toast.error(`Error adding map: ${error.message}`);
    },
    onSettled: () => {
      // console.log("Map addition mutation completed");
    },
  });
};

export const useUpdateMapMutation = ({
  idUser,
  projectId,
  link,
  onSuccessCallBack,
  mapId,
}: UpdateMapParams) => {
  const queryClient = useQueryClient();
  return useMutation<MapResponse, Error, void>({
    mutationFn: async () => {
      const response = await axios.put(
        `./api/users/${idUser}/projects/${projectId}/map/${mapId}`,
        { link },
      );
      return response.data;
    },
    onSuccess: (data: MapResponse) => {
      onSuccessCallBack();
      queryClient.invalidateQueries({
        queryKey: ["maps", data.projectId],
      });
      toast.success("Map updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Error updating map: ${error.message}`);
    },
    onSettled: () => {
      // console.log("Map update mutation completed");
    },
  });
};

export const saveEmailToExternalAPI = async (
  email: string,
  project_id: string,
  private_key: string,
  name?: string,
) => {
  const response = await axios.post(
    API_URL,
    {
      email,
      project_id,
      private_key,
      name,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const saveEmailToExternalAPI2 = async (
  email: string,
  project_id: string,
  private_key: string,
  name?: string,
) => {
  const response = await axios.post(
    "https://smad.api.leonelyimga.com/api/v1/email/save",
    {
      email,
      project_id,
      private_key,
      name,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
