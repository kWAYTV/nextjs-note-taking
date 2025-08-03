import { EmailTemplate } from "@daveyplate/better-auth-ui/server";

import { env } from "@/env";

interface EmailVerificationProps {
  userName: string;
  verificationUrl: string;
}

export function EmailVerificationTemplate({
  userName,
  verificationUrl,
}: EmailVerificationProps) {
  return EmailTemplate({
    action: "Verify Email",
    content: (
      <>
        <p>Hello {userName},</p>
        <p>
          Welcome to aris.sh! Please click the button below to verify your email
          address and complete your registration.
        </p>
        <p>
          If you didn&apos;t create an account with us, you can safely ignore
          this email.
        </p>
        <p style={{ fontSize: "12px", color: "#666" }}>
          If the button above doesn&apos;t work, copy and paste this link into
          your browser:
          <br />
          <a
            href={verificationUrl}
            style={{ color: "#0066cc", wordBreak: "break-all" }}
          >
            {verificationUrl}
          </a>
        </p>
      </>
    ),
    heading: "Verify Your Email Address",
    siteName: "aris.sh",
    baseUrl: env.BETTER_AUTH_URL,
    url: verificationUrl,
    preview: "Verify your email address to complete your registration",
    imageUrl: "https://aris.sh/og.png",
  });
}
