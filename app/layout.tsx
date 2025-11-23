"use client";
import {
  Nunito,
  Rosarivo,
  Noto_Sans_Old_Persian,
  Plus_Jakarta_Sans,
  Inter,
} from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { NextAuthProvider } from "@/components/providers";
import Header from "@/components/header";
import footer from "@/components/footer";
import { Suspense, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { CSPostHogProvider } from "@/lib/providerPostHog";
import { Helmet } from "react-helmet";
import "prismjs/themes/prism-tomorrow.css";
import Link from "next/link";
import { NextSeo } from "next-seo";

const inter =  ({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.title = "Build Your Waitlist in 30s & Start Growing Today";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <RecoilRoot>
          <CSPostHogProvider>
            <html lang="en" className="dark">
              <title>Instant Waitlist Setup: Grow Your Audience Now</title>
              <link rel="icon" href="/logo.png" sizes="any" />
              <meta
                name="description"
                content="Turn visitors into loyal subscribers with our lightning-fast waitlist setup. Ideal for landing pages and websites aiming for rapid growth."
              />

              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://www.smadmail.com/" />
              <meta
                property="og:title"
                content="Instant Waitlist Setup: Grow Your Audience Now"
              />
              <meta
                property="og:description"
                content="Turn visitors into loyal subscribers with our lightning-fast waitlist setup. Ideal for landing pages and websites aiming for rapid growth."
              />
              <meta
                property="og:image"
                content="https://www.smadmail.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.c3efdc39.png&w=640&q=75"
              />
              <meta
                property="og:image"
                itemProp="image"
                content="https://www.smadmail.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.c3efdc39.png&w=640&q=75"
              />

              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:url" content="https://www.smadmail.com/" />
              <meta
                name="twitter:title"
                content="Instant Waitlist Setup: Grow Your Audience Now"
              />
              <meta
                name="twitter:description"
                content="Turn visitors into loyal subscribers with our lightning-fast waitlist setup. Ideal for landing pages and websites aiming for rapid growth."
              />
              <meta
                name="twitter:image"
                content="https://www.smadmail.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.c3efdc39.png&w=640&q=75"
              />

              <NextSeo
                title="Build Your Waitlist in 30s & Start Growing Today"
                description="Create a waitlist in under 30 seconds for your landing page or website. Transform visitors into subscribers effortlessly and start growing your audience today!"
                canonical="https://smadmail.com"
                openGraph={{
                  type: "article",
                  article: {
                    publishedTime: "2022-06-21T23:04:13Z",
                    modifiedTime: "2022-01-21T18:04:43Z",
                    authors: ["https://smadmail.com", "https://smadmail.com"],
                    tags: ["waitlist", "newsletter", "maillist"],
                  },
                  images: [
                    {
                      url: "https://www.smadmail.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.c3efdc39.png&w=640&q=75",
                      width: 850,
                      height: 650,
                      alt: "Photo of text",
                    },
                  ],
                  site_name: "SMAD",
                }}
              />

              {/* </Helmet> */}

              <body
                className={`flex justify-center flex-col  bg-black items-center w-full ${inter.variable} `}
              >
                {/* test */}
                <div className="flex justify-center items-center gap-x-1 py-3 w-full bg-neutral-800 text-xs  md:text-sm text-neutral-400">
                  <span>we are now available on product Hunt . Support us</span>
                  <Link
                    href="https://www.producthunt.com/products/smad#smad"
                    target="_blank"
                    className="underline"
                  >
                    Here
                  </Link>{" "}
                </div>
                <NextAuthProvider>
                  <div className="flex max-w-[1050px] w-full gap-x-4  p-2 h-full justify-center items-center flex-col">
                    <div className="flex py-4  min-h-[90vh] w-full flex-col justify-start items-center  ">
                      <Header />
                      {children}
                    </div>

                    <footer />
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
