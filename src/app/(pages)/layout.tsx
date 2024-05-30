import Footer from "@/frontend/components/home/footer";
import Navbar from "@/frontend/components/home/navbar";

export default ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-primary-950 items-center min-h-screen pt-40">
        {children}
      </div>
      <Footer />
    </>
  );
};
