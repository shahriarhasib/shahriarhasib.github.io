import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
        <p className="text-lg text-gray-600 mb-8">
          I’m currently looking for new opportunities in IP telephony, VoIP infrastructure and systems integration. Let’s connect.
        </p>
        <p className="text-lg text-gray-700">
          📧 <a href="mailto:emailofshahriar@gmail.com" className="text-blue-500 hover:underline">emailofshahriar@gmail.com</a><br/>
          📞 +880 1755 533 331<br/>
          🌐 <a href="https://callblaster.bol-online.com" className="text-blue-500 hover:underline">callblaster.bol-online.com</a>
        </p>
        {/* Optionally add a contact form here */}
      </div>
    </section>
  );
}
