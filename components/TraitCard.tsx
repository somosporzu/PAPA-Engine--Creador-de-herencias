import React from 'react';
import { type Trait } from '../types';

interface TraitCardProps {
  trait: Trait;
  onAddTrait: (trait: Trait) => void;
  isAdded?: boolean;
  searchTerm?: string;
}

const highlightMatch = (text: string, query?: string) => {
  if (!query || !query.trim()) return text;
  const q = query.trim();
  const index = text.toLowerCase().indexOf(q.toLowerCase());
  if (index === -1) return text;

  const before = text.substring(0, index);
  const match = text.substring(index, index + q.length);
  const after = text.substring(index + q.length);

  return (
    <>
      {before}
      <mark className="bg-papa-sand text-papa-dark px-1 py-0.2 rounded font-extrabold shadow-sm">
        {match}
      </mark>
      {after}
    </>
  );
};

const TraitCard: React.FC<TraitCardProps> = ({
  trait,
  onAddTrait,
  isAdded = false,
  searchTerm = '',
}) => {
  const isAdvantage = trait.ph > 0;
  const phSign = isAdvantage ? '+' : '';

  // Category badge colors
  const getCategoryColor = (cat?: string) => {
    switch (cat) {
      case 'Combate':
        return 'text-red-300 bg-red-950/40 border-red-800/40';
      case 'Movimiento':
        return 'text-cyan-300 bg-cyan-950/40 border-cyan-800/40';
      case 'Mental':
        return 'text-indigo-300 bg-indigo-950/40 border-indigo-800/40';
      case 'Social':
        return 'text-amber-200 bg-amber-950/40 border-amber-800/40';
      case 'Utilidad':
        return 'text-emerald-300 bg-emerald-950/40 border-emerald-800/40';
      case 'Físico':
      default:
        return 'text-gray-300 bg-papa-dark/60 border-papa-gray/30';
    }
  };

  const isCategoryMatch =
    Boolean(searchTerm) &&
    trait.category &&
    trait.category.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div
      className={`relative p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
        isAdded
          ? 'bg-papa-surface/40 border-papa-gray/30 opacity-70'
          : 'bg-papa-surface border-papa-surface-light hover:border-papa-gray hover:shadow-lg'
      }`}
    >
      <div>
        {/* Header row: Name, Category, and PH Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h4 className="font-bold text-base text-white tracking-tight leading-snug">
              {highlightMatch(trait.name, searchTerm)}
            </h4>
            {trait.category && (
              <span
                className={`inline-block text-[11px] font-medium px-2 py-0.5 mt-1 rounded-md border transition-all ${
                  isCategoryMatch
                    ? 'ring-2 ring-papa-sand font-bold'
                    : ''
                } ${getCategoryColor(trait.category)}`}
              >
                {trait.category}
              </span>
            )}
          </div>

          <span
            className={`shrink-0 font-extrabold text-sm px-2.5 py-1 rounded-lg border font-mono ${
              isAdvantage
                ? 'bg-papa-sand/15 text-papa-sand border-papa-sand/40'
                : 'bg-papa-rose/15 text-papa-rose-light border-papa-rose/40'
            }`}
          >
            {phSign}{trait.ph} PH
          </span>
        </div>

        {/* Description with highlighting */}
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-2">
          {highlightMatch(trait.description, searchTerm)}
        </p>

        {/* Prerequisites or incompatibilities badges if any */}
        {trait.prerequisites && trait.prerequisites.length > 0 && (
          <div className="mt-2.5 p-1.5 rounded-md bg-papa-dark/60 border border-papa-sand/30 text-[11px] text-papa-sand-light flex items-center gap-1.5">
            <span className="font-semibold text-papa-sand">Prerrequisito:</span>
            <span>{trait.prerequisites.join(', ')}</span>
          </div>
        )}

        {trait.incompatibleWith && trait.incompatibleWith.length > 0 && (
          <div className="mt-2.5 p-1.5 rounded-md bg-papa-dark/60 border border-papa-rose/30 text-[11px] text-papa-rose-light flex items-center gap-1.5">
            <span className="font-semibold text-papa-rose">Incompatible con:</span>
            <span>{trait.incompatibleWith.map((i) => i.replace(/-/g, ' ')).join(', ')}</span>
          </div>
        )}
      </div>

      {/* Action button */}
      <button
        onClick={() => onAddTrait(trait)}
        disabled={isAdded}
        aria-label={`Añadir rasgo ${trait.name}`}
        className={`mt-4 w-full font-bold py-2 px-3 rounded-lg text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
          isAdded
            ? 'bg-papa-dark text-papa-gray border border-papa-surface-light cursor-not-allowed'
            : isAdvantage
            ? 'bg-papa-sand text-papa-dark hover:bg-papa-sand-hover shadow-sm active:scale-98'
            : 'bg-papa-rose text-white hover:bg-papa-rose-hover shadow-sm active:scale-98'
        }`}
      >
        {isAdded ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>Seleccionado</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Añadir a Herencia</span>
          </>
        )}
      </button>
    </div>
  );
};

export default TraitCard;
