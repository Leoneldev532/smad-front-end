import { z } from "zod";

/**
 * Centeralized validation schemas using Zod.
 * These schemas provide runtime validation and TypeScript type inference.
 */

// --- USER & AUTH ---
export const SignUpSchema = z.object({
  email: z.string().min(1, "L'adresse email est requise").email("L'adresse email doit être valide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

// --- PROJECTS ---
export const ProjectSchema = z.object({
  name: z.string().min(1, "Le nom du projet est requis").max(50, "Le nom est trop long"),
  withName: z.boolean(),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

// --- EMAILS ---
export const EmailSchema = z.object({
  email: z.string().min(1, "L'adresse email est requise").email("L'adresse email doit être valide"),
  name: z.string().optional().nullable(),
});

export type EmailInput = z.infer<typeof EmailSchema>;

// --- MAPS ---
export const MapSchema = z.object({
  link: z.string().min(1, "Le lien est requis").url("Le lien doit être une URL valide"),
});

export type MapInput = z.infer<typeof MapSchema>;
