import { StaticImageData } from "next/image";
import { ReactNode, FormEvent } from "react";

export type Email = {
  id: string;
  email: string;
  name: string;
  country: string;
  referrer: string;
  projectId: string;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
};

export type Map = {
  id: string;
  link: string;
  projectId: string;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
};

export type DeleteMapParams = {
  idUser: string | null | undefined;
  projectId: string;
  mapId: string;
};

export type Project = {
  id: string;
  name: string;
  userId?: string;
  user?: User;
  withName: boolean;
  emails?: Email[];
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  trial_is_finished: boolean;
  privatec_key?: string;
  projects?: Project[];
  subscriptions: [];
  privateKey: {
    expiresAt: string;
    key: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type UserSession = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export interface Developer {
  id: string;
  developerName: string;
  portfolioLink: string;
  image: string;
  templatename: string;
  languagesAndFrameworks: string[];
  pageLink: string;
  isActive: boolean;
  githubRepo: string;
  createdAt: Date;
  updatedAt: Date;
}

export type templateCardType = {
  id?: number;
  name?: string;
  form?: ReactNode;
};

export type projectItemMobileType = {
  onClick?: () => void;
  isActive?: boolean;
  isSelected?: boolean;
  name: string;
};

export type AddMapParams = {
  idUser: string;
  projectId: string;
  link: string;
  onSuccessCallBack: () => void;
};

export type UpdateMapParams = {
  idUser: string;
  projectId: string;
  link: string;
  onSuccessCallBack: () => void;
  mapId: string;
};

export type MapResponse = {
  id: string;
  link: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
};

export type registerDataInput = {
  password: string;
  email: string;
};

export type LinkSideBarPropsType = {
  icon: ReactNode;
  title: string;
  link?: string;
  type?: "link" | "button";
  onClick?: () => void;
};

export type LoaderPropsType = {
  height?: string;
  width?: string;
};

export interface AppError extends Error {
  statusCode?: number;
}

export type ValidationRules = {
  [key: string]: (value: any) => string | null;
};

export type FormData = {
  [key: string]: any;
};

export type EmailSubmissionState = {
  handleSubmit: (email: string) => Promise<void>;
  error: string;
  loading: boolean;
  success: boolean;
};

export type FormValidationState = {
  data: FormData;
  setData: (data: FormData) => void;
  errors: Record<string, string>;
  handleSubmit: () => Promise<void>;
  loading: boolean;
  success: boolean;
};

export interface TimeProps {
  date: Date;
}

export interface MessageProps {
  text: string;
  variant?: "success" | "error" | "info" | "warning";
}

export type Props = {
  children?: React.ReactNode;
};

export interface ButtonValidationProps {
  title: string;
  typeButton?: "button" | "submit" | "reset";
  type?: "negative" | "default" | "positive";
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface CSPostHogProviderProps {
  children: ReactNode;
}

export interface UserInfoProviderProps {
  children: ReactNode;
}

export interface EmailAdditionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectIswithName: boolean;
  emailAddress: string;
  setEmailAddress: (email: string) => void;
  name: string;
  setName: (name: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export interface EmptyStateProps {
  onCreateProject: () => void;
}

export interface ProjectCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  setProjectName: (name: string) => void;
  isCheckedFieldNameUser: boolean;
  setIsCheckedFieldNameUser: (checked: boolean) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export interface CodeDisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code: string;
  onCopy: () => void;
  isCodeCopy: boolean;
  onCustomize?: () => void;
  showCustomizeButton?: boolean;
}

export interface EmailTabContentProps {
  allProjectsOneUser: Project[] | undefined;
  allProjectsOneUserLoading: boolean;
  allEmailsOneProjectLoading: boolean;
  filterTabEmails: Email[] | undefined;
  filterTabProjects: Project[] | undefined;
  activeTabIndex: number;
  nameProjectActive: string;
  idProjectActive: string;
  privateKey: string | undefined;
  projectIswithName: boolean;
  currentIdProject: string;
  withMap: boolean;
  mapId: string;
  linkMap: string;
  onAddEmail: () => void;
  onRefreshEmails: () => void;
  onOpenExportModal: () => void;
  onCopyCode: () => void;
  isCodeCopy: boolean;
  onTabClick: (
    index: number,
    idProject: string,
    nameProject: string,
    withName: boolean,
  ) => void;
  onRefreshProjects: () => void;
}

export interface MapTabContentProps {
  getMap: Map[] | undefined;
  isLoadingGetOneMap: boolean;
  currentIdProject: string;
  onAddMap: () => void;
  onRefreshMaps: () => void;
}

export interface MapCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mapLink: string;
  setMapLink: (link: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export interface ProjectSidebarProps {
  allProjectsOneUser: Project[] | undefined;
  allProjectsOneUserLoading: boolean;
  privateKey: string | undefined;
  activeTabIndex: number;
  withMap: boolean;
  mapId: string;
  linkMap: string;
  onCreateProject: () => void;
  onRefreshProjects: () => void;
  onTabClick: (
    index: number,
    idProject: string,
    nameProject: string,
    withName: boolean,
  ) => void;
}

export interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  emails: Email[] | undefined;
}

export interface EmailsPerProjectChartProps {
  projectsWithEmails: { projectId: string; emails: Email[] }[];
}
