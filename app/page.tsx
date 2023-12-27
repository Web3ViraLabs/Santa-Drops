import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/main/hero";
import Perks from "@/components/main/perks";
import OurPatners from "@/components/main/patners";
import AllBlockchains from "@/components/main/allblockchain";
import Feature1 from "@/components/features/feature1";
import Feature2 from "@/components/features/feature2";
import Feature3 from "@/components/features/feature3";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar user={user} />
      <div className="flex-grow flex-1">
        <Hero />
        <OurPatners />
        <AllBlockchains />
        <Feature1 />
        <Feature2 />
        <Feature3 />
        <Perks />
      </div>
      <Footer />
    </main>
  );
}
