import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { haveIBeenPwned, openAPI } from "better-auth/plugins";

import { env } from "@/env";
import { hashPassword, verifyPassword } from "@/lib/hash";
import { ChangeEmailTemplate } from "@/server/actions/email/emails/change-email";
import { EmailVerificationTemplate } from "@/server/actions/email/emails/email-verification";
import { PasswordResetTemplate } from "@/server/actions/email/emails/password-reset";
import { sendEmailAction } from "@/server/actions/email/send-email.action";
import { db } from "@/server/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  appName: "banzclub",
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.BETTER_AUTH_URL || ""],

  account: {
    accountLinking: {
      enabled: true,
    },
  },

  rateLimit: {
    enabled: true,
    window: 10, // time window in seconds
    max: 100, // max requests in the window,
    storage: "database",
    modelName: "rateLimit",
  },

  user: {
    deleteUser: {
      enabled: true,
    },
    changeEmail: {
      enabled: true,

      sendChangeEmailVerification: async ({ newEmail, url, user }) => {
        await sendEmailAction({
          to: newEmail,
          subject: "Verify your new email address - aris.sh",
          react: ChangeEmailTemplate({
            userName: user.name,
            verificationUrl: String(url),
            newEmail,
          }),
        });
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },

    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Reset your password - aris.sh",
        react: PasswordResetTemplate({
          userName: user.name,
          resetUrl: String(url),
        }),
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address - aris.sh",
        react: EmailVerificationTemplate({
          userName: user.name,
          verificationUrl: String(url),
        }),
      });
    },
  },

  plugins: [
    ...(process.env.NODE_ENV === "development" ? [openAPI()] : []),

    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),

    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type SessionType = Session["session"];
export type UserType = Session["user"];
