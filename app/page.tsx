import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <div id="About">
        <About />
      </div>
      <div id="Projects">
        <Projects />
      </div>
      <div id="Contact">
        <Contact />
      </div>
    </div>
  );
}