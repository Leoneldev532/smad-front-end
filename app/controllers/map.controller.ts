import { prisma } from "@/lib/db";

export async function getProjectMaps(projectId: string) {
  const maps = await prisma.map.findMany({
    where: {
      projectId: projectId
    },
    select: {
      id: true,
      link: true,
      projectId: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return maps;
}

export async function deleteProjectMap(projectId: string, mapId: string) {

  // Validation des paramètres avec des messages plus spécifiques
  if (!projectId) throw new Error("L'identifiant du projet (projectId) est requis");
  if (!mapId) throw new Error("L'identifiant de la carte (mapId) est requis");

  // Vérification préalable de l'existence (optionnel mais recommandé)
  const mapExists = await prisma.map.findUnique({
    where: {
      id: mapId,
      projectId: projectId,
    },
  });

  if (!mapExists) {
    throw new Error("La carte n'existe pas ou n'appartient pas à ce projet");
  }

  // Suppression de la carte
  const deletedMap = await prisma.map.delete({
    where: {
      id: mapId,
      projectId: projectId,
    },

  });

  return deletedMap;
}



export async function createProjectMap(projectId: string, link: string) {
  if (!projectId) throw new Error("L'identifiant du projet (projectId) est requis");
  if (!link) throw new Error("Le lien (link) est requis pour créer une carte");

  // Vérifier si le projet existe (optionnel mais recommandé)
  const projectExists = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!projectExists) {
    throw new Error("Le projet spécifié n'existe pas");
  }

  const newMap = await prisma.map.create({
    data: {
      link: link,
      projectId: projectId,
    },
  });

  return newMap;
}


export async function updateProjectMap(projectId: string, mapId: string, data: { link: string }) {
  // Validation des paramètres
  if (!projectId) throw new Error("L'identifiant du projet (projectId) est requis");
  if (!mapId) throw new Error("L'identifiant de la carte (mapId) est requis");
  if (!data.link) throw new Error("Le lien (link) est requis pour mettre à jour une carte");

  // Vérification préalable de l'existence de la carte
  const mapExists = await prisma.map.findUnique({
    where: {
      id: mapId,
      projectId: projectId,
    },
  });

  if (!mapExists) {
    throw new Error("La carte n'existe pas ou n'appartient pas à ce projet");
  }

  // Mise à jour de la carte
  const updatedMap = await prisma.map.update({
    where: {
      id: mapId,
      projectId: projectId,
    },
    data: {
      link: data.link,
      updatedAt: new Date(), // Mettre à jour l'horodatage
    },
  });

  return updatedMap;
}
