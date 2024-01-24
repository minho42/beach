import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex flex-col items-center w-full bg-white text-gray-500 text-base border-t border-gray-300 px-3 sm:px-6 pt-10 pb-20 mt-10 space-y-2">
      <div className="hover:underline hover:underline-offset-1">
        <Link href="/about">About</Link>
      </div>
    </footer>
  )
}
