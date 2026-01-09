import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-4 py-16">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          {/* Contingut pendent */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
