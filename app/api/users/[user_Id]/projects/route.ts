import { NextResponse } from "next/server";
import { getUserProjects } from "@/app/controllers/user.controllers";
import { createProject } from "@/app/controllers/project.controllers";

export async function GET(
  request: Request,
  { params }: { params: { user_Id: string } },
) {
  const { user_Id } = params;

  if (!user_Id) {
    return NextResponse.json(
      { error: "Missing or invalid user_Id" },
      { status: 400 },
    );
  }

  try {
    const projects = await getUserProjects(user_Id);
    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { user_Id: string } },
) {
  const { user_Id } = params;
  const { name, withName } = await request.json();

  if (!user_Id || !name) {
    return NextResponse.json(
      { error: "Missing userid or name" },
      { status: 400 },
    );
  }

  try {
    const project = await createProject(user_Id, name, withName);
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
