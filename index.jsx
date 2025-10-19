import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="text-gray-900 bg-white font-sans antialiased">
      <Navbar />
      <main className="mt-16">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="text-center py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Hasan Shahriar Kabir — Built with ❤️
      </footer>
    </div>
  );
}

export default App;
