import { StaticImageData } from "next/image";


export  type Email = {
    id: string;
    email: string;
    projectId: string;
    project: Project;
    createdAt: Date;
    updatedAt: Date;
  };
  

export  type Project = {
    id: string;
    name: string;
    userId?: string;
    user?: User;
    emails?: Email[];
    createdAt: Date;
    updatedAt: Date;
  };
  

export  type User = {
    id: string;
    name: string;
    trial_is_finished:boolean;
    privatec_key?: string;
    projects?: Project[];
    subscriptions:[],
    privateKey:{
      expiresAt:string,
      key:string,
    },
    createdAt: Date;
    updatedAt: Date;
  };
  


  export type UserSession =  {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }


  
  export type selectOptionType = {
    id?:number,
    image:StaticImageData;
    isSelected?:boolean,
    onClick?:()=>void
  }

  export type  projectItemMobileType = {
    onClick?:()=>void,
    isActive?:boolean,
    isSelected?:boolean,
    name:string
  }