import axiosInstance from "./api-intercept";
import axios from "axios";
import { API_URL } from "./constants";
import {
  Developer,
  Email,
  Map,
  MapResponse,
  Project,
  User,
} from "./type";

/**
 * Service to handle all API requests. 
 * This layer abstracts the HTTP client (axios, fetch, etc.) from the hooks and business logic.
 */
export const ApiService = {
  // --- USER ---
  getUserInfo: async (idUser: string): Promise<User> => {
    const response = await axiosInstance.get(`./api/users/${idUser}`);
    return response.data;
  },

  getUserTrialPlan: async (idUser: string): Promise<{ trial_is_finished: boolean }> => {
    const response = await axiosInstance.get(`./api/users/${idUser}/trialplan`);
    return response.data;
  },

  getPrivateKey: async (idUser: string): Promise<{ privateKey: string; expiresAt: string }> => {
    const response = await axiosInstance.get(`./api/users/${idUser}/privateKey`);
    return response.data;
  },

  // --- PROJECTS ---
  getProjects: async (idUser: string): Promise<Project[]> => {
    const response = await axiosInstance.get(`./api/users/${idUser}/projects`);
    return response.data;
  },

  createProject: async (idUser: string, name: string, withName: boolean): Promise<Project> => {
    const response = await axiosInstance.post(`./api/users/${idUser}/projects`, {
      name,
      withName,
    });
    return response.data;
  },

  updateProject: async (idUser: string, idProject: string, name: string): Promise<Project> => {
    const response = await axiosInstance.put(`./api/users/${idUser}/projects/${idProject}/update`, {
      name,
    });
    return response.data;
  },

  deleteProject: async (idUser: string, idProject: string): Promise<Email[]> => {
    const response = await axiosInstance.delete(`./api/users/${idUser}/projects/${idProject}/delete`);
    return response.data;
  },

  // --- EMAILS ---
  getEmails: async (idUser: string, idProject: string): Promise<Email[]> => {
    const response = await axiosInstance.get(`./api/users/${idUser}/projects/${idProject}/emails`);
    return response.data;
  },

  addEmail: async (idUser: string, idProject: string, email: string, name: string | null): Promise<Email> => {
    const response = await axiosInstance.post(`./api/users/${idUser}/projects/${idProject}/emails`, {
      email,
      name,
    });
    return response.data;
  },

  updateEmail: async (idUser: string, idProject: string, idEmail: string, newEmail: string): Promise<Email[]> => {
    const response = await axiosInstance.put(`./api/users/${idUser}/projects/${idProject}/emails/${idEmail}/update`, {
      newEmail,
    });
    return response.data;
  },

  deleteEmail: async (idUser: string, idProject: string, idEmail: string): Promise<Email[]> => {
    const response = await axiosInstance.delete(`./api/users/${idUser}/projects/${idProject}/emails/${idEmail}/delete`);
    return response.data;
  },

  // --- MAPS ---
  getMaps: async (idUser: string, idProject: string): Promise<Map[]> => {
    const response = await axiosInstance.get(`./api/users/${idUser}/projects/${idProject}/map`);
    return response.data;
  },

  createMap: async (idUser: string, projectId: string, link: string): Promise<MapResponse> => {
    const response = await axiosInstance.post(`./api/users/${idUser}/projects/${projectId}/map`, {
      link,
    });
    return response.data;
  },

  updateMap: async (idUser: string, projectId: string, mapId: string, link: string): Promise<MapResponse> => {
    const response = await axiosInstance.put(`./api/users/${idUser}/projects/${projectId}/map/${mapId}`, {
      link,
    });
    return response.data;
  },

  deleteMap: async (idUser: string, project_Id: string, map_Id: string): Promise<Map> => {
    const response = await axiosInstance.delete(`./api/users/${idUser}/projects/${project_Id}/map/${map_Id}`);
    return response.data;
  },

  // --- ANALYTICS ---
  getAnalytics: async (idUser: string): Promise<{ projectId: string; emailCountsByDate: Record<string, number> }[]> => {
    const response = await axiosInstance.get(`./api/users/${idUser}/analytics`);
    return response.data;
  },

  // --- DEVELOPERS ---
  getDevelopers: async (): Promise<{ developers: Developer[] }> => {
    const response = await axiosInstance.get("/api/developerForm", {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  },

  // --- EXTERNAL ---
  saveEmailExternal: async (email: string, project_id: string, private_key: string, name?: string): Promise<any> => {
    const response = await axios.post(API_URL, {
      email,
      project_id,
      private_key,
      name,
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  },

  saveEmailExternalAlt: async (email: string, project_id: string, private_key: string, name?: string): Promise<any> => {
    const response = await axios.post("https://smad.api.leonelyimga.com/api/v1/email/save", {
      email,
      project_id,
      private_key,
      name,
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  }
};
