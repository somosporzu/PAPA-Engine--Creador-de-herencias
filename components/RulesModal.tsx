import React from 'react';
import PorzuuLogo from './PorzuuLogo';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-papa-charcoal border border-papa-surface-light rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-papa-surface-light flex items-center justify-between bg-papa-dark/60">
          <div className="flex items-center gap-3">
            <PorzuuLogo size={42} showBadge={false} />
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Manual de Creación de Herencias
              </h3>
              <p className="text-xs text-papa-sand font-semibold">
                Reglamento Oficial PAPA Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-papa-gray hover:text-white p-1 rounded-lg hover:bg-papa-surface transition-colors text-2xl leading-none font-bold"
            aria-label="Cerrar modal de reglas"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-200">
          <section>
            <h4 className="font-bold text-papa-sand text-base mb-1 font-display">
              1. Principio Central
            </h4>
            <p className="text-xs text-papa-gray-light leading-relaxed mb-2">
              Una Herencia representa el origen biológico del personaje: su cuerpo, constitución, sentidos, impulsos naturales y limitaciones congénitas. No representa cultura, educación ni profesión.
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 text-gray-300">
              <li>Toda Herencia se construye mediante <strong>Puntos de Herencia (PH)</strong>.</li>
              <li>Las ventajas cuestan PH. Las desventajas restan PH.</li>
              <li><strong className="text-papa-sand">El total final de una Herencia debe ser siempre 0 PH.</strong></li>
              <li>Una Herencia nunca debe ofrecer una ventaja global sin pagar un precio claro.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-papa-sand text-base mb-1 font-display">
              2. Categorías de Rasgos
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-papa-surface p-3 rounded-xl border border-papa-surface-light">
                <span className="font-bold text-papa-sand block mb-1">Rasgo Menor: ±1 PH</span>
                <p className="text-papa-gray-light">Útil, pero limitado. Puede aparecer con frecuencia sin alterar toda la jugabilidad. Ej: +5 Resistencia, garras débiles, visión penumbra.</p>
              </div>
              <div className="bg-papa-surface p-3 rounded-xl border border-papa-surface-light">
                <span className="font-bold text-papa-sand block mb-1">Rasgo Medio: ±2 PH</span>
                <p className="text-papa-gray-light">Importante y frecuente. Define parte del estilo de juego. Ej: respiración anfibia, arma natural potente, defensa natural.</p>
              </div>
              <div className="bg-papa-surface p-3 rounded-xl border border-papa-surface-light">
                <span className="font-bold text-papa-sand block mb-1">Rasgo Mayor: ±3 PH</span>
                <p className="text-papa-gray-light">Cambia de forma clara cómo se juega. Exige compensación con desventajas relevantes. Ej: armadura natural superior, velocidad mejorada, regeneración.</p>
              </div>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-papa-sand text-base mb-1 font-display">
              3. Reglas de Construcción Clave
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex gap-2">
                <span className="font-bold text-papa-sand shrink-0">• Número de rasgos:</span>
                <span>Debe tener entre <strong>2 y 9 rasgos</strong> en total.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-papa-sand shrink-0">• Naturaleza gratuita:</span>
                <span>Toda Herencia otorga una Naturaleza fija al personaje que no cuenta en el cálculo de PH.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-papa-sand shrink-0">• Desventaja obligatoria:</span>
                <span>Toda Herencia debe incluir al menos una desventaja mecánica (PH negativo).</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-papa-sand shrink-0">• Distancias por bandas:</span>
                <span>Se usan las bandas del sistema (Contacto, Cerca, Lejos, Distante), nunca metros. El movimiento nunca baja de Cerca.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-papa-sand shrink-0">• Movimiento adicional:</span>
                <span>Un personaje no puede recibir más de 1 banda de movimiento adicional por turno proveniente de rasgos de Herencia.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-papa-sand shrink-0">• Sin "escena" ni "primera tirada":</span>
                <span>No se usa "escena" como duración mecánica (se usan turnos, rondas, descansos). Las desventajas deben indicar inicio claro, tiradas afectadas, duración y cierre.</span>
              </div>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-papa-sand text-base mb-1 font-display">
              4. Coste Efectivo de Prerrequisitos
            </h4>
            <div className="bg-papa-dark/60 p-3 rounded-xl border border-papa-surface-light text-xs space-y-1.5">
              <p>
                <strong>Vuelo Real (+3 PH)</strong> exige obligatoriamente <strong>Alas (+1 PH)</strong>, por lo que su coste mínimo real es de <strong>+4 PH</strong>.
              </p>
              <p>
                <strong>Miembros Elásticos (+2 PH)</strong> exige poseer un arma natural (Armas Naturales Débiles +1 PH, Arma Natural Potente +2 PH o Garras Retráctiles +1 PH).
              </p>
              <p className="text-papa-rose-light">
                <strong>Incompatibilidad:</strong> Movimiento Lento es incompatible con Velocidad Mejorada y Arranque Forzado.
              </p>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-papa-surface-light bg-papa-dark/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-papa-sand text-papa-dark font-bold text-xs hover:bg-papa-sand-hover transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
