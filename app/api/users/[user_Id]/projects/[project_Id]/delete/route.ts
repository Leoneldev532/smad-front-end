import { NextResponse } from 'next/server';
import { deleteProject } from '../../../../../../controllers/project.controllers';
import {prisma} from "@/lib/db"
export async function DELETE(request: Request, { params }: { params: { user_id: string, project_Id: string } }) {
  const { project_Id } = params;



  if (!project_Id) {
    return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
  }

  try {
    const project = await deleteProject(project_Id);
    return NextResponse.json(project, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  } finally {
      await prisma.$disconnect();
    }
}
