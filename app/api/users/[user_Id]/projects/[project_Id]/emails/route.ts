import { NextResponse } from "next/server";
import { getProjectEmails } from "@/app/controllers/user.controllers";
import { createProject } from "@/app/controllers/project.controllers";
import { addEmailToProject } from "@/app/controllers/email.controllers";

export async function GET(
  request: Request,
  { params }: { params: { project_Id: string } },
) {
  const { project_Id } = params;

  try {
    const emails = await getProjectEmails(project_Id);
    return NextResponse.json(emails, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { project_Id: string } },
) {
  const { project_Id } = params;
  const { email, name } = await request.json();

  if (!project_Id || !email) {
    return NextResponse.json(
      { error: "Missing project_Id or email" },
      { status: 400 },
    );
  }

  try {
    const newEmail = await addEmailToProject(project_Id, email, name);
    return NextResponse.json(newEmail, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
