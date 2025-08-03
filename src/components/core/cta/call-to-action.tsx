import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
            Build your mind like a developer.
          </h2>
          <p className="mt-4">
            Fast, local-first and built for code. Notes that work the way you
            think.
          </p>

          <form action="" className="mx-auto mt-10 max-w-sm lg:mt-12">
            <div className="md:pr-1.5 lg:pr-0">
              <Button aria-label="submit" asChild>
                <Link href="auth/sign-in">
                  <span className="hidden md:block">Get Started</span>
                  <SendHorizonal
                    className="relative mx-auto size-5 md:hidden"
                    strokeWidth={2}
                  />
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
