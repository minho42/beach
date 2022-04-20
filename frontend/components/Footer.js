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

      <section className="flex space-x-6">
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
            href="https://github.com/minho42"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>

      <div className="text-black">
        <a
          className="flex items-center justify-center bg-amber-300 rounded-full shadow-lg px-6 py-2"
          href="https://www.buymeacoffee.com/minhokim"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy him a <span className="text-3xl">🥤</span>
        </a>
      </div>
    </footer>
  );
}
