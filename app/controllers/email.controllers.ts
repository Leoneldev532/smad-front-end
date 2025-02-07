import { prisma } from "@/lib/db";

interface AppError extends Error {
  statusCode?: number;
}

// Contrôleur pour ajouter un email à un projet
export const addEmailToProject = async (projectId: string, email: string): Promise<any> => {
  try {
    const newEmail = await prisma.email.create({
      data: {
        email,
        projectId,
      },
    });
    return newEmail;
  } catch (error) {
    const appError: AppError = error as AppError;
    appError.statusCode = appError.statusCode || 500;
    appError.message = appError.message || 'Failed to add email to project';
    throw appError;
  } finally {
    await prisma.$disconnect();
  }
};


// Contrôleur pour supprimer un email d'un projet
export const deleteEmailFromProject = async (emailId: string,projectId:string): Promise<any> => {
  try {
    const deletedEmail = await prisma.email.delete({
      where: {
        id: emailId,
        projectId
      },
    });
    return deletedEmail;
  } catch (error) {
    const appError: AppError = error as AppError;
    appError.statusCode = appError.statusCode || 500;
    appError.message = appError.message || 'Failed to delete email from project';
    throw appError;
  } finally {
    await prisma.$disconnect();
  }
};



// Contrôleur pour mettre à jour un email dans un projet
export const updateEmailInProject = async (projectId:string,emailId: string, newEmail: string): Promise<any> => {
  try {
    const updatedEmail = await prisma.email.update({
      where: {
        id: emailId,
        projectId,
      },
      data: {
        email: newEmail,
      },
    });
    return updatedEmail;
  } catch (error) {
    const appError: AppError = error as AppError;
    appError.statusCode = appError.statusCode || 500;
    appError.message = appError.message || 'Failed to update email in project';
    throw appError;
  } finally {
    await prisma.$disconnect();
  }
};