import React, { useMemo, useState } from 'react';
import { type Trait, type Herencia, type RuleValidation } from '../types';
import { PAPA_CHECKLIST_QUESTIONS, PRESET_HERENCIAS } from '../constants';

interface HerenciaBuilderProps {
  herencia: Omit<Herencia, 'traits'>;
  selectedTraits: Trait[];
  totalPH: number;
  onRemoveTrait: (traitId: string) => void;
  onReset: () => void;
  onLoadFromStorage: () => void;
  onLoadPreset: (presetIndex: number) => void;
  onOpenImageExport: () => void;
  onOpenStorageManager: () => void;
  onQuickSave: () => void;
}

const HerenciaBuilder: React.FC<HerenciaBuilderProps> = ({
  herencia,
  selectedTraits,
  totalPH,
  onRemoveTrait,
  onReset,
  onLoadPreset,
  onOpenImageExport,
  onOpenStorageManager,
  onQuickSave,
}) => {
  const [showChecklist, setShowChecklist] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  // Validate all rules from the PAPA Engine official specification
  const validation: RuleValidation = useMemo(() => {
    const hasDisadvantage = selectedTraits.some((t) => t.ph < 0);
    const traitCount = selectedTraits.length;
    const isBalanced = totalPH === 0;
    const isTraitCountValid = traitCount >= 2 && traitCount <= 9;
    const hasNameAndNaturaleza = Boolean(herencia.name.trim() && herencia.naturaleza.trim());

    // Prerequisite validations
    const prerequisiteIssues: string[] = [];
    const traitIds = new Set(selectedTraits.map((t) => t.id));

    if (traitIds.has('vuelo-real') && !traitIds.has('alas')) {
      prerequisiteIssues.push('Vuelo Real (+3 PH) exige el rasgo Alas (+1 PH). Coste mínimo combinado: +4 PH.');
    }

    if (
      traitIds.has('miembros-elasticos') &&
      !traitIds.has('armas-naturales-debiles') &&
      !traitIds.has('arma-natural-potente') &&
      !traitIds.has('garras-retractiles')
    ) {
      prerequisiteIssues.push('Miembros Elásticos (+2 PH) exige tener un arma natural (Armas Naturales Débiles, Arma Natural Potente o Garras Retráctiles).');
    }

    // Incompatibility validations
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

  const generateExportText = () => {
    let content = `======================================================\n`;
    content += `        PAPA ENGINE — HOJA DE HERENCIA BIOLÓGICA      \n`;
    content += `======================================================\n\n`;

    content += `NOMBRE DE LA HERENCIA : ${herencia.name || 'Sin nombre'}\n`;
    content += `NATURALEZA GRATUITA   : ${herencia.naturaleza || 'No asignada'}\n`;
    content += `CONCEPTO Y BIOLOGÍA   :\n${herencia.description || 'Sin descripción detallada.'}\n\n`;

    content += `------------------------------------------------------\n`;
    content += `RASGOS BIOLÓGICOS (${selectedTraits.length} rasgos / Límite: 2-9):\n`;
    content += `------------------------------------------------------\n`;

    const ventajas = selectedTraits.filter((t) => t.ph > 0);
    const desventajas = selectedTraits.filter((t) => t.ph < 0);

    content += `\n[VENTAJAS] (+${ventajas.reduce((s, t) => s + t.ph, 0)} PH)\n`;
    if (ventajas.length === 0) {
      content += `  (Ninguna seleccionada)\n`;
    } else {
      ventajas.forEach((v) => {
        content += `  • ${v.name} (+${v.ph} PH) [${v.category || 'General'}]:\n    ${v.description}\n`;
      });
    }

    content += `\n[DESVENTAJAS OBLIGATORIAS] (${desventajas.reduce((s, t) => s + t.ph, 0)} PH)\n`;
    if (desventajas.length === 0) {
      content += `  (Ninguna seleccionada - ¡REQUERIDA AL MENOS 1!)\n`;
    } else {
      desventajas.forEach((d) => {
        content += `  • ${d.name} (${d.ph} PH) [${d.category || 'General'}]:\n    ${d.description}\n`;
      });
    }

    content += `\n------------------------------------------------------\n`;
    content += `RESUMEN DE REGLAS Y BALANCE:\n`;
    content += `------------------------------------------------------\n`;
    content += `• Total Puntos de Herencia (PH): ${totalPH} PH (Regla PAPA Engine: 0 PH exacto)\n`;
    content += `• Estado de Balance: ${validation.isBalanced ? '✓ EXACTO (0 PH)' : '✗ DESBALANCEADO'}\n`;
    content += `• Total de Rasgos: ${selectedTraits.length} (Regla: entre 2 y 9)\n`;
    content += `• Desventaja Mecánica: ${validation.hasDisadvantage ? '✓ CUMPLIDA' : '✗ FALTA DESVENTAJA'}\n`;
    content += `• Naturaleza Gratuita: ${herencia.naturaleza ? `✓ CUMPLIDA (${herencia.naturaleza})` : '✗ FALTA'}\n`;

    if (validation.prerequisiteIssues.length > 0) {
      content += `\n[ALERTAS DE PRERREQUISITOS]:\n`;
      validation.prerequisiteIssues.forEach((p) => {
        content += `  ! ${p}\n`;
      });
    }

    if (validation.incompatibilityIssues.length > 0) {
      content += `\n[ALERTAS DE INCOMPATIBILIDAD]:\n`;
      validation.incompatibilityIssues.forEach((i) => {
        content += `  ! ${i}\n`;
      });
    }

    content += `\n======================================================\n`;
    content += `LISTA PARA MESA DE JUEGO: ${validation.isValid ? 'SÍ (Válida en PAPA Engine)' : 'NO (Requiere corregir requisitos)'}\n`;
    content += `======================================================\n`;

    return content;
  };

  const handleExportTxt = () => {
    const content = generateExportText();
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    const fileName = (herencia.name || 'herencia')
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_+/g, '_');
    element.download = `papa_engine_${fileName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyToClipboard = () => {
    const content = generateExportText();
    navigator.clipboard.writeText(content);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleTriggerQuickSave = () => {
    onQuickSave();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  // PH status label and color
  const balanceInfo = useMemo(() => {
    if (totalPH === 0) {
      return {
        label: '¡Balance Perfecto!',
        sub: '0 PH exactos requeridos por PAPA Engine',
        textColor: 'text-papa-sand',
        bgPill: 'bg-papa-sand/20 border-papa-sand/40',
      };
    }
    if (totalPH > 0) {
      return {
        label: `Sobran +${totalPH} PH`,
        sub: `Añade desventajas (−) por valor de ${totalPH} PH`,
        textColor: 'text-amber-300',
        bgPill: 'bg-amber-950/40 border-amber-500/40',
      };
    }
    return {
      label: `Faltan ${Math.abs(totalPH)} PH`,
      sub: `Añade ventajas (+) por valor de ${Math.abs(totalPH)} PH`,
      textColor: 'text-papa-rose-light',
      bgPill: 'bg-papa-rose/20 border-papa-rose/40',
    };
  }, [totalPH]);

  return (
    <section className="bg-papa-charcoal/90 border border-papa-surface-light rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between backdrop-blur-md">
      <div>
        {/* Top bar: Title and Balance Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-papa-surface-light pb-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Tu Herencia en Construcción
            </h2>
            <p className="text-xs text-papa-gray-light mt-0.5">
              {herencia.name || 'Sin título'} {herencia.naturaleza ? `• Naturaleza: ${herencia.naturaleza}` : ''}
            </p>
          </div>

          <div className="text-right flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl border text-center ${balanceInfo.bgPill}`}>
              <div className="text-[11px] uppercase font-bold tracking-wider text-papa-gray-light">Balance Actual</div>
              <div className={`text-2xl sm:text-3xl font-black font-mono leading-none ${balanceInfo.textColor}`}>
                {totalPH > 0 ? `+${totalPH}` : totalPH} PH
              </div>
            </div>
          </div>
        </div>

        {/* Quick presets helper */}
        <div className="mb-4 bg-papa-surface/60 border border-papa-surface-light rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-papa-gray-light">
            <span className="text-papa-sand font-bold">Cargar Ejemplo Oficial:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_HERENCIAS.map((preset, idx) => (
              <button
                key={preset.name}
                onClick={() => onLoadPreset(idx)}
                className="text-xs px-2.5 py-1 rounded-lg bg-papa-dark/80 hover:bg-papa-surface text-gray-200 hover:text-papa-sand border border-papa-surface-light transition-colors"
                title={`Cargar ${preset.name} (0 PH balanceado)`}
              >
                {preset.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Traits List */}
        <div className="space-y-2 mb-4 overflow-y-auto max-h-[36vh] pr-1.5">
          {selectedTraits.length === 0 ? (
            <div className="text-center py-10 px-4 border border-dashed border-papa-gray/30 rounded-xl bg-papa-surface/30">
              <svg className="w-10 h-10 mx-auto text-papa-gray/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold text-gray-300">Aún no has añadido ningún rasgo</p>
              <p className="text-xs text-papa-gray mt-1 max-w-sm mx-auto">
                Selecciona ventajas y desventajas desde el catálogo izquierdo. Recuerda que debes elegir entre 2 y 9 rasgos y al menos una desventaja mecánica.
              </p>
            </div>
          ) : (
            selectedTraits.map((trait) => {
              const isAdv = trait.ph > 0;
              return (
                <div
                  key={trait.id}
                  className="bg-papa-surface border border-papa-surface-light hover:border-papa-gray/60 p-3 rounded-xl flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white truncate">{trait.name}</h4>
                      {trait.category && (
                        <span className="text-[10px] text-papa-gray px-1.5 py-0.2 rounded bg-papa-dark/60 border border-papa-surface-light">
                          {trait.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-papa-gray-light truncate mt-0.5">{trait.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`font-mono font-extrabold text-sm px-2 py-0.5 rounded-md border ${
                        isAdv
                          ? 'bg-papa-sand/15 text-papa-sand border-papa-sand/30'
                          : 'bg-papa-rose/15 text-papa-rose-light border-papa-rose/30'
                      }`}
                    >
                      {isAdv ? `+${trait.ph}` : trait.ph} PH
                    </span>
                    <button
                      onClick={() => onRemoveTrait(trait.id)}
                      className="text-papa-gray hover:text-papa-rose font-bold text-xl leading-none p-1 rounded hover:bg-papa-dark/50 transition-colors"
                      aria-label={`Quitar rasgo ${trait.name}`}
                      title="Quitar rasgo"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rules Validation Checklist Panel */}
        <div className="bg-papa-dark/80 border border-papa-surface-light rounded-xl p-3.5 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-papa-sand flex items-center gap-1.5">
              <span>Validación de Reglas PAPA Engine</span>
            </h4>
            <button
              onClick={() => setShowChecklist(!showChecklist)}
              className="text-[11px] text-papa-sand hover:underline flex items-center gap-1 font-semibold"
            >
              <span>{showChecklist ? 'Ocultar Test de Mesa' : 'Ver Test de Mesa (11 Preguntas)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className={`flex items-center gap-2 p-1.5 rounded-lg ${validation.isBalanced ? 'bg-green-950/30 text-green-300' : 'bg-papa-rose/10 text-papa-rose-light'}`}>
              <span>{validation.isBalanced ? '✓' : '✗'}</span>
              <span><strong>Balance:</strong> {totalPH} / 0 PH exactos</span>
            </div>

            <div className={`flex items-center gap-2 p-1.5 rounded-lg ${validation.isTraitCountValid ? 'bg-green-950/30 text-green-300' : 'bg-papa-rose/10 text-papa-rose-light'}`}>
              <span>{validation.isTraitCountValid ? '✓' : '✗'}</span>
              <span><strong>Rasgos:</strong> {selectedTraits.length} (Regla: 2 a 9)</span>
            </div>

            <div className={`flex items-center gap-2 p-1.5 rounded-lg ${validation.hasDisadvantage ? 'bg-green-950/30 text-green-300' : 'bg-papa-rose/10 text-papa-rose-light'}`}>
              <span>{validation.hasDisadvantage ? '✓' : '✗'}</span>
              <span><strong>Desventaja obligatoria:</strong> {validation.hasDisadvantage ? 'Cumplida' : 'Falta al menos 1'}</span>
            </div>

            <div className={`flex items-center gap-2 p-1.5 rounded-lg ${validation.hasNameAndNaturaleza ? 'bg-green-950/30 text-green-300' : 'bg-papa-rose/10 text-papa-rose-light'}`}>
              <span>{validation.hasNameAndNaturaleza ? '✓' : '✗'}</span>
              <span><strong>Datos:</strong> Nombre y Naturaleza gratuita</span>
            </div>
          </div>

          {/* Prerequisite & Incompatibility warnings */}
          {validation.prerequisiteIssues.length > 0 && (
            <div className="mt-2.5 p-2 rounded-lg bg-papa-rose/15 border border-papa-rose/30 text-[11px] text-papa-rose-light space-y-1">
              {validation.prerequisiteIssues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold">⚠</span>
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          )}

          {validation.incompatibilityIssues.length > 0 && (
            <div className="mt-2.5 p-2 rounded-lg bg-red-950/40 border border-red-800/40 text-[11px] text-red-300 space-y-1">
              {validation.incompatibilityIssues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold">⛔</span>
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          )}

          {/* 11 Questions Checklist Drawer */}
          {showChecklist && (
            <div className="mt-3 pt-3 border-t border-papa-surface-light text-xs space-y-2 animate-fadeIn">
              <p className="text-[11px] text-papa-gray font-semibold">
                Sección 9 del Documento: "Prueba final de una Herencia para mesa"
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {PAPA_CHECKLIST_QUESTIONS.map((q, idx) => {
                  let isAutoPassed = false;
                  if (q.autoRule === 'isBalanced') isAutoPassed = validation.isBalanced;
                  else if (q.autoRule === 'isTraitCountValid') isAutoPassed = validation.isTraitCountValid;
                  else if (q.autoRule === 'hasNaturaleza') isAutoPassed = Boolean(herencia.naturaleza);
                  else if (q.autoRule === 'hasDisadvantage') isAutoPassed = validation.hasDisadvantage;
                  else if (q.autoRule === 'movementBandValid') isAutoPassed = true;

                  const hasAuto = q.autoRule !== null;

                  return (
                    <div key={q.id} className="flex items-center justify-between p-1 rounded bg-papa-surface/40 text-[11px]">
                      <span className="text-gray-200">
                        {idx + 1}. {q.text}
                      </span>
                      {hasAuto ? (
                        <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${isAutoPassed ? 'bg-green-950 text-green-300' : 'bg-red-950 text-red-300'}`}>
                          {isAutoPassed ? 'Cumple' : 'Pendiente'}
                        </span>
                      ) : (
                        <span className="text-[10px] text-papa-gray px-1 bg-papa-dark rounded">Revisión de Mesa</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        {/* Primary Row: Descargar Imagen (PNG) & Descargar Texto (.TXT) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={onOpenImageExport}
            className="w-full bg-papa-sand text-papa-dark font-extrabold py-3 px-4 rounded-xl hover:bg-papa-sand-hover focus:outline-none focus:ring-2 focus:ring-papa-sand transition-all text-sm flex items-center justify-center gap-2 shadow-lg group active:scale-98"
          >
            <span className="text-base group-hover:scale-110 transition-transform">🖼️</span>
            <span>Descargar como Imagen</span>
          </button>

          <button
            onClick={handleExportTxt}
            disabled={!validation.isValid}
            className="w-full bg-papa-surface hover:bg-papa-surface-hover text-white border border-papa-surface-light font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-papa-sand disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-papa-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Descargar (.TXT)</span>
          </button>
        </div>

        {/* Secondary Row: Almacenamiento Local & Copiar Ficha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <button
            onClick={onOpenStorageManager}
            className="w-full bg-papa-charcoal hover:bg-papa-surface text-papa-sand border border-papa-sand/40 font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span>Almacenamiento Local</span>
          </button>

          <button
            onClick={handleTriggerQuickSave}
            className="w-full bg-papa-dark/90 hover:bg-papa-surface text-gray-200 border border-papa-surface-light font-semibold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-papa-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>{savedNotification ? '¡Guardada en Local!' : 'Guardar Rápido'}</span>
          </button>
        </div>

        {/* Third Row: Copiar y Reiniciar */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={handleCopyToClipboard}
            disabled={selectedTraits.length === 0}
            className="w-full bg-papa-dark/60 hover:bg-papa-surface text-papa-gray-light hover:text-white py-2 px-3 rounded-lg border border-papa-surface-light transition-colors"
          >
            {copiedNotification ? '✓ ¡Ficha Copiada!' : 'Copiar al Portapapeles'}
          </button>

          <button
            onClick={onReset}
            className="w-full bg-papa-rose/15 hover:bg-papa-rose text-papa-rose-light hover:text-white py-2 px-3 rounded-lg border border-papa-rose/30 transition-colors"
          >
            Reiniciar Creador
          </button>
        </div>

        {!validation.isValid && selectedTraits.length > 0 && (
          <p className="text-[11px] text-center text-papa-rose-light">
            Para que la ficha sea válida para jugar: balance en 0 PH, 2-9 rasgos y 1+ desventaja.
          </p>
        )}
      </div>
    </section>
  );
};

export default HerenciaBuilder;
