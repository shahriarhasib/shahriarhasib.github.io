import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          With over 15 years of experience in IP telephony, unified communications, and large scale VoIP and networking deployments, I’ve led projects across enterprise and national infrastructure at companies like BEXIMCO IT Division and Communications Technology Ltd. I’m passionate about designing resilient architectures, automating operations and delivering high-quality solutions.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Outside of work I enjoy learning about new telecommunication technologies, mentoring junior engineers, and exploring network automation.
        </p>
      </div>
    </section>
  );
}
