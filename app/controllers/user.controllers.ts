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


export const getUserProjectsWithEmailsGroupedByDate = async (id_user: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id_user },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      select: {
        name: true,
        emails: {
          select: {
            createdAt: true,
            id: true,
          },
        },
      },
    });

    const projectsWithEmailCounts = projects.map(project => {
      const emailCountsByDate = project.emails.reduce((acc, email) => {
        const date = email.createdAt.toISOString().split('T')[0]; // Group by date (YYYY-MM-DD)
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {} as Record<string, number>);

      return {
        projectName: project.name,
        emailCountsByDate,
      };
    });

    return projectsWithEmailCounts;

    // const result = projects.map(project => {
    //   const emailsGroupedByDate = project.emails.reduce((acc, email) => {
    //     const date = email.createdAt.toISOString().split('T')[0]; // Group by date (YYYY-MM-DD)
    //     if (!acc[date]) {
    //       acc[date] = [];
    //     }
    //     acc[date].push(email.id);
    //     return acc;
    //   }, {} as Record<string, string[]>);

    //   return {
    //     projectName: project.name,
    //     emailsGroupedByDate,
    //   };
    // });

    // return result;
  } catch (error) {
    throw new Error('Failed to retrieve user projects with grouped emails');
  } finally {
    await prisma.$disconnect();
  }
};

