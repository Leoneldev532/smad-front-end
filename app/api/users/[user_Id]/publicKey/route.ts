import { NextResponse } from 'next/server';

import { prisma } from "@/lib/db";

export async function GET(request: Request, { params }: { params: { user_Id: string } }) {
  const { user_Id } = params;

  // Validation de l'ID utilisateur
  if (!user_Id || typeof user_Id !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid user_Id' }, { status: 400 });
  }

  try {
    // Récupération de l'utilisateur avec sa clé publique
    const user = await prisma.user.findUnique({
      where: { id: user_Id },
      select: { privateKey: true }, // Correction du champ pour correspondre au schéma
    });

    // Vérification si l'utilisateur existe
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log(user,"============")

    // Retourner la clé publique
    return NextResponse.json({ privateKey: user.privateKey?.key }, { status: 200 }); // Assurez-vous d'accéder au bon champ
  } catch (error) {
    console.error('Error fetching user public key:', error); // Journaliser l'erreur pour le débogage
    return NextResponse.json({ error: 'An error occurred while fetching the public key.' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Fermer la connexion Prisma après utilisation
  }
}
