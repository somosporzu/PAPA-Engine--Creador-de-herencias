import React from 'react';

interface PorzuuLogoProps {
  className?: string;
  size?: number;
  showBadge?: boolean;
}

/**
 * Mascot Logo component for PAPA Engine ("Porzuu")
 * Faithfully matches the uploaded Porzuu (1).png:
 * - Magenta/Pink body (#DE3B74)
 * - Two vertical white oval eyes
 * - Thick white inner border
 * - Solid black outer stroke
 */
export const PorzuuLogo: React.FC<PorzuuLogoProps> = ({
  className = '',
  size = 56,
  showBadge = false,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200 hover:scale-105 drop-shadow-md"
        role="img"
        aria-label="Porzuu - Mascota de PAPA Engine"
      >
        <defs>
          <filter id="porzuu-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Group with filter */}
        <g filter="url(#porzuu-glow)">
          {/* Black Outer Layer (Sticker Border) */}
          <path
            d="M 250 48
               C 272 108, 305 142, 335 152
               C 362 102, 390 75, 402 78
               C 418 84, 442 168, 436 242
               C 455 285, 458 350, 428 412
               C 388 472, 308 482, 250 482
               C 192 482, 112 472, 72 412
               C 42 350, 45 285, 64 242
               C 58 168, 82 84, 98 78
               C 110 75, 138 102, 165 152
               C 195 142, 228 108, 250 48 Z"
            fill="#0F0F10"
          />

          {/* White Middle Border */}
          <path
            d="M 250 68
               C 270 120, 300 152, 328 162
               C 352 118, 376 96, 386 98
               C 398 104, 420 180, 415 248
               C 432 288, 435 344, 408 398
               C 372 452, 302 462, 250 462
               C 198 462, 128 452, 92 398
               C 65 344, 68 288, 85 248
               C 80 180, 102 104, 114 98
               C 124 96, 148 118, 172 162
               C 200 152, 230 120, 250 68 Z"
            fill="#FFFFFF"
          />

          {/* Pink / Magenta Inner Body */}
          <path
            d="M 250 92
               C 268 136, 294 165, 320 174
               C 342 136, 362 118, 370 120
               C 380 125, 398 194, 393 252
               C 408 290, 410 338, 386 384
               C 354 430, 294 440, 250 440
               C 206 440, 146 430, 114 384
               C 90 338, 92 290, 107 252
               C 102 194, 120 125, 130 120
               C 138 118, 158 136, 180 174
               C 206 165, 232 136, 250 92 Z"
            fill="#DE3B74"
          />

          {/* Left Eye (Vertical Oval) */}
          <ellipse cx="206" cy="305" rx="20" ry="54" fill="#FFFFFF" />

          {/* Right Eye (Vertical Oval) */}
          <ellipse cx="294" cy="305" rx="20" ry="54" fill="#FFFFFF" />
        </g>
      </svg>

      {showBadge && (
        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[9px] font-black tracking-widest uppercase rounded bg-papa-sand text-papa-dark border border-papa-dark shadow-sm">
          PAPA
        </span>
      )}
    </div>
  );
};

export default PorzuuLogo;
