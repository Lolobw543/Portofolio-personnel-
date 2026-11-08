import IntroLoader from "@/components/layout/IntroLoader";
import Navbar from "@/components/layout/Navbar";
import CinematicPlayerBar from "@/components/layout/CinematicPlayerBar";
import FlightTraceRedThread from "@/components/common/FlightTraceRedThread";

import Act0Opening from "@/components/sections/story/Act0Opening";
import Act1Sky from "@/components/sections/story/Act1Sky";
import Act2Code from "@/components/sections/story/Act2Code";
import Act3Merge from "@/components/sections/story/Act3Merge";
import Act4Build from "@/components/sections/story/Act4Build";
import Act5Automate from "@/components/sections/story/Act5Automate";
import Arsenal from "@/components/sections/Arsenal";
import Act7Proofs from "@/components/sections/story/Act7Proofs";
import Act8Future from "@/components/sections/story/Act8Future";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#FAF8F5]">
      {/* Film Experience Overlays */}
      <IntroLoader />
      <Navbar />
      <FlightTraceRedThread />
      <CinematicPlayerBar />

      {/* The 9 Narrative Acts of the Film */}
      <Act0Opening />
      <Act1Sky />
      <Act2Code />
      <Act3Merge />
      <Act4Build />
      <Act5Automate />
      <Arsenal />
      <Act7Proofs />
      <Act8Future />

      <Footer />
    </main>
  );
}
