import { NextResponse } from "next/server";
import {
  getUserProjects,
  getUserProjectsWithEmailsGroupedByDate,
} from "../../../../controllers/user.controllers";
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
    const projects = await getUserProjectsWithEmailsGroupedByDate(user_Id);
    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
