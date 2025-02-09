import { clsx, type ClassValue } from "clsx"
import { createHash } from "crypto"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type  UserSessionType = {
  user: User | null;
  status: any;
}


export const useGetUserInfo = () => {
  const { data: session, status } = useSession();


  if (!session) {
    return { user: null, status } as UserSessionType;
  }
  return { user: session.user as UserSession, status };
};


export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d@$!%*/+?&]{8,}$/


export const  generateprivateKey = (email: string): string => {
  // Obtenir la date et l'heure actuelles
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Derniers 2 chiffres de l'année
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Mois (01-12)
  const day = now.getDate().toString().padStart(2, '0'); // Jour (01-31)
  const hours = now.getHours().toString().padStart(2, '0'); // Heures (00-23)
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Minutes (00-59)
  const seconds = now.getSeconds().toString().padStart(2, '0'); // Secondes (00-59)

  // Hasher l'email
  const emailHash = createHash('sha256').update(email).digest('hex').slice(0, 10); // Prendre les 10 premiers caractères du hash

  // Concaténer les éléments pour former la privatec_key
  const privateKey = `smad${year}${month}${day}${hours}${minutes}${seconds}${emailHash}`;

  // Tronquer ou ajuster la longueur de la privatec_key pour qu'elle ait exactement 27 caractères
  return privateKey.slice(0, 27);
};






import dayjs, { Dayjs } from 'dayjs';
import { User, UserSession } from "./type"
import { componentStructure } from "@/app/template/mainGenerateCodeFunc"
import { logicEmailSubmition, logicImportString, TabTemplateCode } from "@/app/template/listTemplateCode"

export const isDatePassed = (inputDate:Dayjs) => {
    // Convertir la date d'entrée en objet Day.js
    const dateToCheck = dayjs(inputDate);
    // Obtenir la date actuelle
    const currentDate = dayjs();
    
    // Vérifier si la date d'entrée est antérieure à la date actuelle
    return dateToCheck?.isBefore(currentDate);
}


export const generateFinalDate = (period:"14days"|"1month"|"1year") => {
  const currentDate = dayjs();

  switch (period) {
      case '14days':
          return currentDate.add(14, 'day');
      case '1month':
          return currentDate.add(1, 'month');
      case '1year':
          return currentDate.add(1, 'year');
      default:
          throw new Error("Paramètre non valide. Utilisez '14days', '1month' ou '1year'.");
  }
}

// free config
export const setGoodPlan = (productId:number | undefined)=>{
  if( productId === 421959) return "1year"
  if( productId === 421960) return "1year"
  if( productId === 421961) return "1year"
  return "1year"
}

export const planName = {
  "14days":"PER YEAR",
  "1month":"PER YEAR",
  "1year":"PER YEAR"
}


//old config subscription

// export const setGoodPlan = (productId:number | undefined)=>{
//   if( productId === 421959) return "14days"
//   if( productId === 421960) return "1month"
//   if( productId === 421961) return "1year"
// }

// export const planName = {
//   "14days":"FREE TRIAL",
//   "1month":"PER MONTH",
//   "1year":"PER YEAR"
// }




export const checkCurrentPlan= (productName:string,planName:string)=>{
  if(productName.toLowerCase() === planName.toLowerCase() ){
    console.log("object","0000",productName.toLowerCase() === planName.toLowerCase(),planName,productName)
    return true
  }else{
    return false
  }
}



export const finalCode  = (ui:string) =>{
  return componentStructure("formRegisterEmail", logicImportString, logicEmailSubmition, ui)
  
} 

