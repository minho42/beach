import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col items-center w-full bg-white text-gray-500 text-base border-t border-gray-300 px-3 sm:px-6 pt-10 pb-20 mt-10 space-y-2">
      <div className="text-center">
        Made by
        <a
          className="font-semibold hover:underline hover:underline-offset-1 ml-1"
          href="https://minho42.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Min ho Kim
        </a>
      </div>

      <div className="flex space-x-4">
        <div className="flex justify-center text-center">
          <a
            className="hover:underline hover:underline-offset-1"
            href="https://twitter.com/minhokim42"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
        <div>·</div>
        <div className="flex justify-center text-center">
          <a
            className="hover:underline hover:underline-offset-1"
            href="https://github.com/minho42/beach"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="hover:underline hover:underline-offset-1">
        <Link href="/about">About</Link>
      </div>
    </footer>
  );
}
