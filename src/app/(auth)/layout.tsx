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
      <main className="py-16 md:py-24">
        <div className="mx-auto max-w-lg px-6">
          <div className="flex justify-center">{children}</div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
