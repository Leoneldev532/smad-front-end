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
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        privateKey: {
          create: {
            key: generateprivateKey(email.toLowerCase()),
            expiresAt: null, // Vous pouvez définir une date d'expiration si nécessaire
          },
        },
      },
      include: {
        privateKey: true, // Inclure la clé publique dans la réponse
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 },
    );
  }
}
