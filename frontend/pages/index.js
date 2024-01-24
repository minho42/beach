import Head from "next/head"
import { BeachList } from "../components/BeachList"

export default function Home() {
  return (
    <main className="flex justify-center w-full">
      <Head>
        <title>Beach</title>
        <meta name="description" content="Best beaches in Sydney, NSW" />
      </Head>

      <div className="w-full">
        <BeachList />
      </div>
    </main>
  )
}
