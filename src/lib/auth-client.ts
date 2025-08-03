import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

import { getBaseUrl } from "@/lib/utils";

const CONFIG = {
  baseURL: getBaseUrl(),

  /* plugins: [], */

  fetchOptions: {
    onError: async (context: { response: Response }) => {
      const { response } = context;

      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        toast.error(`Please try again after ${retryAfter} seconds.`);
      }
    },
  },
};

export const authClient = createAuthClient(CONFIG);

export const { signOut, useSession, getSession } = authClient;
