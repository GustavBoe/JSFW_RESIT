import { Outlet } from "react-router-dom";
import Footer from "@/features/components/Footer";
import Header from "@/features/components/Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className=" bg-background flex-1 flex flex-col items-center min-h-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
