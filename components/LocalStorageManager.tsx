import React, { useState, useEffect } from 'react';
import { type SavedHerencia, type Herencia, type Trait, type RuleValidation } from '../types';
import PorzuuLogo from './PorzuuLogo';

interface LocalStorageManagerProps {
  isOpen: boolean;
  onClose: () => void;
  currentHerencia: Omit<Herencia, 'traits'>;
  currentTraits: Trait[];
  totalPH: number;
  validation: RuleValidation;
  onLoadHerencia: (saved: SavedHerencia) => void;
}

const STORAGE_LIST_KEY = 'papa_saved_herencias_list';

export const LocalStorageManager: React.FC<LocalStorageManagerProps> = ({
  isOpen,
  onClose,
  currentHerencia,
  currentTraits,
  totalPH,
  validation,
  onLoadHerencia,
}) => {
  const [savedList, setSavedList] = useState<SavedHerencia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Load saved herencias from localStorage on mount & when opened
  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem(STORAGE_LIST_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setSavedList(parsed);
          }
        }
      } catch (err) {
        console.error('Error al leer herencias guardadas:', err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveCurrentToStorage = () => {
    if (!currentHerencia.name.trim()) {
      alert('Por favor ingresa un nombre para la Herencia antes de guardarla.');
      return;
    }

    const newSaved: SavedHerencia = {
      id: `herencia-${Date.now()}`,
      name: currentHerencia.name.trim(),
      description: currentHerencia.description.trim(),
      naturaleza: currentHerencia.naturaleza.trim(),
      traits: currentTraits,
      totalPH,
      updatedAt: Date.now(),
      isValid: validation.isValid,
    };

    // Check if one with identical name already exists to offer overwrite or append
    const existingIndex = savedList.findIndex(
      (item) => item.name.toLowerCase() === newSaved.name.toLowerCase()
    );

    let updatedList: SavedHerencia[];
    if (existingIndex >= 0) {
      if (confirm(`Ya existe una Herencia llamada "${newSaved.name}". ¿Deseas sobrescribirla?`)) {
        updatedList = [...savedList];
        updatedList[existingIndex] = { ...newSaved, id: savedList[existingIndex].id };
      } else {
        newSaved.name = `${newSaved.name} (Copia)`;
        updatedList = [newSaved, ...savedList];
      }
    } else {
      updatedList = [newSaved, ...savedList];
    }

    setSavedList(updatedList);
    localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(updatedList));
    setSaveSuccessMsg(`¡"${newSaved.name}" guardada correctamente!`);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`¿Eliminar definitivamente "${name}" del almacenamiento local?`)) return;

    const filtered = savedList.filter((item) => item.id !== id);
    setSavedList(filtered);
    localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(filtered));
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(savedList, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `papa_engine_herencias_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const merged = [...parsed, ...savedList].filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i
          );
          setSavedList(merged);
          localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(merged));
          alert(`Se importaron ${parsed.length} herencias con éxito.`);
        } else {
          alert('El archivo JSON no tiene un formato válido.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const filteredList = savedList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.naturaleza.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-papa-charcoal border border-papa-surface-light rounded-2xl max-w-3xl w-full flex flex-col shadow-2xl my-auto overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-5 border-b border-papa-surface-light flex items-center justify-between bg-papa-dark/90">
          <div className="flex items-center gap-3">
            <PorzuuLogo size={38} />
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                Almacenamiento Local de Herencias
              </h3>
              <p className="text-xs text-papa-sand font-semibold">
                Guarda, organiza y recupera tus creaciones en tu navegador
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-papa-gray hover:text-white p-2 rounded-lg hover:bg-papa-surface transition-colors font-bold text-xl leading-none"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        {/* Action strip: Save Current button & backup controls */}
        <div className="p-4 bg-papa-surface/60 border-b border-papa-surface-light flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={saveCurrentToStorage}
            className="px-4 py-2 rounded-xl bg-papa-sand text-papa-dark font-extrabold text-xs sm:text-sm hover:bg-papa-sand-hover transition-all flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>Guardar Herencia Actual</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleExportJSON}
              disabled={savedList.length === 0}
              className="px-3 py-1.5 rounded-lg bg-papa-dark hover:bg-papa-surface text-gray-200 border border-papa-surface-light disabled:opacity-50 transition-colors flex items-center gap-1.5"
              title="Descargar copia de seguridad en JSON"
            >
              <span>Exportar Backup (JSON)</span>
            </button>

            <label className="px-3 py-1.5 rounded-lg bg-papa-dark hover:bg-papa-surface text-gray-200 border border-papa-surface-light cursor-pointer transition-colors flex items-center gap-1.5">
              <span>Importar JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="mx-4 mt-3 p-2.5 rounded-lg bg-green-950/60 border border-green-800 text-green-300 text-xs flex items-center gap-2 animate-fadeIn">
            <span>✓</span>
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[55vh] space-y-4">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar entre tus herencias guardadas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-papa-dark border border-papa-surface-light rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-papa-gray focus:outline-none focus:border-papa-sand"
            />
            <svg className="w-3.5 h-3.5 text-papa-gray absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {savedList.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-papa-gray/30 rounded-xl bg-papa-surface/20">
              <svg className="w-12 h-12 mx-auto text-papa-gray/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <h4 className="text-sm font-semibold text-gray-300">No tienes ninguna Herencia guardada aún</h4>
              <p className="text-xs text-papa-gray mt-1 max-w-sm mx-auto">
                Diseña tu linaje biológico en el creador y haz clic en "Guardar Herencia Actual" para almacenarla aquí para futuras sesiones.
              </p>
            </div>
          ) : filteredList.length === 0 ? (
            <p className="text-center text-xs text-papa-gray py-8">
              No se encontraron herencias que coincidan con la búsqueda.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredList.map((item) => {
                const dateStr = new Date(item.updatedAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-papa-surface border border-papa-surface-light hover:border-papa-gray/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm sm:text-base text-white truncate">
                          {item.name}
                        </h4>
                        {item.naturaleza && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-papa-dark text-papa-sand border border-papa-surface-light font-medium">
                            {item.naturaleza}
                          </span>
                        )}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                            item.totalPH === 0
                              ? 'bg-green-950/60 text-green-300 border border-green-800'
                              : 'bg-papa-rose/20 text-papa-rose-light border border-papa-rose/40'
                          }`}
                        >
                          {item.totalPH > 0 ? `+${item.totalPH}` : item.totalPH} PH
                        </span>
                      </div>

                      <p className="text-xs text-papa-gray-light line-clamp-1 mb-1.5">
                        {item.description || 'Sin descripción.'}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-papa-gray">
                        <span>{item.traits.length} rasgos</span>
                        <span>•</span>
                        <span>{dateStr}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onLoadHerencia(item);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-papa-sand text-papa-dark font-bold text-xs hover:bg-papa-sand-hover transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Cargar</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-1.5 rounded-lg text-papa-gray hover:text-papa-rose hover:bg-papa-dark/60 transition-colors"
                        title="Eliminar herencia"
                        aria-label="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-papa-surface-light bg-papa-dark/80 flex items-center justify-between text-xs text-papa-gray">
          <span>{savedList.length} herencias guardadas localmente</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-papa-surface hover:bg-papa-surface-hover text-white transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalStorageManager;
