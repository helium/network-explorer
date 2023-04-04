import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Stats • Helium Network Explorer</title>
        <meta name="description" content="Helium Network Explorer Stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.description}>
          <h2 className={inter.className}>STATS PAGE</h2>
        </div>
      </main>
    </>
  );
}
