import { UserButton } from "@daveyplate/better-auth-ui";

export const SharedUserButton = () => {
  return (
    <UserButton
      size="icon"
      /* additionalLinks={[
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <PanelsLeftBottom />,
          signedIn: true,
        },
        {
          label: "Shop",
          href: "/shop",
          icon: <ShoppingCart />,
          signedIn: true,
          separator: true,
        },
      ]} */
    />
  );
};
