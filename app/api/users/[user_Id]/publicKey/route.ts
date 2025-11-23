import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { user_Id: string } },
) {
  const { user_Id } = params;

  if (!user_Id || typeof user_Id !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid user_Id" },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: user_Id },
      select: { privateKey: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { privateKey: user.privateKey?.key },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching user public key:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the public key." },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
