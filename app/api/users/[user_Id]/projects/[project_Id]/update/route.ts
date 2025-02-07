import { updateProject } from '@/app/controllers/project.controllers';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { userId: string, project_Id: string } }) {
  const { project_Id } = params;
  const { name } = await request.json();

  if (!project_Id || !name) {
    return NextResponse.json({ error: 'Missing project_Id or name' }, { status: 400 });
  }

  try {
    const project = await updateProject(project_Id, name);
    return NextResponse.json(project, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
