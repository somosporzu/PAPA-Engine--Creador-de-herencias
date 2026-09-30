import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { type Trait, type Herencia, type SavedHerencia, type RuleValidation } from './types';
import { ALL_TRAITS, NATURALEZAS, PRESET_HERENCIAS } from './constants';
import { generateBalancedRandomTraits } from './utils/randomTraits';
import TraitLibrary from './components/TraitLibrary';
import HerenciaBuilder from './components/HerenciaBuilder';
import Header from './components/Header';
import RulesModal from './components/RulesModal';
import HerenciaCardExport from './components/HerenciaCardExport';
import LocalStorageManager from './components/LocalStorageManager';
import PorzuuLogo from './components/PorzuuLogo';

const CURRENT_DRAFT_KEY = 'papaEngineHerenciaData_v2';
const SAVED_LIST_KEY = 'papa_saved_herencias_list';
const LEGACY_STORAGE_KEY = 'herenciaCreatorData';

const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(CURRENT_DRAFT_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);

      // Sanitize traits to match current trait library
      const sanitizedTraits = (parsed.selectedTraits || [])
        .map((savedTrait: any) => {
          const officialTrait = ALL_TRAITS.find((t) => t.id === savedTrait.id);
          if (officialTrait) return officialTrait;

          return {
            id: savedTrait.id,
            name: savedTrait.name,
            description: savedTrait.description,
            ph: savedTrait.ph,
            category: savedTrait.category || 'General',
            isCustom: savedTrait.isCustom || undefined,
          };
        })
        .filter(
          (trait: Trait) =>
            typeof trait.id === 'string' &&
            typeof trait.name === 'string' &&
            typeof trait.description === 'string' &&
            typeof trait.ph === 'number'
        );

      return {
        initialHerencia: parsed.herencia || { name: '', description: '', naturaleza: '' },
        initialTraits: sanitizedTraits,
      };
    }
  } catch (error) {
    console.error('Error al cargar datos de almacenamiento:', error);
  }

  // Default clean state
  return {
    initialHerencia: { name: '', description: '', naturaleza: '' },
    initialTraits: [],
  };
};

