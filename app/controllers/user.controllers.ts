import { prisma } from "@/lib/db";

export const getUserProjects = async (id_user: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id_user },
    });

    if (!user) {
      throw new Error("user not exist");
    }

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
    });

    return projects;
  } catch (error) {
    throw new Error("Failed to retrieve user projects");
  } finally {
    await prisma.$disconnect();
  }
};

export const getProjectEmails = async (project_id: string) => {
  try {
    const emails = await prisma.email.findMany({
      where: { projectId: project_id },
    });

    return emails;
  } catch (error) {
    throw new Error("Failed to retrieve project emails");
  } finally {
    await prisma.$disconnect();
  }
};

export const getUserProjectsWithEmailsGroupedByDate = async (
  id_user: string,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id_user },
    });

    if (!user) {
      throw new Error("User does not exist");
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

    const projectsWithEmailCounts = projects.map((project) => {
      const emailCountsByDate = project.emails.reduce(
        (acc, email) => {
          const date = email.createdAt.toISOString().split("T")[0];
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date]++;
          return acc;
        },
        {} as Record<string, number>,
      );

      return {
        projectName: project.name,
        emailCountsByDate,
      };
    });

    return projectsWithEmailCounts;
  } catch (error) {
    throw new Error("Failed to retrieve user projects with grouped emails");
  } finally {
    await prisma.$disconnect();
  }
};
