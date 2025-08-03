import FooterSection from "@/components/core/footer/footer";
import Header from "@/components/core/reusable/header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <FooterSection />
    </>
  );
}
