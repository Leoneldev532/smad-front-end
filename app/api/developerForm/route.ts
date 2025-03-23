import { NextResponse } from "next/server";
import {prisma} from "@/lib/db"

export async function GET() {
  try {
    const developers = await prisma.formDeveloper.findMany();
    return NextResponse.json({ success: true, developers });
  } catch (error) {
    console.error('Error fetching developers:', error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
