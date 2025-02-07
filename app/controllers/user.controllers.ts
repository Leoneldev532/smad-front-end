import { prisma } from "@/lib/db";

// Contrôleur pour récupérer tous les projets d'un utilisateur
export const getUserProjects = async (id_user: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id:id_user },
    });

    if (!user) {
      throw new Error('user not exist');
    }

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
    });

    return projects;
  } catch (error) {
    throw new Error('Failed to retrieve user projects');
  } finally {
    await prisma.$disconnect();
  }
};

// Contrôleur pour récupérer tous les emails d'un projet
export const getProjectEmails = async (project_id: string) => {
  try {
    const emails = await prisma.email.findMany({
      where: { projectId: project_id },
    });

    return emails;
  } catch (error) {
    throw new Error('Failed to retrieve project emails');
  } finally {
    await prisma.$disconnect();
  }
};
