import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-4">Hasan Shahriar Kabir</h1>
        <p className="text-2xl text-gray-700 mb-6">IP Telephony Specialist | Solution Developer</p>
        <p className="text-lg text-gray-600">
          I build scalable telephony & VoIP solutions that power nationwide infrastructure, focused on reliability, performance, and automation.
        </p>
        {/* Add a call-to-action if you like */}
      </div>
    </section>
  );
}
