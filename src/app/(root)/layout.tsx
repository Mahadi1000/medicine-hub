import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import CategorySidebar from "./_components/category-sidebar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh-30px)]">
      <Navbar />

      <div className="grid h-[100vh] pt-20 grid-cols-12 px-5">
        <div className="col-span-3  h-[calc(100vh-150px)] rounded-t-2xl flex justify-center overflow-y-auto bg-slate-100/80 ">
          <CategorySidebar />
        </div>
        <main className="col-span-9">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
