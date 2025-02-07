import { deleteEmailFromProject } from '@/app/controllers/email.controllers';
import { NextResponse } from 'next/server';

import { prisma } from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { user_id: string, project_Id: string,email_Id:string } }) {
  const { project_Id,email_Id } = params;

  

  if (!email_Id || !project_Id ) {
    return NextResponse.json({ error: 'Missing projectId or emailId' }, { status: 400 });
  }

  try {
    const email = await deleteEmailFromProject(email_Id,project_Id);
    return NextResponse.json(email, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
