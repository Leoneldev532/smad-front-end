
import { prisma } from "@/lib/db";
export const getDevelopersFom = async () => {
  try {
    const formDevelopers = await prisma.formDeveloper.findMany()

    if (!formDevelopers) {
      throw new Error('formDevelopers not exist');
    }
    return formDevelopers;

  } catch (error) {
    throw new Error('Failed to retrieve user formDevelopers');
  } finally {
    await prisma.$disconnect();
  }
};
