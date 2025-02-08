import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"
import dayjs from "dayjs";
import { generateFinalDate, setGoodPlan } from "@/lib/utils";



export async function PUT(
    request: NextRequest,
    { params }: { params: { user_Id: string } }
) {
    const userId = params.user_Id;
    try {

       await prisma.user.update({
                       where:{id:userId},
                       data:{
                           trial_is_finished : true
                       }
                   })

        await prisma.subscription.create({
            data: {
                customerId: 192093,
                typeSubscription: "free trial",
                productId: 421959,
                billingDate: dayjs().toDate(),
                userId: userId,
                subscriptionPrice:2,
            },
        });

        await prisma.privateKey.update({
                    where: { userId: userId },
                    data: {
                        expiresAt:  generateFinalDate("1year").toDate()
                    }
                });

        return NextResponse.json({ message: "subscription valid OK" }, { status: 200 });



    } catch (error:any) {
        console.error('Request error', error);
        return NextResponse.json(
            { error: 'Error fetching user', message: error?.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
