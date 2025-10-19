import React from 'react';

const projects = [
  {
    year: '2019',
    title: 'Call Blaster & IVR Blaster Solutions',
    description: 'Developed scalable over-the-phone telemarketing and IVR systems, with real-time dashboards and multi-campaign management.',
    link: '#', // add actual link if available
  },
  {
    year: '2018',
    title: 'MNP Fetching System Integration',
    description: 'Integrated Mobile Number Portability system with national‐level soft-switch infrastructure for regulatory compliance and routing automation.',
    link: '#',
  },
  // add more projects as needed …
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Projects</h2>
        <div className="grid gap-12">
          {projects.map((proj, idx) => (
            <div key={idx} className="space-y-4">
              <p className="text-sm text-gray-400">{proj.year}</p>
              <h3 className="text-2xl font-semibold">{proj.title}</h3>
              <p className="text-lg text-gray-600">{proj.description}</p>
              <a href={proj.link} className="text-blue-500 hover:underline">View Project →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
