import { NextResponse } from "next/server";
import {
  updateProjectMap,
  deleteProjectMap,
} from "@/app/controllers/map.controller";

// Exportation de la méthode PUT pour la mise à jour
export async function PUT(
  request: Request,
  { params }: { params: { project_Id: string; map_Id: string } },
) {
  const { project_Id, map_Id } = params;
  const { link } = await request.json(); // Extrait le lien du corps de la requête

  try {
    const updatedMap = await updateProjectMap(project_Id, map_Id, { link });
    return NextResponse.json(
      {
        message: "Carte mise à jour avec succès",
        data: updatedMap,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Erreur serveur lors de la mise à jour",
      },
      {
        status:
          error.message.includes("requis") ||
          error.message.includes("n'existe pas")
            ? 400
            : 500,
      },
    );
  }
}

// Exportation de la méthode DELETE pour la suppression
export async function DELETE(
  request: Request,
  { params }: { params: { project_Id: string; map_Id: string } },
) {
  const { project_Id, map_Id } = params;
  try {
    const deletedMap = await deleteProjectMap(project_Id, map_Id);
    return NextResponse.json(
      {
        message: "Carte supprimée avec succès",
        data: deletedMap,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Erreur serveur lors de la suppression",
      },
      {
        status:
          error.message.includes("requis") ||
          error.message.includes("n'existe pas")
            ? 400
            : 500,
      },
    );
  }
}
