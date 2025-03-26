import { StaticImageData } from "next/image";
import { ReactNode } from "react";


export  type Email = {
    id: string;
    email: string;
    name: string;
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
    withName:boolean;
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


 export interface Developer {
    id: string;
    developerName: string;
    portfolioLink: string;
    image: string;
    templatename:string;
    languagesAndFrameworks: string[];
    pageLink: string;
    isActive: boolean;
    githubRepo: string;
    createdAt: Date;
    updatedAt: Date;
  }


  export type templateCardType = {
    id?:number,
    name?:string,
    form?:ReactNode
  }

  export type  projectItemMobileType = {
    onClick?:()=>void,
    isActive?:boolean,
    isSelected?:boolean,
    name:string
  }
