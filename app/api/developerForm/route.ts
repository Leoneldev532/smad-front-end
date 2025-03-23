import { NextResponse } from "next/server";
import {prisma} from "@/lib/db"
import { getDevelopersFom } from "@/app/controllers/developerform.controller";

export async function GET() {
  try {
    const developers = await getDevelopersFom();
    return NextResponse.json({ success: true, developers });
  } catch (error) {
    console.error('Error fetching developers:', error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
