import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl sm:text-4xl text-center sm:text-left">
          Welcome to <b>Cosmink</b>
          <small>,<br /> your dashboard builder</small>
        </h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by importing your data.
          </li>
          <li className="mb-2">Create your dashboard.</li>
          <li className="mb-2">Save it.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="project/view"
            rel="noopener noreferrer"
          >
            <Button variant="contained" size="large">
              <Image
                className="dark:invert m-2"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Try now
            </Button>
          </Link>
          <Link
            href="https://github.com/Nielk74/cosmink"
            rel="noopener noreferrer"
          >
            <Button size="large" variant="outlined">
              <Image
                className="m-2"
                src="/github.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Check the code
            </Button>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Nielk74"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          My GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/antoine-klein-1b6a61150/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.svg"
            alt="LinkedIn icon"
            width={16}
            height={16}
          />
          My LinkedIn
        </a>
      </footer>
    </div>
  );
}
