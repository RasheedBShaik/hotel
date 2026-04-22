// app/page.tsx

import Hero from "./components/Hero";
import { ExperienceSection } from "./components/Experience";
import AussieBrunch from "./components/Brunch";
import Coffee from "./components/Coffee";
import StorySection from "./components/StorySection";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black antialiased">
      
      <main className="flex-1">
        <Hero />
        <ExperienceSection/>
        <AussieBrunch/>
        <Coffee/>
        <StorySection/>
        
      </main>
    </div>
  );
}