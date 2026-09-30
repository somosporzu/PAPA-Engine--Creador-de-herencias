import { type Trait } from '../types';
import { PRESET_HERENCIAS } from '../constants';

/**
 * Generates a completely randomized, mechanically balanced (0 PH) list of traits
 * complying with all PAPA Engine biological rules:
 * - 2 to 9 traits
 * - Total PH = 0
 * - At least 1 disadvantage
 * - Respects prerequisites (e.g. Vuelo Real requires Alas)
 * - Respects incompatibilities (e.g. Movimiento Lento cannot coexist with Velocidad Mejorada)
 * - Leaves name and description untouched.
 */
export function generateBalancedRandomTraits(allTraits: Trait[]): Trait[] {
  const disadvantages = allTraits.filter((t) => t.ph < 0 && !t.isCustom);
  const advantages = allTraits.filter((t) => t.ph > 0 && !t.isCustom);

  const naturalWeapons = ['armas-naturales-debiles', 'arma-natural-potente', 'garras-retractiles'];

  for (let attempt = 0; attempt < 500; attempt++) {
    // Decide number of disadvantages (1, 2 or 3)
    const numDisadv = Math.floor(Math.random() * 3) + 1;
    const shuffledDisadv = [...disadvantages].sort(() => Math.random() - 0.5);

    const chosenDisadv: Trait[] = [];
    for (const d of shuffledDisadv) {
      if (chosenDisadv.length >= numDisadv) break;
      chosenDisadv.push(d);
    }

    const disadvSum = chosenDisadv.reduce((acc, t) => acc + t.ph, 0);
    const targetAdvSum = Math.abs(disadvSum); // Must be equal to |disadvSum| so total sum = 0

    const hasSlowMovement = chosenDisadv.some((d) => d.id === 'movimiento-lento');

    // Filter available advantages based on incompatibilities
    const availableAdv = advantages.filter((a) => {
      if (hasSlowMovement && (a.id === 'velocidad-mejorada' || a.id === 'arranque-forzado')) {
        return false;
      }
      return true;
    });

    const shuffledAdv = [...availableAdv].sort(() => Math.random() - 0.5);
    const chosenAdv: Trait[] = [];
    let currentAdvSum = 0;

    for (const a of shuffledAdv) {
      if (currentAdvSum + a.ph <= targetAdvSum) {
        chosenAdv.push(a);
        currentAdvSum += a.ph;
        if (currentAdvSum === targetAdvSum) break;
      }
    }

    // If exact sum not reached, retry
    if (currentAdvSum !== targetAdvSum) continue;

    const candidate = [...chosenDisadv, ...chosenAdv];
    const candidateIds = new Set(candidate.map((t) => t.id));

    // Validate Vuelo Real prerequisite: must have Alas
    if (candidateIds.has('vuelo-real') && !candidateIds.has('alas')) {
      continue;
    }

    // Validate Miembros Elásticos prerequisite: must have a natural weapon
    if (
      candidateIds.has('miembros-elasticos') &&
      !naturalWeapons.some((w) => candidateIds.has(w))
    ) {
      continue;
    }

    // Validate count (between 2 and 9 traits)
    if (candidate.length >= 2 && candidate.length <= 9) {
      return candidate;
    }
  }

  // Safe fallback to one of the 5 official presets in case of an unlikely timeout
  const randomPreset = PRESET_HERENCIAS[Math.floor(Math.random() * PRESET_HERENCIAS.length)];
  return randomPreset.traitIds
    .map((id) => allTraits.find((t) => t.id === id))
    .filter((t): t is Trait => Boolean(t));
}
