import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code, Shield, Zap } from "lucide-react";
import { type ReactNode } from "react";

export default function Features() {
  return (
    <section className="py-16 md:py-32">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
            Crafted for developers, like you.
          </h2>
          <p className="mt-4">
            Smart, flexible and powerful - everything you need to build your
            second brain.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 @min-4xl:max-w-full @min-4xl:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
          <Card className="group border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Quick Notes</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Capture ideas instantly with lightning-fast input and
                keyboard-first UX. No friction — just flow.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Code className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Developer Friendly</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Markdown, code blocks, CLI shortcuts, and Git-style versioning.
                Feels like home.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Shield className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Secure by Design</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Your notes are private. Local-first architecture and optional
                end-to-end encryption mean full control.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="to-background absolute inset-0 bg-radial from-transparent to-75%"
    />
    <div className="dark:bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l bg-white">
      {children}
    </div>
  </div>
);
