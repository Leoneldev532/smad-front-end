import { NextResponse } from 'next/server';
import { prisma } from "@/lib/db";

export async function GET(request: Request, { params }: { params: { user_Id: string } }) {
  const { user_Id } = params;

  // Validation de l'ID utilisateur
  if (!user_Id || typeof user_Id !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid user_Id' }, { status: 400 });
  }

  try {
    // Récupération de l'utilisateur avec sa clé API Resend
    const user = await prisma.user.findUnique({
      where: { id: user_Id },
    });

    // Vérification si l'utilisateur existe
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Retourner la clé API Resend
    return NextResponse.json({ resendApiKey: user.resendApiKey }, { status: 200 });

  } catch (error) {
    console.error('Error fetching user Resend API key:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the Resend API key.' }, { status: 500 });
  }
}



export async function POST(request: Request, { params }: { params: { user_Id: string } }) {
  const { user_Id } = params;
  const { resendApiKey } = await request.json();

  // Validation de l'ID utilisateur
  if (!user_Id || typeof user_Id !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid user_Id' }, { status: 400 });
  }

  try {
    // Récupération de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: user_Id },
    });

    // Vérification si l'utilisateur existe
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Mise à jour de la clé API Resend
    await prisma.user.update({
      where: { id: user_Id },
      data: { resendApiKey: resendApiKey }
    });

    return NextResponse.json({ message: 'Resend API key updated successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error updating user Resend API key:', error);
    return NextResponse.json({ error: 'An error occurred while updating the Resend API key.' }, { status: 500 });
  }
}
