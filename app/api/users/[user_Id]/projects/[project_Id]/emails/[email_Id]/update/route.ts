import { updateEmailInProject } from '@/app/controllers/email.controllers';
import { updateProject } from '@/app/controllers/project.controllers';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { user_Id: string, project_Id: string,email_Id:string } }) {
  const { project_Id,email_Id } = params;
  const { newEmail } = await request.json();

  console.log(project_Id,newEmail)

  if (!project_Id || !newEmail) {
    return NextResponse.json({ error: 'Missing project_Id or newEmail' }, { status: 400 });
  }

  try {
    const project = await updateEmailInProject(project_Id,email_Id, newEmail);
    return NextResponse.json(project, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
