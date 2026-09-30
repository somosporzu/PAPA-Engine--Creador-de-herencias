import React from 'react';
import PorzuuLogo from './PorzuuLogo';

interface HeaderProps {
  onOpenRulesModal?: () => void;
  onOpenStorageManager?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenRulesModal, onOpenStorageManager }) => {
  return (
    <header className="relative bg-papa-charcoal/90 border border-papa-surface-light/80 shadow-2xl rounded-2xl p-5 sm:p-6 mb-8 overflow-hidden backdrop-blur-md">
      {/* Decorative corner accent using the palette rose and sand */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-papa-rose/20 via-papa-sand/10 to-transparent pointer-events-none rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-papa-sand/15 to-transparent pointer-events-none rounded-bl-2xl" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left side: Corner Logo and Title */}
        <div className="flex items-center gap-4 text-center md:text-left">
          {/* Logo prominently in the corner */}
          <div className="relative group shrink-0">
            <PorzuuLogo size={68} showBadge={true} className="filter drop-shadow-lg" />
            <div className="absolute -inset-1 rounded-full bg-papa-magenta/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-papa-surface border border-papa-gray/30 text-papa-sand mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-papa-rose animate-pulse" />
              PAPA Engine RPG
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
              Creador de <span className="text-papa-sand">Herencias</span>
            </h1>
            <p className="mt-1 text-sm sm:text-base text-papa-gray-light max-w-xl">
              Diseña linajes biológicos equilibrados para <strong className="text-papa-sand font-bold">PAPA Engine</strong>.
              El total debe cerrar exactamente en <span className="text-white font-semibold underline decoration-papa-sand underline-offset-2">0 PH</span>.
            </p>
          </div>
        </div>

        {/* Right side: Core Rules summary pills and info buttons */}
        <div className="flex flex-wrap md:flex-col lg:flex-row items-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-2 bg-papa-dark/80 border border-papa-surface-light px-3 py-1.5 rounded-lg text-gray-300">
            <span className="w-2 h-2 rounded-full bg-papa-sand" />
            <span>Balance: <strong className="text-white">0 PH</strong></span>
          </div>

          <div className="flex items-center gap-2 bg-papa-dark/80 border border-papa-surface-light px-3 py-1.5 rounded-lg text-gray-300">
            <span className="w-2 h-2 rounded-full bg-papa-rose" />
            <span>Rasgos: <strong className="text-white">2 a 9</strong></span>
          </div>

          <div className="flex items-center gap-2 bg-papa-dark/80 border border-papa-surface-light px-3 py-1.5 rounded-lg text-gray-300">
            <span className="w-2 h-2 rounded-full bg-papa-gray" />
            <span>1+ Desventaja</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenStorageManager && (
              <button
                onClick={onOpenStorageManager}
                className="px-3 py-1.5 rounded-lg font-medium text-papa-sand bg-papa-dark hover:bg-papa-surface border border-papa-sand/30 transition-colors shadow-sm flex items-center gap-1.5"
                title="Abrir almacenamiento local de herencias"
              >
                <svg className="w-3.5 h-3.5 text-papa-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Guardadas</span>
              </button>
            )}

            {onOpenRulesModal && (
              <button
                onClick={onOpenRulesModal}
                className="px-3 py-1.5 rounded-lg font-bold text-papa-dark bg-papa-sand hover:bg-papa-sand-hover transition-colors shadow-sm flex items-center gap-1.5"
                title="Consultar resumen del reglamento"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Reglas</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
