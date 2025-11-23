import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { user_Id: string } },
) {
  const userId = params.user_Id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: String(userId) },
      include: {
        privateKey: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Omit sensitive information
    const { password, ...safeUser } = user;

    return NextResponse.json(safeUser);
  } catch (error: any) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error fetching user", message: error && error?.message },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
