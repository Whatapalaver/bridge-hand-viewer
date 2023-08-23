import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Bridge Hand Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className="jumbotron p-4 p-md-5 text-black rounded bg-light">
            <h1 className="display-4 font-italic">Bridge Hands Generator</h1>
            <p className="lead">
              A utility for generating Bridge hands to facilitate remote bridge
              games.
            </p>
            <p className="lead my-5">
              Assign directions (North, South, East or West) to your bridge
              chums and then share a game code so they can retrieve their hand
            </p>
            <p className="my-4">
              There are plenty of games available, just search for a game using
              an id from 1 to 500.
            </p>
            <p className="my-4">
              All the games will be refreshed weekly - Sunday at 1am London
              time, to ensure there are always fresh games to play.
            </p>
            <p className="my-4">
              If you need some guidance on how you can play remotely check out
              the About page.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
