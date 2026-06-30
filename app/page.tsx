import CursorGlow from "@/components/effects/CursorGlow";
import LoadingScreen from "@/components/effects/LoadingScreen";
import MouseSpotlight from "@/components/effects/MouseSpotlight";
import Aurora from "@/components/effects/Aurora";
import Particles from "@/components/effects/Particles_old";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Calibration from "@/components/sections/Calibration/Calibration";
import Forecast from "@/components/sections/Forecast/Forecast";
import Explainability from "@/components/sections/Explainability/Explainability";
import DigitalTwin from "@/components/sections/DigitalTwin/DigitalTwin";
import Architecture from "@/components/sections/Architecture/Architecture";
import Reports from "@/components/sections/Reports/Reports";
import Research from "@/components/sections/Research";

import Hero from "@/components/sections/Hero/Hero";
import Overview from "@/components/sections/Overview";
import NeuralBackground from "@/components/backgrounds/NeuralBackground";
import HUDOverlay from "@/components/effects/HUDOverlay";
import RobotAssistant from "@/components/ai/RobotAssistant";
export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <MouseSpotlight />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Aurora />
        <Particles />
      </div>

    <main className="relative overflow-x-hidden bg-[#020617] text-white">
     <HUDOverlay />
     <NeuralBackground />
    <Navbar />

    <section
  id="home"
  className="flex min-h-screen items-center justify-center pt-24"
>
  <Hero />
</section>

    <section id="overview">
      <Overview />
    </section>

    <section id="calibration">
      <Calibration />
    </section>

    <section id="forecast">
      <Forecast />
    </section>

    <section id="explainability">
      <Explainability />
    </section>

    <section id="digital-twin">
      <DigitalTwin />
    </section>

    <section id="architecture">
      <Architecture />
    </section>
 

    <section id="research">
      <Research />
    </section>

   

    <Footer />
    <RobotAssistant />

</main>
    </>
  );
}