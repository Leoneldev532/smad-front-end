import { clsx, type ClassValue } from "clsx";
import { createHash } from "crypto";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type UserSessionType = {
  user: User | null;
  status: any;
};

export const useGetUserInfo = () => {
  const { data: session, status } = useSession();

  if (!session) {
    return { user: null, status } as UserSessionType;
  }
  return { user: session.user as UserSession, status };
};

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d@$!%*/+?&]{8,}$/;

export const generateprivateKey = (email: string): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const emailHash = createHash("sha256")
    .update(email)
    .digest("hex")
    .slice(0, 10);

  const privateKey = `smad${year}${month}${day}${hours}${minutes}${seconds}${emailHash}`;

  return privateKey.slice(0, 27);
};

import dayjs, { Dayjs } from "dayjs";
import { Email, User, UserSession } from "./type";
import { componentStructure } from "@/app/template/mainGenerateCodeFunc";
import {
  logicEmailSubmition,
  logicImportString,
  TabTemplateCode,
} from "@/app/template/listTemplateCode";

export const isDatePassed = (inputDate: Dayjs) => {
  const dateToCheck = dayjs(inputDate);
  const currentDate = dayjs();

  return dateToCheck?.isBefore(currentDate);
};

export const generateFinalDate = (period: "14days" | "1month" | "1year") => {
  const currentDate = dayjs();

  switch (period) {
    case "14days":
      return currentDate.add(14, "day");
    case "1month":
      return currentDate.add(1, "month");
    case "1year":
      return currentDate.add(1, "year");
    default:
      throw new Error(
        "Paramètre non valide. Utilisez '14days', '1month' ou '1year'.",
      );
  }
};

export const setGoodPlan = (productId: number | undefined) => {
  if (productId === 421959) return "1year";
  if (productId === 421960) return "1year";
  if (productId === 421961) return "1year";
  return "1year";
};

export const planName = {
  "14days": "PER YEAR",
  "1month": "PER YEAR",
  "1year": "PER YEAR",
};

export const checkCurrentPlan = (productName: string, planName: string) => {
  if (productName.toLowerCase() === planName.toLowerCase()) {

    return true;
  } else {
    return false;
  }
};

export const finalCode = (ui: string) => {
  return componentStructure(
    "formRegisterEmail",
    logicImportString,
    logicEmailSubmition,
    ui,
  );
};

export const hashData = async (data: string) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
  } catch (error) {
    console.error("Erreur lors du hachage :", error);
    throw error;
  }
};

export const verifyData = async (inputData: string, hashedData: string) => {
  try {
    const match = await bcrypt.compare(inputData, hashedData);
    return match;
  } catch (error) {
    console.error("Erreur lors de la vérification :", error);
    throw error;
  }
};

export const convertToCSV = (objArray: Email[]) => {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "emails\r\n";

  for (let i = 0; i < array.length; i++) {
    const email = array[i].email;
    str += email + "\r\n";
  }

  return str;
};

const GetCorrectFormOfTabCsvData = (data: Email[]) => {
  const newTab = data.map((item: Email, index: number) => {
    if (typeof item === "object" && item !== null && "email" in item) {
      return {
        email: item.email,
      };
    } else {
      console.warn(`Element invalide trouvé à l'index ${index}:`, item);
      return {
        email: "N/A",
      };
    }
  });
  return newTab as Email[];
};

export const downloadCSV = (data: Email[], fileName: string) => {
  const csvData = new Blob([convertToCSV(GetCorrectFormOfTabCsvData(data))], {
    type: "text/csv",
  });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement("a");
  link.href = csvURL;
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleGoogleLogin = () => {
  signIn("google", { callbackUrl: "/dashboard" });
};

export const handleGithubLogin = () => {
  signIn("github", { callbackUrl: "/dashboard" });
};
