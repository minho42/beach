import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex w-full items-center justify-between sm:justify-around bg-white  border-b border-gray-300 h-12 mb-3 px-2 sm:px-6">
      <div className="text-2xl">
        {/* ☀️  */}
        <Link href="/">Beach ⛱</Link>
      </div>

      <div className="flex capitalize space-x-4 sm:space-x-6 h-full">
        <div
          className={`${
            router.pathname === "/" ? "border-b-4 border-amber-400" : "border-b-4 border-transparent"
          } flex items-center h-full`}
        >
          <Link href="/">beach</Link>
        </div>
        <div
          className={`${
            router.pathname === "/about" ? "border-b-4 border-amber-400" : "border-b-2 border-transparent"
          } flex items-center h-full`}
        >
          <Link href="/about">about</Link>
        </div>
      </div>
    </nav>
  );
};
