import Navbar from "@/components/Navbar";
import { Footer } from "@/components/ui/footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <main>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  );
}
