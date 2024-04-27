import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-project-primary w-full h-[40px] flex items-center justify-center text-white">
      <span className="text-black">
        Developed by{' '}
        <a
          className="text-white"
          href="https://gustavogfg.github.io/GustavoDeveloper/"
          target="_blank"
        >
          Gustavo Fernandes
        </a>
      </span>
    </footer>
  );
};
