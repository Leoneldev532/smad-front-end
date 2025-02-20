"use client"
import {  Nunito, Rosarivo,Noto_Sans_Old_Persian, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner"
import { NextAuthProvider } from "@/components/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";
import { CSPostHogProvider } from "@/lib/providerPostHog";

const jakarta =  Plus_Jakarta_Sans({subsets: ["latin"],weight:"400",variable:"--font-jakarta" })
const inter =  Inter({subsets: ["latin"],weight:"400",variable:"--font-inter" })


const queryClient = new QueryClient()


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(()=>{
      document.title = "Smad by leonel Yimga";
  },[])

  return (

    <QueryClientProvider client={queryClient}>
      <Suspense>
      <RecoilRoot>
      <CSPostHogProvider>
      <html lang="en" className="dark" >
      <Head>
        <title>Smad by leonel Yimga</title>
        <meta name="description" content={"Build quickly a newsletter form , wailist form and more for your landing page, website"} />
      </Head>
        <body className={`flex justify-center bg-black items-center w-full ${inter.variable} ${jakarta.variable}`}>
          <NextAuthProvider>
            <div className="flex max-w-[1050px] w-full gap-x-4  p-2 h-full justify-center items-center flex-col">

              <div className="flex py-4  min-h-[90vh] w-full flex-col justify-start items-center  ">
                <Header />
                {children}
              </div>

              <Footer/>
            </div>
          </NextAuthProvider>
          <Toaster />
        </body>
        <Analytics />
      </html>
      </CSPostHogProvider>
      </RecoilRoot>
      </Suspense>
    </QueryClientProvider>
  );
}
