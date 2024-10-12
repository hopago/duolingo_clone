import { MobileHeader } from "@/components/MobileHeader";
import { Sidebar } from "@/components/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
