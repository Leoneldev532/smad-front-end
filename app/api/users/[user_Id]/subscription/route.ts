import { NextResponse } from 'next/server';
import { getLastSubscription } from "@/app/controllers/subscription.controller";

export async function GET(request: Request, { params }: { params: { user_Id: string } }) {
  const { user_Id } = params;

  if (!user_Id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const lastSubscription = await getLastSubscription(user_Id);
    if (lastSubscription) {
      return NextResponse.json(lastSubscription, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error(error); // Ajout d'un log pour le débogage
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}



// export async function GET(request: Request, { params }: { params: { user_Id: string } }) {
//     const { user_Id } = params;
  
//     if (!user_Id) {
//       return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
//     }
  
//     try {
//       const subscriptions = await getAllSubscriptions(user_Id); // Fonction pour récupérer toutes les souscriptions
//       if (subscriptions && subscriptions.length > 0) {
//         return NextResponse.json(subscriptions, { status: 200 });
//       } else {
//         return NextResponse.json({ error: 'No subscriptions found for this user' }, { status: 404 });
//       }
//     } catch (error: any) {
//       console.error(error); // Ajout d'un log pour le débogage
//       return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
//     }
//   }