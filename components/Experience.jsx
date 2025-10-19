import React from 'react';

const timeline = [
  {
    year: '2010 – Present',
    role: 'Manager, IP Telephony Dept., BEXIMCO IT Division',
    description: 'Leading nationwide IP telephony service and managing advanced VoIP infrastructure.',
    bullets: [
      'Soft-switch and media gateways administration, session analysis and debugging.',
      'Network planning, quality and least-cost call routing.',
      'Rate & number planning, IP routing & firewall administration.',
      'Supervision of 13-site clustered IP PABX network of BEXIMCO group.',
    ],
  },
  {
    year: '2008 – 2010',
    role: 'Assistant Manager, Telecom & Networking, Communications Technology Ltd.',
    description: 'Handled unified communications platforms and enterprise integration for clients.',
    bullets: [
      'Installation & configuration of unified communication systems.',
      'Troubleshooting soft-switches and TDM/IP integration.',
      'Government telephony tenders and project management.',
    ],
  },
  // add more entries as needed …
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
        <div className="relative border-l-2 border-blue-500 pl-8">
          {timeline.map((item, idx) => (
            <div key={idx} className="mb-12 relative">
              <div className="absolute -left-4 top-2 w-8 h-8 bg-white border-2 border-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-400">{item.year}</p>
              <h3 className="text-xl font-semibold mt-1">{item.role}</h3>
              <p className="text-lg text-gray-600 mt-2">{item.description}</p>
              <ul className="mt-4 list-disc list-inside text-gray-600 space-y-1">
                {item.bullets.map((bt, bIdx) => (
                  <li key={bIdx}>{bt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
