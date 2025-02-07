
import {prisma} from "@/lib/db"

export const    getLastSubscription = async(userId:string) =>{
    const lastSubscription = await prisma.subscription.findFirst({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });
  
    return lastSubscription;
  }



  export async function getAllSubscriptions(userId: string) {
    return await prisma.subscription.findMany({
      where: { userId: userId },
    });
  }