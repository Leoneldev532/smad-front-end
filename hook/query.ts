import { ApiService } from "@/lib/api-service";
import { MapInput } from "@/lib/schemas";
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
import { toast } from "sonner";
import { handleError } from "@/lib/error-handler";

export const getAllProjectOneUserFunc = async (
  idUser: string | null | undefined,
): Promise<Project[]> => {
  if (!idUser) throw new Error("Invalid user ID");
  return ApiService.getProjects(idUser);
};

export const getAllMapOfOneProject = async (
  idUser: string | null | undefined,
  projectId: string,
): Promise<Map[]> => {
  if (!idUser || !projectId) throw new Error("Invalid user ID or projectID");
  return ApiService.getMaps(idUser, projectId);
};

export const deleteMapOfOneProject = async (
  idUser: string | null | undefined,
  project_Id: string,
  map_Id: string,
): Promise<Map> => {
  if (!idUser || !project_Id || !map_Id)
    throw new Error("Invalid user ID or projectID or mapId");
  return ApiService.deleteMap(idUser, project_Id, map_Id);
};

export const getAllEmailsOneProjectFunc = async (
  idUser: string | null | undefined,
  idProject: string,
): Promise<Email[]> => {
  if (!idUser || !idProject) throw new Error("Invalid user ID or project ID");
  return ApiService.getEmails(idUser, idProject);
};

export const getAllUserInfo = async (
  idUser: string | null | undefined,
): Promise<User> => {
  if (!idUser) throw new Error("Invalid user ID");
  return ApiService.getUserInfo(idUser);
};

export const getAllUserTrial_planFunc = async (
  idUser: string | null | undefined,
): Promise<{ trial_is_finished: boolean }> => {
  if (!idUser) throw new Error("Invalid user ID");
  return ApiService.getUserTrialPlan(idUser);
};

export const deleteProject = async (
  idUser: string | null | undefined,
  idProject: string,
): Promise<Email[]> => {
  if (!idUser || !idProject) throw new Error("Invalid user ID or project ID");
  return ApiService.deleteProject(idUser, idProject);
};

export const deleteEmail = async (
  idUser: string | null | undefined,
  idProject: string,
  idEmail: string,
): Promise<Email[]> => {
  if (!idUser || !idProject || !idEmail)
    throw new Error("Invalid user ID, project ID, or email ID");
  return ApiService.deleteEmail(idUser, idProject, idEmail);
};

export const updateEmail = async (
  idUser: string | null | undefined,
  idProject: string,
  idEmail: string,
  newValue: string,
): Promise<Email[]> => {
  if (!idUser || !idProject || !idEmail || !newValue)
    throw new Error("Invalid parameters");
  return ApiService.updateEmail(idUser, idProject, idEmail, newValue);
};

export const createProject = async (
  idUser: string | null | undefined,
  nameProject: string,
  isCheckedFieldNameUser: boolean,
) => {
  if (!idUser || !nameProject)
    throw new Error("Invalid user ID or project name");
  return ApiService.createProject(idUser, nameProject, isCheckedFieldNameUser);
};

export const createMap = async (
  idUser: string | null | undefined,
  project_Id: string,
  link: string,
) => {
  if (!idUser || !project_Id || !link)
    throw new Error("Invalid user ID or project id or link");
  return ApiService.createMap(idUser, project_Id, link);
};

export const updateProject = async (
  idUser: string | null | undefined,
  idProject: string,
  newNameProject: string,
) => {
  if (!idUser || !idProject || !newNameProject)
    throw new Error("Invalid parameters");
  return ApiService.updateProject(idUser, idProject, newNameProject);
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
  return ApiService.addEmail(idUser, idProject, nameEmail, withName ? name : null);
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
    enabled: !!userId && !!projectId,
    refetchInterval: false,
    retry: 3,
  });
};

export const getprivateKeyUser = async (
  idUser: string | null | undefined,
): Promise<{ privateKey: string; expiresAt: string }> => {
  if (!idUser) throw new Error("Invalid user ID");
  return ApiService.getPrivateKey(idUser);
};






export const getUserProjectsWithEmailsGroupedByDate = async (
  idUser: string | null | undefined,
): Promise<
  { projectId: string; emailCountsByDate: Record<string, number> }[]
> => {
  if (!idUser) throw new Error("Invalid user ID");
  return ApiService.getAnalytics(idUser);
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
      return ApiService.getDevelopers();
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
     },
    onSettled: () => {
      // console.log("Mutation completed");
    },
  });
};

export const useAddMapMutation = ({
  idUser,
  projectId,
  onSuccessCallBack,
}: Omit<AddMapParams, "link">) => {
  const queryClient = useQueryClient();
  return useMutation<MapResponse, Error, MapInput>({
    mutationFn: async (data: MapInput) => {
      return ApiService.createMap(idUser as string, projectId, data.link);
    },
    onSuccess: (data: MapResponse) => {
      onSuccessCallBack();
      queryClient.invalidateQueries({
        queryKey: ["maps", data.projectId],
      });
      toast.success("Map added successfully");
    },
    onError: (error: Error) => {
      // toast.error(`Error adding map: ${error.message}`);
    },
    onSettled: () => {
      // console.log("Map addition mutation completed");
    },
  });
};

export const useUpdateMapMutation = ({
  idUser,
  projectId,
  onSuccessCallBack,
  mapId,
}: Omit<UpdateMapParams, "link">) => {
  const queryClient = useQueryClient();
  return useMutation<MapResponse, Error, MapInput>({
    mutationFn: async (data: MapInput) => {
      return ApiService.updateMap(idUser as string, projectId, mapId, data.link);
    },
    onSuccess: (data: MapResponse) => {
      onSuccessCallBack();
      queryClient.invalidateQueries({
        queryKey: ["maps", data.projectId],
      });
      toast.success("Map updated successfully");
    },
    onError: (error: Error) => {
      // toast.error(`Error updating map: ${error.message}`);
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
  try {
    return ApiService.saveEmailExternal(email, project_id, private_key, name);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const saveEmailToExternalAPI2 = async (
  email: string,
  project_id: string,
  private_key: string,
  name?: string,
) => {
  try {
    return ApiService.saveEmailExternalAlt(email, project_id, private_key, name);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
