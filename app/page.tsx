import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-900 text-slate-900 dark:text-white transition-colors duration-300">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
