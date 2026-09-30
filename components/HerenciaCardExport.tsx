import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { type Herencia, type Trait, type RuleValidation } from '../types';
import PorzuuLogo from './PorzuuLogo';

interface HerenciaCardExportProps {
  herencia: Omit<Herencia, 'traits'>;
  selectedTraits: Trait[];
  totalPH: number;
  validation: RuleValidation;
  isOpen: boolean;
  onClose: () => void;
}

export const HerenciaCardExport: React.FC<HerenciaCardExportProps> = ({
  herencia,
  selectedTraits,
  totalPH,
  validation,
  isOpen,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedImgSuccess, setCopiedImgSuccess] = useState(false);
  const [layoutColumns, setLayoutColumns] = useState<'single' | 'double'>('double');

  if (!isOpen) return null;

  const ventajas = selectedTraits.filter((t) => t.ph > 0);
  const desventajas = selectedTraits.filter((t) => t.ph < 0);

  // Generate canvas without ANY viewport/scroll clipping
  const generateCanvas = async (): Promise<HTMLCanvasElement | null> => {
    if (!cardRef.current) return null;

    // Ensure fonts and assets are fully loaded
    if (document.fonts) {
      await document.fonts.ready;
    }

    const cardElement = cardRef.current;

    // Calculate unconstrained dimensions
    const originalWidth = cardElement.offsetWidth || 760;

    const canvas = await html2canvas(cardElement, {
      scale: 2, // Crisp 2x retina DPI
      useCORS: true,
      backgroundColor: '#1C1D1F',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: Math.max(document.documentElement.scrollWidth, 1200),
      windowHeight: Math.max(document.documentElement.scrollHeight, 2000),
      onclone: (clonedDoc) => {
        // Find the cloned export target
        const clonedCard = clonedDoc.getElementById('papa-export-sheet');
        if (clonedCard) {
          // Force card to expand fully without any clipping
          clonedCard.style.overflow = 'visible';
          clonedCard.style.maxHeight = 'none';
          clonedCard.style.height = 'auto';
          clonedCard.style.width = `${originalWidth}px`;
          clonedCard.style.position = 'relative';

          // Unclamp ALL parent scroll containers in the clone so html2canvas doesn't clip
          let parent = clonedCard.parentElement;
          while (parent && parent !== clonedDoc.body) {
            parent.style.overflow = 'visible';
            parent.style.maxHeight = 'none';
            parent.style.height = 'auto';
            parent = parent.parentElement;
          }
        }
      },
    });

    return canvas;
  };

  const handleDownloadImage = async () => {
    try {
      setIsGenerating(true);
      const canvas = await generateCanvas();
      if (!canvas) return;

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const cleanName = (herencia.name || 'herencia')
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, '_')
        .replace(/_+/g, '_');
      link.download = `papa_engine_${cleanName}.png`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error al generar imagen de la Herencia:', err);
      alert('Hubo un error al generar la imagen. Por favor intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyImageToClipboard = async () => {
    try {
      setIsGenerating(true);
      const canvas = await generateCanvas();
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            setCopiedImgSuccess(true);
            setTimeout(() => setCopiedImgSuccess(false), 2500);
          } else {
            alert('Tu navegador no soporta copiar imágenes directamente. Usa el botón "Descargar PNG".');
          }
        } catch (copyErr) {
          console.warn('Clipboard write failed, fallback to download:', copyErr);
          alert('No se pudo copiar directamente. Puedes usar el botón "Descargar PNG".');
        }
      }, 'image/png');
    } catch (err) {
      console.error('Error al copiar imagen:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-papa-charcoal border border-papa-surface-light rounded-2xl max-w-4xl w-full flex flex-col shadow-2xl my-auto overflow-hidden animate-fadeIn">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-papa-surface-light flex flex-wrap items-center justify-between gap-3 bg-papa-dark/95">
          <div className="flex items-center gap-2.5">
            <span className="text-papa-sand text-xl">🖼️</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Ficha Gráfica de Herencia
              </h3>
              <p className="text-xs text-papa-gray-light">
                Exportación completa sin cortes • {selectedTraits.length} rasgos incluidos
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Layout Toggle */}
            <div className="hidden sm:flex items-center bg-papa-surface rounded-lg p-0.5 border border-papa-surface-light text-xs">
              <button
                onClick={() => setLayoutColumns('double')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  layoutColumns === 'double'
                    ? 'bg-papa-sand text-papa-dark'
                    : 'text-papa-gray hover:text-white'
                }`}
                title="Diseño en 2 columnas para rasgos"
              >
                2 Columnas
              </button>
              <button
                onClick={() => setLayoutColumns('single')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  layoutColumns === 'single'
                    ? 'bg-papa-sand text-papa-dark'
                    : 'text-papa-gray hover:text-white'
                }`}
                title="Diseño en 1 columna amplia"
              >
                1 Columna
              </button>
            </div>

            {/* Copy image button */}
            <button
              onClick={handleCopyImageToClipboard}
              disabled={isGenerating}
              className="px-3 py-2 rounded-xl bg-papa-surface hover:bg-papa-surface-hover text-white border border-papa-surface-light text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              title="Copiar imagen al portapapeles para pegar en Discord o chat"
            >
              <svg className="w-4 h-4 text-papa-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>{copiedImgSuccess ? '¡Copiada!' : 'Copiar Imagen'}</span>
            </button>

            {/* Download button */}
            <button
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl bg-papa-sand text-papa-dark font-extrabold text-xs sm:text-sm hover:bg-papa-sand-hover transition-all flex items-center gap-2 shadow-md disabled:opacity-50 active:scale-98"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-papa-dark" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generando PNG...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Descargar PNG</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="text-papa-gray hover:text-white p-2 rounded-lg hover:bg-papa-surface transition-colors font-bold text-lg"
              aria-label="Cerrar vista previa"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Scrollable Preview Area for user inspection */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[72vh] flex justify-center bg-papa-dark/60">
          {/* THE EXPORTABLE CARD CONTAINER - NO negative margins, NO internal clipping */}
          <div
            id="papa-export-sheet"
            ref={cardRef}
            className="w-full max-w-2xl bg-papa-dark border-2 border-papa-sand/70 rounded-2xl p-6 sm:p-8 text-gray-100 relative shadow-2xl font-sans"
            style={{ minHeight: 'auto', height: 'auto', overflow: 'visible' }}
          >
            {/* Top Corner Decorative Background Accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-papa-rose/25 via-papa-sand/15 to-transparent pointer-events-none rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-papa-sand/20 to-transparent pointer-events-none rounded-bl-2xl" />

            {/* Header: Title, Brand & Porzuu Logo in Corner */}
            <div className="relative flex items-start justify-between border-b-2 border-papa-surface-light pb-4 mb-5 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-papa-sand text-papa-dark">
                    PAPA ENGINE
                  </span>
                  <span className="text-[11px] text-papa-gray-light uppercase tracking-wider font-semibold">
                    Sistema de Creación de Herencias
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight break-words">
                  {herencia.name || 'Herencia Sin Nombre'}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-papa-gray-light">Naturaleza Fija Gratuita:</span>
                  <span className="font-bold text-papa-sand bg-papa-surface px-2.5 py-0.5 rounded-lg border border-papa-sand/40">
                    {herencia.naturaleza || 'No definida'}
                  </span>
                </div>
              </div>

              {/* Porzuu Mascot Logo in Corner */}
              <div className="shrink-0 flex flex-col items-center">
                <PorzuuLogo size={68} showBadge={true} />
              </div>
            </div>

            {/* Biological Concept Box */}
            <div className="mb-6 bg-papa-charcoal/80 border border-papa-surface-light p-4 rounded-xl">
              <h4 className="text-[11px] font-bold text-papa-sand uppercase tracking-wider mb-1 font-display">
                Concepto & Fisiología Biológica
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                "{herencia.description || 'Sin descripción conceptual especificada.'}"
              </p>
            </div>

            {/* Trait Sections Container */}
            <div className="space-y-6 mb-6">
              {/* Ventajas Section */}
              <div>
                <div className="flex items-center justify-between border-b border-papa-surface-light pb-1.5 mb-3">
                  <h3 className="text-xs sm:text-sm font-bold text-papa-sand uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-papa-sand" />
                    <span>Ventajas Biológicas (+{ventajas.reduce((s, t) => s + t.ph, 0)} PH)</span>
                  </h3>
                  <span className="text-[11px] text-papa-gray font-mono font-semibold">
                    {ventajas.length} {ventajas.length === 1 ? 'rasgo' : 'rasgos'}
                  </span>
                </div>

                {ventajas.length === 0 ? (
                  <p className="text-xs text-papa-gray italic p-3 bg-papa-surface/30 rounded-xl border border-dashed border-papa-surface-light">
                    Sin ventajas seleccionadas.
                  </p>
                ) : (
                  <div
                    className={
                      layoutColumns === 'double' && ventajas.length > 1
                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
                        : 'grid grid-cols-1 gap-2.5'
                    }
                  >
                    {ventajas.map((v) => (
                      <div
                        key={v.id}
                        className="p-3 rounded-xl bg-papa-charcoal/70 border border-papa-surface-light flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div>
                              <span className="font-bold text-xs sm:text-sm text-white block">
                                {v.name}
                              </span>
                              {v.category && (
                                <span className="inline-block text-[9px] px-1.5 py-0.2 mt-0.5 rounded bg-papa-dark text-papa-gray border border-papa-surface-light font-medium">
                                  {v.category}
                                </span>
                              )}
                            </div>
                            <span className="shrink-0 font-mono font-black text-xs px-2 py-0.5 rounded-lg bg-papa-sand/20 text-papa-sand border border-papa-sand/40">
                              +{v.ph} PH
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
                            {v.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Desventajas Section */}
              <div>
                <div className="flex items-center justify-between border-b border-papa-surface-light pb-1.5 mb-3">
                  <h3 className="text-xs sm:text-sm font-bold text-papa-rose-light uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-papa-rose" />
                    <span>Desventajas Congénitas ({desventajas.reduce((s, t) => s + t.ph, 0)} PH)</span>
                  </h3>
                  <span className="text-[11px] text-papa-gray font-mono font-semibold">
                    {desventajas.length} {desventajas.length === 1 ? 'rasgo' : 'rasgos'}
                  </span>
                </div>

                {desventajas.length === 0 ? (
                  <p className="text-xs text-papa-rose-light italic p-3 bg-papa-rose/10 rounded-xl border border-dashed border-papa-rose/30">
                    ¡Requiere al menos 1 desventaja mecánica obligatoria según las reglas de PAPA Engine!
                  </p>
                ) : (
                  <div
                    className={
                      layoutColumns === 'double' && desventajas.length > 1
                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
                        : 'grid grid-cols-1 gap-2.5'
                    }
                  >
                    {desventajas.map((d) => (
                      <div
                        key={d.id}
                        className="p-3 rounded-xl bg-papa-charcoal/70 border border-papa-rose/30 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div>
                              <span className="font-bold text-xs sm:text-sm text-white block">
                                {d.name}
                              </span>
                              {d.category && (
                                <span className="inline-block text-[9px] px-1.5 py-0.2 mt-0.5 rounded bg-papa-dark text-papa-gray border border-papa-surface-light font-medium">
                                  {d.category}
                                </span>
                              )}
                            </div>
                            <span className="shrink-0 font-mono font-black text-xs px-2 py-0.5 rounded-lg bg-papa-rose/20 text-papa-rose-light border border-papa-rose/40">
                              {d.ph} PH
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
                            {d.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Card Summary Stamp - Clean regular flex container without negative margins */}
            <div className="border-t-2 border-papa-surface-light pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-papa-surface/40 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="text-center bg-papa-dark px-3.5 py-1.5 rounded-xl border border-papa-surface-light">
                  <span className="block text-[9px] uppercase font-bold text-papa-gray">Balance Total</span>
                  <span
                    className={`text-xl font-black font-mono leading-none ${
                      totalPH === 0 ? 'text-papa-sand' : 'text-papa-rose-light'
                    }`}
                  >
                    {totalPH > 0 ? `+${totalPH}` : totalPH} PH
                  </span>
                </div>

                <div className="text-center bg-papa-dark px-3.5 py-1.5 rounded-xl border border-papa-surface-light">
                  <span className="block text-[9px] uppercase font-bold text-papa-gray">Rasgos Totales</span>
                  <span className="text-xl font-black font-mono text-white leading-none">
                    {selectedTraits.length} / 9
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    validation.isValid
                      ? 'bg-green-950/60 text-green-300 border-green-700/60'
                      : 'bg-papa-rose/20 text-papa-rose-light border-papa-rose/50'
                  }`}
                >
                  {validation.isValid ? '✓ HERENCIA VÁLIDA PARA MESA' : '⚠ REGLAS PENDIENTES'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerenciaCardExport;
