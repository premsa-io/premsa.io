import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <h1 className="font-heading text-3xl font-bold text-primary-900">Registrar-se</h1>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