const App: React.FC = () => {
  const { initialHerencia, initialTraits } = getInitialState();
  const [herencia, setHerencia] = useState<Omit<Herencia, 'traits'>>(initialHerencia);
  const [selectedTraits, setSelectedTraits] = useState<Trait[]>(initialTraits);
  
  // Modals state
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);

  // Auto-save current working draft to Local Storage
  useEffect(() => {
    const dataToSave = {
      herencia,
      selectedTraits,
    };
    localStorage.setItem(CURRENT_DRAFT_KEY, JSON.stringify(dataToSave));
  }, [herencia, selectedTraits]);

  const totalPH = useMemo(() => {
    return selectedTraits.reduce((sum, trait) => sum + trait.ph, 0);
  }, [selectedTraits]);

  // Overall rule validation
  const validation: RuleValidation = useMemo(() => {
    const hasDisadvantage = selectedTraits.some((t) => t.ph < 0);
    const traitCount = selectedTraits.length;
    const isBalanced = totalPH === 0;
    const isTraitCountValid = traitCount >= 2 && traitCount <= 9;
    const hasNameAndNaturaleza = Boolean(herencia.name.trim() && herencia.naturaleza.trim());

    const prerequisiteIssues: string[] = [];
    const traitIds = new Set(selectedTraits.map((t) => t.id));

    if (traitIds.has('vuelo-real') && !traitIds.has('alas')) {
      prerequisiteIssues.push('Vuelo Real (+3 PH) exige el rasgo Alas (+1 PH).');
    }

    if (
      traitIds.has('miembros-elasticos') &&
      !traitIds.has('armas-naturales-debiles') &&
      !traitIds.has('arma-natural-potente') &&
      !traitIds.has('garras-retractiles')
    ) {
      prerequisiteIssues.push('Miembros Elásticos (+2 PH) exige tener un arma natural.');
    }

    const incompatibilityIssues: string[] = [];
    if (traitIds.has('movimiento-lento')) {
      if (traitIds.has('velocidad-mejorada')) {
        incompatibilityIssues.push('Movimiento Lento es incompatible con Velocidad Mejorada.');
      }
      if (traitIds.has('arranque-forzado')) {
        incompatibilityIssues.push('Movimiento Lento es incompatible con Arranque Forzado.');
      }
    }

    const isValid =
      isBalanced &&
      isTraitCountValid &&
      hasDisadvantage &&
      hasNameAndNaturaleza &&
      prerequisiteIssues.length === 0 &&
      incompatibilityIssues.length === 0;

    return {
      isValid,
      isBalanced,
      isTraitCountValid,
      hasDisadvantage,
      hasNameAndNaturaleza,
      prerequisiteIssues,
      incompatibilityIssues,
    };
  }, [selectedTraits, totalPH, herencia.name, herencia.naturaleza]);

  const addTrait = useCallback((trait: Trait) => {
    setSelectedTraits((prev) => {
      if (prev.some((t) => t.id === trait.id) && !trait.isCustom) {
        return prev;
      }
      return [...prev, trait];
    });
  }, []);

  const removeTrait = useCallback((traitId: string) => {
    setSelectedTraits((prev) => prev.filter((trait) => trait.id !== traitId));
  }, []);

  const handleHerenciaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setHerencia((prev) => ({ ...prev, [name]: value }));
  };

  const resetBuilder = () => {
    setHerencia({ name: '', description: '', naturaleza: '' });
    setSelectedTraits([]);
    localStorage.removeItem(CURRENT_DRAFT_KEY);
  };

  const loadFromStorage = useCallback(() => {
    const { initialHerencia, initialTraits } = getInitialState();
    setHerencia(initialHerencia);
    setSelectedTraits(initialTraits);
  }, []);

  const loadPreset = useCallback((presetIdx: number) => {
    const preset = PRESET_HERENCIAS[presetIdx];
    if (!preset) return;

    const traits = preset.traitIds
      .map((id) => ALL_TRAITS.find((t) => t.id === id))
      .filter((t): t is Trait => Boolean(t));

    setHerencia({
      name: preset.name,
      naturaleza: preset.naturaleza,
      description: preset.description,
    });
    setSelectedTraits(traits);
  }, []);

  // Generate random balanced traits without modifying name, description or naturaleza
  const handleGenerateRandomTraits = useCallback(() => {
    const randomTraits = generateBalancedRandomTraits(ALL_TRAITS);
    setSelectedTraits(randomTraits);
  }, []);

  // Quick save current into saved herencias list
  const handleQuickSave = useCallback(() => {
    const name = herencia.name.trim() || 'Herencia Sin Nombre';
    const newSaved: SavedHerencia = {
      id: `herencia-${Date.now()}`,
      name,
      description: herencia.description.trim(),
      naturaleza: herencia.naturaleza.trim(),
      traits: selectedTraits,
      totalPH,
      updatedAt: Date.now(),
      isValid: validation.isValid,
    };

    try {
      const raw = localStorage.getItem(SAVED_LIST_KEY);
      const list: SavedHerencia[] = raw ? JSON.parse(raw) : [];
      const updatedList = [newSaved, ...list.filter((item) => item.id !== newSaved.id)];
      localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error al guardar en almacenamiento local:', e);
    }
  }, [herencia, selectedTraits, totalPH, validation.isValid]);

  // Load a full saved herencia from Local Storage manager
  const handleLoadSavedHerencia = useCallback((saved: SavedHerencia) => {
    setHerencia({
      name: saved.name,
      description: saved.description,
      naturaleza: saved.naturaleza,
    });
    setSelectedTraits(saved.traits || []);
  }, []);

  return (
    <div className="min-h-screen bg-papa-dark text-gray-100 p-4 sm:p-6 lg:p-8 relative selection:bg-papa-sand selection:text-papa-dark">
      {/* Floating Corner Mascot & Quick Access in top-right */}
      <div className="fixed top-3 right-4 z-40 hidden sm:flex items-center gap-2 bg-papa-charcoal/90 border border-papa-surface-light px-3 py-1.5 rounded-full shadow-lg backdrop-blur">
        <PorzuuLogo size={24} />
        <span className="text-[11px] font-bold text-papa-sand uppercase tracking-wider">
          PAPA Engine
        </span>
        <span className="text-papa-gray-dark">|</span>
        <button
          onClick={() => setIsStorageModalOpen(true)}
          className="text-[11px] text-papa-gray-light hover:text-papa-sand transition-colors font-semibold"
          title="Ver tus herencias guardadas"
        >
          Mis Herencias
        </button>
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Header with Porzuu Logo in the corner */}
        <Header
          onOpenRulesModal={() => setIsRulesModalOpen(true)}
          onOpenStorageManager={() => setIsStorageModalOpen(true)}
        />

        {/* Biological Details Card */}
        <div className="bg-papa-charcoal/90 border border-papa-surface-light shadow-2xl rounded-2xl p-5 sm:p-6 mb-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-papa-surface-light mb-4 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
                <span>Ficha Biológica de la Herencia</span>
              </h2>
              <p className="text-xs text-papa-gray-light">
                Define el origen fisiológico e instintivo de la especie.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsStorageModalOpen(true)}
                className="text-xs text-papa-sand bg-papa-dark/80 hover:bg-papa-surface px-3 py-1 rounded-lg border border-papa-surface-light font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>📂</span>
                <span>Almacenamiento Local</span>
              </button>
              <div className="text-xs text-papa-sand font-semibold bg-papa-dark/60 px-3 py-1 rounded-lg border border-papa-surface-light">
                1 Naturaleza Gratuita (0 PH)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-semibold text-papa-gray-light uppercase tracking-wider mb-1.5">
                Nombre de la Herencia / Linaje:
              </label>
              <input
                type="text"
                name="name"
                placeholder="Ej: Quiróptero de las Simas, Saurio Abisal, Nómada de las Nieves..."
                value={herencia.name}
                onChange={handleHerenciaChange}
                className="w-full bg-papa-dark border border-papa-surface-light rounded-xl p-3 text-sm text-white placeholder-papa-gray focus:ring-2 focus:ring-papa-sand focus:border-papa-sand focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-papa-gray-light uppercase tracking-wider mb-1.5">
                Naturaleza Gratuita (Instinto / Temperamento):
              </label>
              <select
                name="naturaleza"
                value={herencia.naturaleza}
                onChange={handleHerenciaChange}
                className="w-full bg-papa-dark border border-papa-surface-light rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-papa-sand focus:border-papa-sand focus:outline-none transition-all"
              >
                <option value="">Selecciona una Naturaleza gratuita...</option>
                {NATURALEZAS.map((nat) => (
                  <option key={nat} value={nat}>
                    {nat}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-papa-gray-light uppercase tracking-wider mb-1.5">
                Descripción, Fisiología y Concepto Biológico:
              </label>
              <textarea
                name="description"
                placeholder="Describe su aspecto físico, sentidos, órganos peculiares, adaptación al hábitat, instintos primarios o limitaciones de nacimiento..."
                value={herencia.description}
                onChange={handleHerenciaChange}
                rows={3}
                className="w-full bg-papa-dark border border-papa-surface-light rounded-xl p-3 text-sm text-white placeholder-papa-gray focus:ring-2 focus:ring-papa-sand focus:border-papa-sand focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Main Grid: Trait Library on the left, Builder on the right */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <TraitLibrary
            allTraits={ALL_TRAITS}
            onAddTrait={addTrait}
            selectedTraits={selectedTraits}
          />

          <HerenciaBuilder
            herencia={herencia}
            selectedTraits={selectedTraits}
            totalPH={totalPH}
            onRemoveTrait={removeTrait}
            onReset={resetBuilder}
            onLoadFromStorage={loadFromStorage}
            onLoadPreset={loadPreset}
            onOpenImageExport={() => setIsImageModalOpen(true)}
            onOpenStorageManager={() => setIsStorageModalOpen(true)}
            onQuickSave={handleQuickSave}
            onGenerateRandomTraits={handleGenerateRandomTraits}
          />
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-papa-gray pb-6 border-t border-papa-surface-light/40 pt-6">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <PorzuuLogo size={20} />
            <span className="font-bold text-papa-sand font-display">PAPA Engine</span>
            <span>— Sistema de Creación de Herencias</span>
          </div>
          <p className="text-papa-gray-light">
            Reglas de Puntos de Herencia (PH) • Balance obligatorio a 0 PH • 2 a 9 rasgos • 124 rasgos biológicos base.
          </p>
        </footer>
      </div>

      {/* Rules Modal */}
      <RulesModal isOpen={isRulesModalOpen} onClose={() => setIsRulesModalOpen(false)} />

      {/* Download As Image (PNG) Modal */}
      <HerenciaCardExport
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        herencia={herencia}
        selectedTraits={selectedTraits}
        totalPH={totalPH}
        validation={validation}
      />

      {/* Local Storage Manager Modal */}
      <LocalStorageManager
        isOpen={isStorageModalOpen}
        onClose={() => setIsStorageModalOpen(false)}
        currentHerencia={herencia}
        currentTraits={selectedTraits}
        totalPH={totalPH}
        validation={validation}
        onLoadHerencia={handleLoadSavedHerencia}
      />
    </div>
  );
};

export default App;
