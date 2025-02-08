import crypto from "crypto";
import axios from "axios"
import {lsqyConfig,headers} from "../../lemon"
import dayjs, { Dayjs } from "dayjs";
import { generateFinalDate, planName, setGoodPlan } from "@/lib/utils";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function POST(req:Request) {
  try {
    const eventType = req.headers.get("X-Event-Name");
    const signature = req.headers.get("X-Signature");
    
    // Lire le corps de la requête une seule fois
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    // Vérifier la signature
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || " ";
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signatureBuffer = Buffer.from(signature || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }




    
    if (eventType === "order_created" ) {
      const userId = body.meta.custom_data.user_id;
      const email = body.data.attributes.user_email;
      const isSuccessful = body.data.attributes.status === "active" || "paid";


      if (isSuccessful) {

        try {
          // Vérifiez si l'utilisateur existe
          const user = await prisma.user.findUnique({
            where: { id: userId }, // Remplacez par le champ approprié si nécessaire
          });
      
          if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
          }


          
          // Si l'utilisateur existe, créez la souscription
          await prisma.subscription.create({
            data: { 
              customerId: body.data.attributes.customer_id,
              typeSubscription: body.data.attributes.product_name || "Per Year",
              productId: body.data.attributes.product_id,
              billingDate: dayjs().toDate(),
              userId: body.meta.custom_data.user_id,
              subscriptionPrice: body.data.attributes.total_usd,
            },
          });
          
          await prisma.privateKey.update({
            where: { userId: userId },
            data: {
              expiresAt: generateFinalDate("1year").toDate()
            }
          });

          

        return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });
      } catch (error) {
        console.error("Error updating database:", error);
        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
      }

      }


    }

    // Logique selon l'événement
    if (eventType === "subscription_created" || eventType === "subscription_updated") {
      const userId = body.meta.custom_data.user_id;
      const email = body.data.attributes.user_email;
      const isSuccessful = body.data.attributes.status === "active";

      if (isSuccessful) {
        try {
            // Vérifiez si l'utilisateur existe
            const user = await prisma.user.findUnique({
              where: { id: userId }, // Remplacez par le champ approprié si nécessaire
            });
        
            if (!user) {
              return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            
            // Si l'utilisateur existe, créez la souscription
            await prisma.subscription.create({
              data: { 
                customerId: body.data.attributes.customer_id,
                typeSubscription: body.data.attributes.product_name || " ",
                productId: body.data.attributes.product_id,
                billingDate: dayjs().toDate(),
                userId: body.meta.custom_data.user_id,
                subscriptionPrice: body.data.attributes.billing_anchor,
              },
            });
            
            await prisma.privateKey.update({
              where: { userId: userId },
              data: {
                expiresAt: generateFinalDate("1year").toDate()
              }
            });
  
            

          return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });
        } catch (error) {
          console.error("Error updating database:", error);
          return NextResponse.json({ error: "Database update failed" }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}