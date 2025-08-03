import { SharedUserButton } from "@/components/core/reusable/user-button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="w-full border-b border-dashed bg-white backdrop-blur dark:bg-zinc-950/50">
        <div className="m-auto max-w-5xl px-6">
          <div className="flex items-center justify-between gap-6 py-3">
            <Link
              href="/"
              aria-label="home"
              className="flex items-center space-x-2"
            >
              <h2>aris.sh</h2>
            </Link>

            <div className="flex items-center gap-3">
              <ModeToggle />
              <SharedUserButton />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
