import { Button, buttonVariants } from '@/components/ui/button';

import { ModeToggle } from '@/components/mode-toggle';

import Link from 'next/link';
import Navbar from '@/components/header/Navbar';
import Footer from '@/components/footer/Footer';
import Hero from '@/components/main/hero';
import Perks from '@/components/main/perks';
import OurPatners from '@/components/main/patners';
import AllBlockchains from '@/components/main/allblockchain';

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex-1">
        <Hero />
        <OurPatners />
        <AllBlockchains />
        <Perks />
      </div>
      <Footer />
    </main>
  );
}
