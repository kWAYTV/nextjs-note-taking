import { UserButton } from "@daveyplate/better-auth-ui";
import { PanelsLeftBottom } from "lucide-react";

export const SharedUserButton = () => {
  return (
    <UserButton
      size="icon"
      additionalLinks={[
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <PanelsLeftBottom />,
          signedIn: true,
        },
      ]}
    />
  );
};
