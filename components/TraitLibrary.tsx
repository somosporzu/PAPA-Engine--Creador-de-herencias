import React, { useState, useMemo, useRef } from 'react';
import { type Trait } from '../types';
import TraitCard from './TraitCard';

interface TraitLibraryProps {
  allTraits: Trait[];
  onAddTrait: (trait: Trait) => void;
  selectedTraits: Trait[];
}

type PhFilter = 'all' | 'advantages' | 'disadvantages' | 'pm1' | 'pm2' | 'pm3';
type CategoryFilter = 'all' | 'Combate' | 'Movimiento' | 'Físico' | 'Mental' | 'Social' | 'Utilidad';

const TraitLibrary: React.FC<TraitLibraryProps> = ({ allTraits, onAddTrait, selectedTraits }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [phFilter, setPhFilter] = useState<PhFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [showCustom, setShowCustom] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [customTrait, setCustomTrait] = useState<{
    name: string;
    description: string;
    ph: number;
    category: string;
  }>({
    name: '',
    description: '',
    ph: 1,
    category: 'Físico',
  });

  const categories: { label: string; value: CategoryFilter; icon: string }[] = [
    { label: 'Todas', value: 'all', icon: '✦' },
    { label: 'Combate', value: 'Combate', icon: '⚔️' },
    { label: 'Movimiento', value: 'Movimiento', icon: '⚡' },
    { label: 'Físico', value: 'Físico', icon: '🛡️' },
    { label: 'Mental', value: 'Mental', icon: '👁️' },
    { label: 'Social', value: 'Social', icon: '🗣️' },
    { label: 'Utilidad', value: 'Utilidad', icon: '🔧' },
  ];

  // Count traits per category for quick insight
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allTraits.length };
    allTraits.forEach((t) => {
      const cat = t.category || 'Físico';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [allTraits]);

  // Fast filtered traits based on name, category or description query
  const filteredTraits = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return allTraits.filter((trait) => {
      // Name & Category & Description matching
      const matchesSearch =
        !normalizedQuery ||
        trait.name.toLowerCase().includes(normalizedQuery) ||
        (trait.category && trait.category.toLowerCase().includes(normalizedQuery)) ||
        trait.description.toLowerCase().includes(normalizedQuery);

      if (!matchesSearch) return false;

      // Category filter pill matching
      if (categoryFilter !== 'all' && trait.category !== categoryFilter) {
        return false;
      }

      // PH Level Filter
      switch (phFilter) {
        case 'advantages':
          return trait.ph > 0;
        case 'disadvantages':
          return trait.ph < 0;
        case 'pm1':
          return Math.abs(trait.ph) === 1;
        case 'pm2':
          return Math.abs(trait.ph) === 2;
        case 'pm3':
          return Math.abs(trait.ph) === 3;
        case 'all':
        default:
          return true;
      }
    });
  }, [allTraits, searchTerm, phFilter, categoryFilter]);

  const handleAddCustomTrait = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTrait.name.trim() || !customTrait.description.trim()) return;

    const newTrait: Trait = {
      id: `custom-${Date.now()}`,
      name: customTrait.name.trim(),
      description: customTrait.description.trim(),
      ph: customTrait.ph,
      category: customTrait.category,
      isCustom: true,
    };

    onAddTrait(newTrait);
    setCustomTrait({ name: '', description: '', ph: 1, category: 'Físico' });
    setShowCustom(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setPhFilter('all');
    searchInputRef.current?.focus();
  };

  const traitGroups = [
    { title: 'Ventajas Mayores (+3 PH)', ph: 3, isAdv: true, headerColor: 'text-papa-sand' },
    { title: 'Ventajas Medias (+2 PH)', ph: 2, isAdv: true, headerColor: 'text-papa-sand-light' },
    { title: 'Ventajas Menores (+1 PH)', ph: 1, isAdv: true, headerColor: 'text-amber-200' },
    { title: 'Desventajas Menores (−1 PH)', ph: -1, isAdv: false, headerColor: 'text-papa-rose-light' },
    { title: 'Desventajas Medias (−2 PH)', ph: -2, isAdv: false, headerColor: 'text-papa-rose' },
    { title: 'Desventajas Mayores (−3 PH)', ph: -3, isAdv: false, headerColor: 'text-red-400' },
  ];

  const hasActiveFilters = Boolean(searchTerm.trim()) || categoryFilter !== 'all' || phFilter !== 'all';

  return (
    <aside className="bg-papa-charcoal/90 border border-papa-surface-light rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col backdrop-blur-md">
      {/* Title & Counter */}
      <div className="flex flex-wrap items-center justify-between border-b border-papa-surface-light pb-3 mb-4 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
            <span>Catálogo de Rasgos</span>
          </h2>
          <p className="text-xs text-papa-gray-light mt-0.5">
            Busca y filtra entre los 124 rasgos biológicos oficiales de PAPA Engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-papa-surface border border-papa-surface-light text-papa-sand font-bold">
            {filteredTraits.length} / {allTraits.length}
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-[11px] text-papa-rose-light hover:text-white underline font-semibold transition-colors"
              title="Restablecer todos los filtros"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* PROMINENT SEARCH BAR */}
      <div className="space-y-3 mb-4">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-papa-sand pointer-events-none flex items-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar por nombre (ej: Alas, Garras) o categoría (ej: Combate, Movimiento)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-papa-dark border-2 border-papa-surface-light rounded-xl py-2.5 pl-11 pr-24 text-sm text-gray-100 placeholder-papa-gray focus:outline-none focus:border-papa-sand focus:ring-2 focus:ring-papa-sand/30 transition-all font-sans shadow-inner"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-xs text-papa-gray hover:text-white bg-papa-surface rounded-md transition-colors"
                aria-label="Borrar término de búsqueda"
                title="Borrar búsqueda"
              >
                ✕
              </button>
            ) : (
              <span className="hidden sm:inline-block text-[10px] text-papa-gray uppercase tracking-wider font-mono bg-papa-surface px-1.5 py-0.5 rounded border border-papa-surface-light">
                Nombre / Cat.
              </span>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER BAR */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-papa-gray-light uppercase tracking-wider flex items-center gap-1">
              <span>Filtrar por Categoría:</span>
            </span>
            {categoryFilter !== 'all' && (
              <button
                onClick={() => setCategoryFilter('all')}
                className="text-[10px] text-papa-sand hover:underline font-semibold"
              >
                Ver todas las categorías
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isSelected = categoryFilter === cat.value;
              const count = categoryCounts[cat.value] || 0;

              return (
                <button
                  key={cat.value}
                  onClick={() => setCategoryFilter(cat.value)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-papa-sand text-papa-dark border-papa-sand shadow-sm'
                      : 'bg-papa-surface/80 text-gray-300 border-papa-surface-light hover:bg-papa-surface hover:text-white hover:border-papa-gray'
                  }`}
                >
                  <span className="text-[11px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1 rounded ${
                      isSelected ? 'bg-papa-dark/30 text-papa-dark' : 'text-papa-gray'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PH LEVEL FILTER BUTTONS */}
        <div className="pt-2 border-t border-papa-surface-light/60">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-papa-gray-light uppercase tracking-wider mr-1">
              Puntos:
            </span>
            {[
              { label: 'Todos los PH', value: 'all' as PhFilter },
              { label: 'Solo Ventajas (+)', value: 'advantages' as PhFilter },
              { label: 'Solo Desventajas (−)', value: 'disadvantages' as PhFilter },
              { label: '±1 Menores', value: 'pm1' as PhFilter },
              { label: '±2 Medios', value: 'pm2' as PhFilter },
              { label: '±3 Mayores', value: 'pm3' as PhFilter },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setPhFilter(f.value)}
                className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-md transition-all ${
                  phFilter === f.value
                    ? 'bg-papa-rose text-white shadow-sm font-bold'
                    : 'bg-papa-dark/70 text-papa-gray hover:text-gray-200 border border-papa-surface-light hover:bg-papa-surface'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Trait Toggle Button */}
      <button
        onClick={() => setShowCustom(!showCustom)}
        className="w-full mb-4 py-2 px-3 rounded-xl text-xs font-semibold border border-dashed border-papa-gray/50 hover:border-papa-sand text-papa-gray-light hover:text-papa-sand transition-all flex items-center justify-center gap-2 bg-papa-surface/40 hover:bg-papa-surface"
      >
        <span>{showCustom ? '▲ Ocultar Creador de Rasgos' : '✦ Crear Rasgo Casero / Personalizado'}</span>
      </button>

      {/* Custom Trait Form */}
      {showCustom && (
        <form onSubmit={handleAddCustomTrait} className="bg-papa-surface p-4 rounded-xl border border-papa-sand/30 mb-4 space-y-3 animate-fadeIn">
          <h4 className="text-xs font-bold text-papa-sand uppercase tracking-wider">Nuevo Rasgo Biológico</h4>
          <input
            type="text"
            placeholder="Nombre del Rasgo (ej: Mandíbula Trituradora)"
            value={customTrait.name}
            onChange={(e) => setCustomTrait({ ...customTrait, name: e.target.value })}
            required
            className="w-full bg-papa-dark border border-papa-surface-light rounded-lg p-2 text-xs text-white placeholder-papa-gray focus:outline-none focus:border-papa-sand"
          />
          <textarea
            placeholder="Efecto mecánico directo, cuándo aplica, límites..."
            value={customTrait.description}
            onChange={(e) => setCustomTrait({ ...customTrait, description: e.target.value })}
            required
            rows={2}
            className="w-full bg-papa-dark border border-papa-surface-light rounded-lg p-2 text-xs text-white placeholder-papa-gray focus:outline-none focus:border-papa-sand"
          />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block text-papa-gray text-[10px] mb-1 font-semibold">Valor en PH (±1, ±2, ±3):</label>
              <select
                value={customTrait.ph}
                onChange={(e) => setCustomTrait({ ...customTrait, ph: parseInt(e.target.value, 10) })}
                className="w-full bg-papa-dark border border-papa-surface-light rounded-lg p-2 text-white text-xs focus:outline-none"
              >
                <option value={3}>+3 PH (Ventaja Mayor)</option>
                <option value={2}>+2 PH (Ventaja Media)</option>
                <option value={1}>+1 PH (Ventaja Menor)</option>
                <option value={-1}>−1 PH (Desventaja Menor)</option>
                <option value={-2}>−2 PH (Desventaja Media)</option>
                <option value={-3}>−3 PH (Desventaja Mayor)</option>
              </select>
            </div>
            <div>
              <label className="block text-papa-gray text-[10px] mb-1 font-semibold">Categoría:</label>
              <select
                value={customTrait.category}
                onChange={(e) => setCustomTrait({ ...customTrait, category: e.target.value })}
                className="w-full bg-papa-dark border border-papa-surface-light rounded-lg p-2 text-white text-xs focus:outline-none"
              >
                <option value="Combate">Combate</option>
                <option value="Movimiento">Movimiento</option>
                <option value="Físico">Físico</option>
                <option value="Mental">Mental</option>
                <option value="Social">Social</option>
                <option value="Utilidad">Utilidad</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-papa-sand text-papa-dark hover:bg-papa-sand-hover font-bold py-2 px-3 rounded-lg text-xs transition-colors"
          >
            Añadir Rasgo Personalizado
          </button>
        </form>
      )}

      {/* Trait list grouped by PH level */}
      <div className="flex-1 overflow-y-auto max-h-[62vh] pr-1.5 space-y-6">
        {traitGroups.map((group) => {
          const groupTraits = filteredTraits.filter((t) => t.ph === group.ph);
          if (groupTraits.length === 0) return null;

          return (
            <div key={group.ph} className="space-y-3">
              <div className="flex items-center justify-between sticky top-0 bg-papa-charcoal/95 backdrop-blur py-1.5 z-10 border-b border-papa-surface-light">
                <h3 className={`text-sm font-bold tracking-tight ${group.headerColor} flex items-center gap-2`}>
                  <span className={`w-2 h-2 rounded-full ${group.isAdv ? 'bg-papa-sand' : 'bg-papa-rose'}`} />
                  {group.title}
                </h3>
                <span className="text-[11px] font-mono text-papa-gray font-semibold">
                  ({groupTraits.length})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {groupTraits.map((trait) => (
                  <TraitCard
                    key={trait.id}
                    trait={trait}
                    onAddTrait={onAddTrait}
                    isAdded={selectedTraits.some((st) => st.id === trait.id)}
                    searchTerm={searchTerm}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filteredTraits.length === 0 && (
          <div className="text-center py-12 px-4 border border-dashed border-papa-surface-light rounded-2xl bg-papa-surface/20">
            <svg className="w-12 h-12 mx-auto mb-2 text-papa-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm font-bold text-white">No se encontraron rasgos</p>
            <p className="text-xs text-papa-gray-light mt-1 max-w-xs mx-auto">
              No hay rasgos que coincidan con "{searchTerm}" {categoryFilter !== 'all' ? `en la categoría ${categoryFilter}` : ''}.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-3 px-3 py-1.5 rounded-lg bg-papa-sand text-papa-dark font-bold text-xs hover:bg-papa-sand-hover transition-colors shadow-sm"
            >
              Restablecer filtros y ver todos
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default TraitLibrary;
