import { generateprivateKey } from "@/lib/utils";
import { prisma } from "@/lib/db";

import { hash } from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };

    if (!name || !email || !password) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Name, email, and password are required",
        }),
        { status: 400 },
      );
    }

    const hashed_password = await hash(password, 12);
    const normalizedEmail = email.toLowerCase();
    const privateKeyValue = generateprivateKey(normalizedEmail);

    console.log("Creating user with email:", normalizedEmail);
    console.log("Generated private key:", privateKeyValue);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashed_password,
        privateKey: {
          create: {
            key: privateKeyValue,
            expiresAt: null,
          },
        },
      },
      include: {
        privateKey: true,
      },
    });

    console.log("User created successfully with private key:", user.privateKey?.key);

    return NextResponse.json({
      status: "success",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        privateKey: user.privateKey?.key,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    
    // Handle unique constraint violations
    if (error.code === "P2002") {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Email already exists",
        }),
        { status: 409 },
      );
    }

    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message || "Failed to create user",
      }),
      { status: 500 },
    );
  }
}
