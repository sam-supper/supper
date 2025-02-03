import Link from "next/link";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="sticky top-0 z-[100] flex gap-4 items-center justify-between px-site-x py-site-y bg-off-white dark:bg-article-black transition-[background-color] duration-300 ease">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="flex items-center gap-32">
        <Link href="/">Search</Link>
        <Link href="/about">Table of Contents</Link>
        <button>Bag Empty</button>
      </nav>
    </header>
  )
}