"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { authClient } from "@/lib/auth-client";
import { getBaseUrl } from "@/lib/utils";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthUIProvider
        authClient={authClient}
        baseURL={getBaseUrl()}
        navigate={(path) => router.push(path)}
        replace={(path) => router.replace(path)}
        redirectTo="/dashboard"
        onSessionChange={() => {
          router.refresh();
        }}
        Link={Link}
        credentials={{
          confirmPassword: true,
          forgotPassword: true,
          rememberMe: true,
        }}
        emailVerification
        avatar
        deleteUser={{
          verification: true,
        }}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster theme="system" />
      </AuthUIProvider>
    </ThemeProvider>
  );
}
