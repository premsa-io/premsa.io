import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PlaygroundPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[720px] px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Playground</h1>
          <p className="mt-2 text-sm text-muted-foreground">Contingut pendent...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaygroundPage;
