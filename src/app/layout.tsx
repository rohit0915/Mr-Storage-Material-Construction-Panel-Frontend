import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#E5ECFF]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="px-8 py-6 h-[calc(100vh-81px)] overflow-auto scroll-hide">{children}</main>
      </div>
    </div>
  );
}
