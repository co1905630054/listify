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
        <title>Listify| Boost Your Affiliate Success</title>
        <meta name="description" content="Browse top-performing affiliate tools from WarriorPlus. Handpicked, trusted, and ready to scale your income. Listify Digital World" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" /> {/* Tailwind blue-700 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-800 antialiased scroll-smooth flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </>
  )
}
