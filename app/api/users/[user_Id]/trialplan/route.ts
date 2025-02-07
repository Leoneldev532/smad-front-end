import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"
import { generateFinalDate, setGoodPlan } from "@/lib/utils";



export async function GET(
    request: NextRequest,
    { params }: { params: { user_Id: string } }
) {
    const userId = params.user_Id;

    try {

        const trial_is_finished = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                trial_is_finished: true,
            },
        })

        await prisma.privateKey.update({
            where: { userId: userId },
            data: {
                expiresAt: generateFinalDate(setGoodPlan(421959) || "14days").toDate()
            }
        });

        return NextResponse.json(trial_is_finished);
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
