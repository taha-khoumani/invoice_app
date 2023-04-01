import Head from 'next/head'
import Home from "@/components/home/Home"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Invoices</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Home/>
    </>
  )
}
