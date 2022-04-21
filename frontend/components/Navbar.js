import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-center sm:justify-around bg-white  border-b border-gray-300 h-12 mb-3 px-2 sm:px-6 shadow">
      <div className="text-2xl">
        <Link href="/">Beach ⛱</Link>
      </div>
    </nav>
  );
};
