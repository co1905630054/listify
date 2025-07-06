// pages/_app.tsx
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "react-hot-toast"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ingeneous Digital World | Boost Your Affiliate Success</title>
        <meta
          name="description"
          content="Browse top-performing affiliate tools from WarriorPlus. Handpicked, trusted, and ready to scale your income. Ingeneous Digital World"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" />
        <link rel="icon" href="/images/2.png" />
      </Head>

      <div className="relative min-h-screen bg-gradient-animated text-white antialiased scroll-smooth flex flex-col transition-all duration-700">
        {/* Optional overlay for readability */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0" />

        <div className="relative z-10">
          <Navbar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>

        <Toaster position="top-right" />
      </div>
    </>
  )
}
