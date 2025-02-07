import { prisma } from "@/lib/db";

interface AppError extends Error {
  statusCode?: number;
}


export const createAppError = (message: string, statusCode: number): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
};

export const createProject = async (userId: string, name: string): Promise<any> => {
  try {
    const existingProject = await prisma.project.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (existingProject) {
      throw  createAppError('Project with the same name already exists', 409);
    }

    const project = await prisma.project.create({
      data: {
        name,
        userId,
      },
    });
    return project;
  } catch (error) {
    const appError: AppError = error as AppError;
    appError.statusCode = appError.statusCode || 500;
    appError.message = appError.message || 'Failed to create project';
    throw appError;
  } finally {
    await prisma.$disconnect();
  }
};

// Contrôleur pour mettre à jour un projet
export const updateProject = async (projectId: string, name: string): Promise<any> => {
  try {
    const project = await prisma.project.update({
      where: { id: projectId },
      data: { name },
    });
    return project;
  } catch (error) {
    const appError: AppError = error as AppError;
    appError.statusCode = appError.statusCode || 500;
    appError.message = appError.message || 'Failed to update project';
    throw appError;
  } finally {
    await prisma.$disconnect();
  }
};

// Contrôleur pour supprimer un projet
export const deleteProject = async (projectId: string): Promise<any> => {
  try {
    await prisma.email.deleteMany({
      where: {
        projectId: projectId,
      },
    });
    
    const project = await prisma.project.delete({
      where: { id: projectId },
    });
    return project;
  } catch (error) {
    const appError: AppError = error as AppError;
    appError.statusCode = appError.statusCode || 500;
    appError.message = appError.message || 'Failed to delete project';
    throw appError;
  } finally {
    await prisma.$disconnect();
  }
};
