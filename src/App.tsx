import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import OpenSource from "./components/OpenSource";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-shell text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <OpenSource />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;
