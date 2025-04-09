import { createProjectMap, deleteProjectMap, getProjectMaps } from '@/app/controllers/map.controller';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { project_Id: string } }) {
  const { project_Id } = params;

  try {
    const maps = await getProjectMaps(project_Id);
    return NextResponse.json(maps, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}


export async function POST(
  request: Request,
  { params }: { params: { project_Id: string } }
) {
  const { project_Id } = params;

  try {
    const body = await request.json();
    const { link } = body;
console.log("link",link)
    const newMap = await createProjectMap(project_Id, link);
    return NextResponse.json(
      {
        message: "Map successfull created !!",
        data: newMap,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("erro during creation of Map:", error.message);
    return NextResponse.json(
      { error: error.message || "erro during creation of Map" },
      { status: error.message.includes("required") || error.message.includes("not exist") ? 400 : 500 }
    );
  }
}


