import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home({ user }) {
  const router = useRouter();

  const getTasks = async () => {
    const res = await fetch("http://localhost:3000/api/task");

    const data = await res.json();
    console.log(data);
  };

  const createTask = async () => {
    const res = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      body: JSON.stringify({
        title: "task one2",
        description: "this is a task one",
      }),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img src={user.image} alt={user.name} width={200} />
        <h1 className={styles.title}>
          Welcome <a href="https://nextjs.org">{user.name}</a>
        </h1>

        <button onClick={getTasks}>get tasks</button>
        <button onClick={createTask}>crete task</button>

        <button onClick={() => signOut()}>Exit</button>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };

  return {
    props: {
      user: session.user,
    },
  };
};
