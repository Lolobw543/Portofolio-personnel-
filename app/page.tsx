import IntroLoader from "@/components/layout/IntroLoader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Arsenal from "@/components/sections/Arsenal";
import Chapters from "@/components/sections/Chapters";
import ProjectsBento from "@/components/sections/ProjectsBento";
import Method from "@/components/sections/Method";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <IntroLoader />
      <Navbar />
      <Hero />
      <Manifesto />
      <Arsenal />
      <Chapters />
      <ProjectsBento />
      <Method />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
