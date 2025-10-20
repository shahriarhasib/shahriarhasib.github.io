import React from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 bg-white shadow z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold">HSK</a>
        <ul className="flex space-x-6">
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
