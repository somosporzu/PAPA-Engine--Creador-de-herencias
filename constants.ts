import { type Trait } from './types';

export const NATURALEZAS: string[] = [
  "Alegremente",
  "Apasionadamente",
  "Astutamente",
  "Brutalmente",
  "Caóticamente",
  "Carismáticamente",
  "Cautelosamente",
  "Curiosamente",
  "Despiadadamente",
  "Discretamente",
  "Elegantemente",
  "Fríamente",
  "Impulsivamente",
  "Inestablemente",
  "Metódicamente",
  "Rápidamente",
  "Silenciosamente",
  "Siniestramente",
  "Sutilmente",
  "Tenazmente",
  "Torpemente",
  "Valientemente",
];

// 28 Ventajas Menores (+1 PH)
export const VENTAJAS_MENORES: Trait[] = [
  {
    id: 'alas',
    name: 'Alas',
    ph: 1,
    category: 'Movimiento',
    description: 'Al caer o saltar desde una altura de al menos banda Cerca, con espacio para desplegarlas, reducen en 1 la banda efectiva de la caída y permiten desplazarse hasta 1 banda en horizontal durante ella. Este desplazamiento no consume Movimiento ni acciones. No permiten vuelo sostenido ni ganar altura. Son visibles y difíciles de ocultar, no funcionan con las alas sujetas ni en espacios estrechos, y son prerequisito para Vuelo Real.'
  },
  {
    id: 'armas-naturales-debiles',
    name: 'Armas Naturales Débiles',
    ph: 1,
    category: 'Combate',
    description: 'Garras, colmillos, cuernos pequeños u otra arma corporal simple. Infligen 1d6−3 de daño cuerpo a cuerpo. No pueden ser desarmadas, pero no reciben propiedades de armas, mejoras de equipo ni beneficios que requieran portar arma fabricada salvo regla específica.'
  },
  {
    id: 'arranque-forzado',
    name: 'Arranque Forzado',
    ph: 1,
    category: 'Movimiento',
    description: 'Una vez por turno, al moverte, puedes moverte 1 banda adicional a tu Movimiento normal y ganas 1 nivel de Fatiga. No consume Acción Principal ni Acción Rápida. No funciona en terreno difícil ni con Movimiento nulo, Inmovilizado o Apresado. La Fatiga se elimina con las reglas normales. Es incompatible con Movimiento Lento.',
    incompatibleWith: ['movimiento-lento']
  },
  {
    id: 'bioluminiscencia',
    name: 'Bioluminiscencia',
    ph: 1,
    category: 'Físico',
    description: 'Permite emitir luz tenue desde el cuerpo e iluminar hasta banda Cerca. Mientras esté activa en oscuridad o penumbra, el personaje resulta visible y sufre Desventaja en tiradas de Sigilo basadas en no ser visto.'
  },
  {
    id: 'bolsas-en-la-mejilla',
    name: 'Bolsas en la Mejilla',
    ph: 1,
    category: 'Utilidad',
    description: 'Permiten guardar objetos pequeños en cavidades biológicas de la boca o mejillas. Los objetos quedan ocultos si no se abre demasiado la boca o no hay inspección detallada.'
  },
  {
    id: 'bono-de-habilidad-menor',
    name: 'Bono de Habilidad Menor',
    ph: 1,
    category: 'Utilidad',
    description: 'Otorga +1 a una tirada muy específica relacionada con la biología de la Herencia. No puede aplicarse a categorías amplias como combate, percepción general o tiradas sociales en conjunto.'
  },
  {
    id: 'cola-prensil',
    name: 'Cola Prensil',
    ph: 1,
    category: 'Utilidad',
    description: 'La cola puede sujetar objetos pequeños, ayudar al equilibrio o manipular elementos simples. No puede atacar, usar armas, portar escudos ni reemplazar una mano para tareas finas salvo permiso del DJ.'
  },
  {
    id: 'duros-de-cabeza',
    name: 'Duros de Cabeza',
    ph: 1,
    category: 'Mental',
    description: 'Otorga +1 a tiradas para resistir intimidación, amenazas directas o presión destinada a hacer retroceder por miedo.'
  },
  {
    id: 'equilibrio-perfecto',
    name: 'Equilibrio Perfecto',
    ph: 1,
    category: 'Movimiento',
    description: 'Otorga Ventaja en tiradas para evitar caer, perder equilibrio o ser derribado por terreno inestable, empujones o superficies estrechas.'
  },
  {
    id: 'estomago-de-hierro',
    name: 'Estómago de Hierro',
    ph: 1,
    category: 'Físico',
    description: 'Otorga Ventaja en salvaciones contra enfermedades transmitidas por comida o agua en mal estado. No protege contra venenos diseñados deliberadamente ni toxinas sobrenaturales.'
  },
  {
    id: 'familiaridad-animal',
    name: 'Familiaridad Animal',
    ph: 1,
    category: 'Social',
    description: 'Otorga +1 a tiradas para calmar, guiar, interpretar o acercarse a un tipo específico de animal elegido al crear la Herencia.'
  },
  {
    id: 'fisiologia-anfibia',
    name: 'Fisiología Anfibia',
    ph: 1,
    category: 'Físico',
    description: 'Permite respirar aire y agua con igual comodidad. No otorga velocidad de nado, visión submarina, resistencia a presión ni protección contra agua contaminada.'
  },
  {
    id: 'garras-retractiles',
    name: 'Garras Retráctiles',
    ph: 1,
    category: 'Combate',
    description: 'Garras ocultables que infligen 1d6−3 de daño Cortante. No pueden ser desarmadas y pueden ocultarse en inspecciones casuales. No reciben mejoras de armas fabricadas salvo regla específica.'
  },
  {
    id: 'instinto-animal',
    name: 'Instinto Animal',
    ph: 1,
    category: 'Social',
    description: 'Otorga Ventaja para comunicarse, calmar o interpretar animales. Como limitación integrada, en ceremonias rígidas, audiencias protocolarias o actos de etiqueta alta, el personaje sufre Desventaja en tiradas sociales que exijan compostura refinada o protocolo elaborado.'
  },
  {
    id: 'instinto-depredador',
    name: 'Instinto Depredador',
    ph: 1,
    category: 'Mental',
    description: 'Otorga +1 a tiradas para seguir, localizar o interpretar rastros de una criatura que haya sufrido daño recientemente.'
  },
  {
    id: 'lectura-corporal',
    name: 'Lectura Corporal',
    ph: 1,
    category: 'Social',
    description: 'Otorga +1 a tiradas para detectar mentiras, emociones fingidas, tensión corporal o intenciones disimuladas mediante señales no verbales.'
  },
  {
    id: 'manos-habiles',
    name: 'Manos Hábiles',
    ph: 1,
    category: 'Utilidad',
    description: 'Otorga +1 a tiradas de artesanía fina, cirugía delicada, joyería, mecanismos pequeños, escritura diminuta o manipulación precisa.'
  },
  {
    id: 'orientacion-natural',
    name: 'Orientación Natural',
    ph: 1,
    category: 'Mental',
    description: 'Otorga Ventaja en tiradas para orientarse, reconocer rutas naturales o evitar perderse fuera de asentamientos.'
  },
  {
    id: 'parpados-nictitantes',
    name: 'Párpados Nictitantes',
    ph: 1,
    category: 'Físico',
    description: 'Membranas transparentes protegen los ojos. El personaje es inmune a ceguera causada por arena, polvo, ceniza, salpicaduras leves o irritantes similares.'
  },
  {
    id: 'pelo-aislante',
    name: 'Pelo Aislante',
    ph: 1,
    category: 'Físico',
    description: 'Otorga Ventaja en salvaciones contra frío extremo. Como limitación, cada vez que recibe daño de Fuego, recibe +1 de daño adicional.'
  },
  {
    id: 'percepcion-aguda',
    name: 'Percepción Aguda',
    ph: 1,
    category: 'Mental',
    description: 'Otorga +1 a tiradas de percepción basadas en un sentido elegido al crear la Herencia.'
  },
  {
    id: 'piel-de-piedra-menor',
    name: 'Piel de Piedra Menor',
    ph: 1,
    category: 'Combate',
    description: 'Ignora 1 punto de daño de un tipo específico elegido al crear la Herencia.'
  },
  {
    id: 'resistencia-aumentada',
    name: 'Resistencia Aumentada',
    ph: 1,
    category: 'Físico',
    description: 'Aumenta en +5 la Resistencia máxima. No otorga Ventaja para soportar dolor, tortura, cansancio ni salvaciones.'
  },
  {
    id: 'sentido-de-vibracion-menor',
    name: 'Sentido de Vibración Menor',
    ph: 1,
    category: 'Mental',
    description: 'Mientras el personaje está en contacto con una superficie capaz de transmitir vibraciones, obtiene +1 a tiradas para detectar movimiento en banda Cerca mediante vibración.'
  },
  {
    id: 'vision-en-penumbra',
    name: 'Visión en Penumbra',
    ph: 1,
    category: 'Mental',
    description: 'Permite ver sin penalizadores normales en penumbra, luz tenue, noche clara o interiores mal iluminados hasta Cerca. No permite ver en oscuridad total.'
  },
  {
    id: 'coagulo-de-emergencia',
    name: 'Coágulo de Emergencia',
    ph: 1,
    category: 'Físico',
    description: 'Una vez por Descanso Largo, cuando el personaje queda con la mitad o menos de su Resistencia máxima, recupera 1d6 de Resistencia. No se activa si reduce voluntariamente su Resistencia para forzar el rasgo.'
  },
  {
    id: 'impulso-suprarrenal',
    name: 'Impulso Suprarrenal',
    ph: 1,
    category: 'Físico',
    description: 'Una vez por Descanso Largo, cuando el personaje queda con la mitad o menos de su Resistencia máxima, obtiene +1 a tiradas de Cuerpo hasta el final de su próximo turno.'
  },
  {
    id: 'reflejo-de-supervivencia',
    name: 'Reflejo de Supervivencia',
    ph: 1,
    category: 'Movimiento',
    description: 'Una vez por Descanso Largo, cuando el personaje queda con la mitad o menos de su Resistencia máxima, puede moverse hasta 1 banda sin provocar ataques de oportunidad. Este movimiento no consume su Movimiento ni su Reacción. No permite atravesar obstáculos ni escapar automáticamente de agarres. No se activa si reduce voluntariamente su Resistencia para forzar el rasgo.'
  },
];

// 31 Ventajas Medias (+2 PH)
export const VENTAJAS_MEDIAS: Trait[] = [
  {
    id: 'acrobata-nato',
    name: 'Acróbata Nato',
    ph: 2,
    category: 'Movimiento',
    description: 'Otorga Ventaja en tiradas de acrobacias, equilibrio, saltos arriesgados, piruetas, caídas controladas o desplazamiento sobre superficies difíciles.'
  },
  {
    id: 'adherencia-mural',
    name: 'Adherencia Mural',
    ph: 2,
    category: 'Movimiento',
    description: 'Permite trepar superficies verticales difíciles sin tirada si hay adherencia posible. Puede permitir desplazamiento por techos o superficies invertidas, avanzando como en terreno difícil (1 banda por turno), si el material y el peso lo permiten. No funciona en superficies lisas, aceitosas o incapaces de sostener al personaje.'
  },
  {
    id: 'afinidad-con-un-elemento',
    name: 'Afinidad con un elemento',
    ph: 2,
    category: 'Mental',
    description: 'Al crear la Herencia, elige un elemento (Fuego, Agua, Tierra, Metal o Madera). El coste en PX para aprender Conjuros de ese elemento se reduce en 10%, redondeando hacia abajo. Puede tomarse hasta dos veces con elementos distintos. Los descuentos no se apilan sobre el mismo elemento. No afecta a Conjuros Sin Afinidad.'
  },
  {
    id: 'afinidad-con-una-energia',
    name: 'Afinidad con una Energía',
    ph: 2,
    category: 'Mental',
    description: 'Al crear la Herencia, elige una Energía (Destrucción, Creación, Transformación, Conservación, Orden o Caos). El coste en PX para aprender Conjuros de esa Energía se reduce en 10%. Puede tomarse hasta dos veces con Energías distintas. Los descuentos no se apilan sobre la misma Energía. Si la Senda del personaje ya tiene esa Energía como afín, se aplica primero el 80% de la Senda y después el 10% de este rasgo, redondeando hacia abajo.'
  },
  {
    id: 'arma-natural-potente',
    name: 'Arma Natural Potente',
    ph: 2,
    category: 'Combate',
    description: 'Arma corporal peligrosa que inflige 1d6 de daño cuerpo a cuerpo. El tipo de daño se elige al crear la Herencia. No puede ser desarmada, pero no recibe propiedades de armas, mejoras de equipo ni beneficios que requieran portar arma fabricada salvo regla específica.'
  },
  {
    id: 'aura-imponente',
    name: 'Aura Imponente',
    ph: 2,
    category: 'Social',
    description: 'Durante el primer intercambio social relevante con criaturas que no conocen al personaje, otorga Ventaja en tiradas de intimidación, imposición de presencia o persuasión basada en autoridad física, rareza, belleza, solemnidad o magnetismo natural.'
  },
  {
    id: 'caparazon-dorsal',
    name: 'Caparazón Dorsal',
    ph: 2,
    category: 'Combate',
    description: 'Los ataques desde la retaguardia no obtienen Ventaja por esa posición. No anula emboscadas, sorpresa, invisibilidad ni otros beneficios del atacante.'
  },
  {
    id: 'cicatrizacion-rapida',
    name: 'Cicatrización Rápida',
    ph: 2,
    category: 'Físico',
    description: 'Al comenzar un Descanso Corto, recupera 1d6 de Resistencia adicional. No regenera miembros, no cura enfermedades, no elimina Fatiga y no funciona si una condición impide recuperar Resistencia mediante descanso.'
  },
  {
    id: 'defensa-natural',
    name: 'Defensa Natural',
    ph: 2,
    category: 'Combate',
    description: 'Otorga +1 estable a Defensa. Representa protección biológica y se acumula con armadura y escudo salvo regla contraria.'
  },
  {
    id: 'ecolocalizacion',
    name: 'Ecolocalización',
    ph: 2,
    category: 'Mental',
    description: 'Mientras pueda emitir sonidos y percibir su retorno, el personaje percibe su entorno hasta banda Cerca sin depender de la vista. Funciona en oscuridad total, pero no permite leer, distinguir colores ni percibir detalles visuales finos. No funciona en silencio mágico, ruido extremo, vacío o sordera total.'
  },
  {
    id: 'empatia-animal',
    name: 'Empatía Animal',
    ph: 2,
    category: 'Social',
    description: 'Permite comunicar emociones e intenciones básicas a animales no sapientes y comprender respuestas instintivas simples. No permite conversación compleja ni control mental.'
  },
  {
    id: 'espinas-retractiles',
    name: 'Espinas Retráctiles',
    ph: 2,
    category: 'Combate',
    description: 'Cuando una criatura intenta agarrar, apresar o sujetar directamente al personaje, sufre 1d6−2 de daño Cortante o Penetrante. No daña ataques realizados con armas, herramientas, cadenas u otros medios sin contacto corporal directo.'
  },
  {
    id: 'estomago-carronero',
    name: 'Estómago Carroñero',
    ph: 2,
    category: 'Físico',
    description: 'Permite alimentarse de carne cruda, podrida o contaminada de forma natural sin enfermar por ello. No protege contra venenos deliberados, toxinas sobrenaturales o sustancias alquímicas.'
  },
  {
    id: 'exoesqueleto',
    name: 'Exoesqueleto',
    ph: 2,
    category: 'Combate',
    description: 'Otorga +2 a Defensa por placas naturales. No puede usarse armadura convencional encima. Funciona como alternativa a armadura, no como bono acumulable libre.'
  },
  {
    id: 'feromonas',
    name: 'Feromonas',
    ph: 2,
    category: 'Social',
    description: 'Otorga Ventaja en tiradas sociales para persuadir, calmar, atraer o generar disposición favorable en criaturas capaces de percibir señales químicas compatibles. No es control mental y no funciona contra criaturas sin olfato, sin biología compatible o protegidas.'
  },
  {
    id: 'fotosintesis',
    name: 'Fotosíntesis',
    ph: 2,
    category: 'Físico',
    description: 'Tras pasar al menos 4 horas bajo luz solar suficiente, el personaje no necesita comer ese día. Sigue necesitando agua, descanso y protección ambiental.'
  },
  {
    id: 'membranas-interdigitales',
    name: 'Membranas Interdigitales',
    ph: 2,
    category: 'Movimiento',
    description: 'Permiten nadar usando tu Movimiento normal, sin penalización, y otorgan Ventaja en maniobras de agarre bajo el agua. No permiten respirar bajo el agua ni resistir presión.'
  },
  {
    id: 'memoria-prodigiosa',
    name: 'Memoria Prodigiosa',
    ph: 2,
    category: 'Mental',
    description: 'Otorga Ventaja en tiradas para recordar información que el personaje vio, escuchó, leyó o experimentó directamente. No otorga conocimientos no adquiridos.'
  },
  {
    id: 'metabolismo-eficiente',
    name: 'Metabolismo Eficiente',
    ph: 2,
    category: 'Físico',
    description: 'El personaje necesita solo la mitad de comida y agua para evitar hambre, sed o Fatiga por privación.'
  },
  {
    id: 'miembros-elasticos',
    name: 'Miembros Elásticos',
    ph: 2,
    category: 'Combate',
    description: 'Elige un arma natural que poseas (Armas Naturales Débiles, Arma Natural Potente, Garras Retráctiles u otra aprobada). El alcance de esa arma llega hasta banda Cerca sin necesidad de estar en Contacto, como la propiedad Alcance. Sigue contando como ataque cuerpo a cuerpo. Requiere tener un arma natural, por lo que su coste efectivo mínimo es +3 PH. No aumenta fuerza, daño ni el alcance de armas fabricadas. El DJ puede limitarlo en espacios estrechos, como con la propiedad Alcance.',
    prerequisites: ['Requiere un arma natural (Armas Naturales Débiles, Arma Natural Potente o Garras Retráctiles)']
  },
  {
    id: 'movimiento-especial',
    name: 'Movimiento Especial',
    ph: 2,
    category: 'Movimiento',
    description: 'Otorga una forma de movimiento adicional que usa tu Movimiento normal, sin penalización. Debe elegirse entre trepar o nadar. Nadar no permite respirar bajo el agua; trepar no permite adherirse a superficies sin agarres salvo otro rasgo.'
  },
  {
    id: 'naturaleza-adicional',
    name: 'Naturaleza Adicional',
    ph: 2,
    category: 'Mental',
    description: 'Al crear el personaje, gana una Naturaleza extra a elección del jugador.'
  },
  {
    id: 'paso-ligero-avanzado',
    name: 'Paso Ligero Avanzado',
    ph: 2,
    category: 'Movimiento',
    description: 'Permite moverse sin penalización sobre nieve profunda, barro, agua poco profunda, vegetación baja, fango o superficies naturales blandas. No permite caminar sobre agua profunda, lava o arenas movedizas peligrosas.'
  },
  {
    id: 'resistencia-a-venenos',
    name: 'Resistencia a Venenos',
    ph: 2,
    category: 'Físico',
    description: 'Otorga Ventaja en todas las Tiradas de Salvación contra venenos.'
  },
  {
    id: 'resistencia-magica',
    name: 'Resistencia Mágica',
    ph: 2,
    category: 'Mental',
    description: 'Otorga Ventaja en Salvaciones contra efectos de Conjuros. No reduce daño automáticamente ni anula Conjuros que no permitan salvación.'
  },
  {
    id: 'saliva-corrosiva',
    name: 'Saliva Corrosiva',
    ph: 2,
    category: 'Combate',
    description: 'Como acción, permite escupir ácido a un objetivo en banda Cerca mediante un ataque a distancia. Si impacta, inflige 1d6 de daño Corrosivo e ignora 2 puntos de armadura. Una vez por Descanso Largo puede potenciarse a 2d6. Es un rasgo ofensivo activo y debe usarse con cuidado.'
  },
  {
    id: 'sangre-fria',
    name: 'Sangre Fría',
    ph: 2,
    category: 'Mental',
    description: 'Otorga inmunidad a pánico y miedo no mágico. Como limitación, el personaje sufre Desventaja para detectar emboscadas, amenazas repentinas o peligro inmediato cuando dependa de reacción emocional o alarma corporal.'
  },
  {
    id: 'sentido-del-peligro',
    name: 'Sentido del Peligro',
    ph: 2,
    category: 'Mental',
    description: 'El personaje no puede ser sorprendido mientras esté consciente. Además obtiene +2 a Iniciativa durante el primer turno de cualquier combate. No funciona si está dormido, inconsciente, incapacitado o si la amenaza es imposible de percibir.'
  },
  {
    id: 'sentidos-agudos',
    name: 'Sentidos Agudos',
    ph: 2,
    category: 'Mental',
    description: 'Otorga Ventaja en tiradas de percepción dependientes de un sentido concreto elegido al crear la Herencia.'
  },
  {
    id: 'vinculo-de-manada',
    name: 'Vínculo de Manada',
    ph: 2,
    category: 'Social',
    description: 'Mientras haya al menos un aliado consciente en banda Cerca, el personaje tiene Ventaja en Salvaciones contra efectos mentales. No funciona si está aislado o no puede percibir al aliado.'
  },
  {
    id: 'vision-en-la-oscuridad',
    name: 'Visión en la Oscuridad',
    ph: 2,
    category: 'Mental',
    description: 'Permite ver en oscuridad total como si hubiera penumbra hasta Cerca. Percibe formas, movimiento y detalles básicos, pero no colores. No atraviesa niebla, humo, muros, invisibilidad ni oscuridad mágica absoluta.'
  },
];

// 22 Ventajas Mayores (+3 PH)
export const VENTAJAS_MAYORES: Trait[] = [
  {
    id: 'armadura-natural-superior',
    name: 'Armadura Natural Superior',
    ph: 3,
    category: 'Combate',
    description: 'Otorga +3 a Defensa por protección biológica. No puede usarse armadura convencional encima. Puede acumularse con escudo si la anatomía lo permite. Debe tratarse como armadura biológica completa.'
  },
  {
    id: 'cambio-de-forma-menor',
    name: 'Cambio de Forma Menor',
    ph: 3,
    category: 'Físico',
    description: 'Permite adoptar una forma alternativa concreta y definida al crear la Herencia. No permite copiar individuos, cambiar de especie libremente, adquirir rasgos no definidos ni sanar daño mediante la transformación.'
  },
  {
    id: 'camuflaje-natural',
    name: 'Camuflaje Natural',
    ph: 3,
    category: 'Físico',
    description: 'Otorga Ventaja en Sigilo visual en un entorno elegido. Las criaturas que intenten detectarlo visualmente sufren Desventaja si no lo han visto moverse de forma evidente. No funciona fuera del entorno elegido ni contra sentidos no visuales.'
  },
  {
    id: 'comunicacion-telepatica-menor',
    name: 'Comunicación Telepática Menor',
    ph: 3,
    category: 'Mental',
    description: 'Permite comunicar pensamientos simples, emociones o frases breves a criaturas sapientes en banda Cerca. No permite leer pensamientos, controlar acciones ni transmitir recuerdos complejos.'
  },
  {
    id: 'regeneracion-menor',
    name: 'Regeneración Menor',
    ph: 3,
    category: 'Físico',
    description: 'Al finalizar cada combate o comenzar un Descanso Corto, recupera 1d6 de Resistencia adicional. Ciertos tipos de daño definidos para la Herencia, como Fuego o Corrosivo, pueden bloquear esta recuperación hasta completar un Descanso Largo.'
  },
  {
    id: 'sentido-ciego',
    name: 'Sentido Ciego',
    ph: 3,
    category: 'Mental',
    description: 'Permite percibir criaturas, objetos y obstáculos hasta banda Cerca sin depender de la vista. Debe elegirse un mecanismo: vibración, ecolocalización avanzada, calor corporal, presión del aire, campo eléctrico o sensibilidad espiritual. Cada mecanismo debe tener contramedidas claras.'
  },
  {
    id: 'tamano-grande',
    name: 'Tamaño Grande',
    ph: 3,
    category: 'Físico',
    description: 'Otorga +5 Resistencia máxima y +1 a tiradas de Cuerpo relacionadas con fuerza bruta, empujar, cargar, levantar, romper o resistir desplazamientos. No aumenta automáticamente alcance, Defensa ni daño. Debe acompañarse de consecuencias logísticas razonables.'
  },
  {
    id: 'velocidad-mejorada',
    name: 'Velocidad Mejorada',
    ph: 3,
    category: 'Movimiento',
    description: 'Tu Movimiento base sube de Cerca a Lejos: recorres 2 bandas por turno. No funciona con armadura que Ata al suelo. El terreno difícil sigue consumiendo todo tu Movimiento al avanzar una banda. No se acumula con otros efectos que suban la categoría de Movimiento; se aplica el mayor. Es incompatible con Movimiento Lento.',
    incompatibleWith: ['movimiento-lento']
  },
  {
    id: 'vuelo-real',
    name: 'Vuelo Real',
    ph: 3,
    category: 'Movimiento',
    description: 'Permite volar usando tu Movimiento normal. Requiere Alas, por lo que su coste efectivo mínimo es +4 PH. No puede usarse con armadura media o pesada, carga excesiva, alas sujetas o espacios demasiado estrechos. No recomendado para manual base salvo campañas preparadas para personajes voladores.',
    prerequisites: ['Requiere el rasgo Alas (+1 PH)']
  },
  {
    id: 'voz-hipnotica',
    name: 'Voz Hipnótica',
    ph: 3,
    category: 'Social',
    description: 'Como acción, una criatura capaz de oír al personaje en banda Cerca debe superar Salvación de Aura ND 12 o quedar Fascinada hasta el final del próximo turno del usuario. No es control mental completo y una criatura que supera la Salvación no puede volver a ser afectada hasta completar un Descanso Largo.'
  },
  {
    id: 'vision-verdadera-menor',
    name: 'Visión Verdadera Menor',
    ph: 3,
    category: 'Mental',
    description: 'Permite distinguir ilusiones visuales menores, disfraces simples, cambios de forma incompletos y camuflaje natural en banda Cerca. No revela pensamientos, invisibilidad perfecta, ilusiones mayores ni secretos sin relación visual.'
  },
  {
    id: 'cuerpo-colosal-controlado',
    name: 'Cuerpo Colosal Controlado',
    ph: 3,
    category: 'Físico',
    description: 'Otorga +10 Resistencia máxima y Ventaja en tiradas de Cuerpo para resistir empujones, derribos, arrastres o desplazamientos forzados. No aumenta Defensa, alcance, daño ni velocidad.'
  },
  {
    id: 'corazon-doble',
    name: 'Corazón Doble',
    ph: 3,
    category: 'Físico',
    description: 'Una vez por Descanso Largo, cuando el personaje caería a 0 de Resistencia por daño, queda en 1 de Resistencia en su lugar. No elimina Fatiga ni estados negativos.'
  },
  {
    id: 'resistencia-primigenia',
    name: 'Resistencia Primigenia',
    ph: 3,
    category: 'Físico',
    description: 'Elige un tipo de daño asociado a una adaptación clara. El personaje ignora 3 puntos de daño de ese tipo cada vez que lo recibe. No protege contra efectos secundarios salvo que dependan directamente del daño.'
  },
  {
    id: 'mente-inquebrantable',
    name: 'Mente Inquebrantable',
    ph: 3,
    category: 'Mental',
    description: 'Otorga Ventaja en Salvaciones de Aura contra miedo, control mental, confusión, fascinación, compulsión o efectos que intenten quebrar la voluntad. Una vez por Descanso Largo, si falla una de esas salvaciones, puede repetirla y quedarse con el segundo resultado.'
  },
  {
    id: 'sangre-adaptativa',
    name: 'Sangre Adaptativa',
    ph: 3,
    category: 'Físico',
    description: 'Después de completar un Descanso Largo, elige una adaptación hasta el siguiente Descanso Largo: Ventaja contra venenos, enfermedades, frío extremo, calor extremo, o +1 a tiradas de Cuerpo para resistir agotamiento por marcha, hambre o sed durante una jornada de viaje.'
  },
  {
    id: 'piel-de-hierro',
    name: 'Piel de Hierro',
    ph: 3,
    category: 'Combate',
    description: 'Ignora 1 punto de daño físico de cualquier fuente Cortante, Penetrante o Contundente. Además otorga Ventaja en Salvaciones de Cuerpo para resistir cortes profundos, fracturas, aplastamiento o daño físico sostenido. No reduce daño elemental, espiritual, mental ni corrosivo.'
  },
  {
    id: 'organo-sensorial-superior',
    name: 'Órgano Sensorial Superior',
    ph: 3,
    category: 'Mental',
    description: 'Elige un sentido especial superior: olfato absoluto, oído ultrasensible, visión térmica, percepción eléctrica, lectura de vibraciones, sensibilidad espiritual menor u otro aprobado. Otorga Ventaja en percepción basada en ese sentido y permite detectar información inaccesible para sentidos normales, siempre con contramedidas claras.'
  },
  {
    id: 'adaptacion-extrema-a-un-bioma',
    name: 'Adaptación Extrema a un Bioma',
    ph: 3,
    category: 'Físico',
    description: 'Elige un bioma extremo. Mientras permanezcas en él, obtienes Ventaja en Salvaciones contra peligros ambientales propios, +1 para orientarte, buscar refugio, encontrar agua o comida, y no sufres penalizadores normales de movimiento por terreno natural típico del bioma.'
  },
  {
    id: 'nervios-de-relampago',
    name: 'Nervios de Relámpago',
    ph: 3,
    category: 'Movimiento',
    description: 'Otorga +2 a Iniciativa. Una vez por Descanso Corto, puedes moverte 1 banda adicional en tu turno sin gastar acción, si ese movimiento sirve para acercarte a una amenaza, alejarte de un peligro inmediato o alcanzar cobertura. No funciona en terreno difícil ni con Movimiento nulo, Inmovilizado o Apresado. Este movimiento no cuenta como parte de tu Movimiento normal.'
  },
  {
    id: 'presencia-aterradora',
    name: 'Presencia Aterradora',
    ph: 3,
    category: 'Social',
    description: 'Como acción, elige una criatura hostil en banda Cerca que pueda verte u oírte. Debe superar Salvación de Aura ND 12 o quedar Asustada de ti hasta el final de tu próximo turno. Si supera la Salvación, no puede volver a ser afectada hasta completar un Descanso Largo.'
  },
  {
    id: 'respiracion-perfecta',
    name: 'Respiración Perfecta',
    ph: 3,
    category: 'Físico',
    description: 'Permite aguantar la respiración durante una hora sin sufrir asfixia. Además otorga Ventaja en Salvaciones contra humo, gases no mágicos, aire viciado o inhalación accidental de sustancias irritantes. No permite respirar bajo el agua indefinidamente.'
  },
];

// 19 Desventajas Menores (-1 PH)
export const DESVENTAJAS_MENORES: Trait[] = [
  {
    id: 'apetito-voraz',
    name: 'Apetito Voraz',
    ph: -1,
    category: 'Físico',
    description: 'Si pasas una jornada completa de actividad intensa sin alimentarte lo suficiente, sufres Desventaja en tiradas de Cuerpo relacionadas con esfuerzo prolongado, marcha, cargar peso o mantener actividad física sostenida. Termina al comer lo suficiente y descansar al menos una hora.'
  },
  {
    id: 'ojos-sensibles',
    name: 'Ojos Sensibles',
    ph: -1,
    category: 'Físico',
    description: 'Al exponerte a luz intensa, reflejos fuertes, relámpagos, destellos o sol directo muy brillante sin protección, sufres Desventaja en percepción visual, ataques a distancia y acciones de precisión visual. Dura mientras continúe la exposición y unos minutos después. En combate dura hasta el final del próximo turno, o hasta el siguiente si el destello fue especialmente intenso.'
  },
  {
    id: 'comportamiento-compulsivo',
    name: 'Comportamiento Compulsivo',
    ph: -1,
    category: 'Mental',
    description: 'Si no puedes realizar un hábito breve definido al crear la Herencia, sufres Desventaja en tiradas de Aura relacionadas con concentración, calma, paciencia o autocontrol. Termina al realizar el hábito, abandonar la situación que lo impide o enfrentar una amenaza inmediata que lo vuelve inviable.'
  },
  {
    id: 'curiosidad-morbida',
    name: 'Curiosidad Mórbida',
    ph: -1,
    category: 'Mental',
    description: 'Ante algo extraño, desconocido o peligroso no investigado, debes superar Salvación de Aura ND 9 para ignorarlo. Si fallas, sufres Desventaja en Aura para concentración, paciencia o atención a otros asuntos mientras el estímulo siga presente. Termina al investigarlo, recibir una explicación clara, alejarte o enfrentar peligro inmediato.'
  },
  {
    id: 'fobia-comun',
    name: 'Fobia Común',
    ph: -1,
    category: 'Mental',
    description: 'Ante un estímulo elegido al crear la Herencia, sufres Desventaja en tiradas de Aura para mantener calma o resistir miedo mientras el estímulo represente presión real. Para acercarte o interactuar directamente con él, debes superar Salvación de Aura ND 10.'
  },
  {
    id: 'fragilidad-termica',
    name: 'Fragilidad Térmica',
    ph: -1,
    category: 'Físico',
    description: 'Frente a calor extremo, frío extremo o cambios bruscos de temperatura definidos al crear la Herencia, sufres Desventaja en Salvaciones de Cuerpo contra peligros ambientales relacionados mientras estés expuesto sin protección.'
  },
  {
    id: 'marca-evidente',
    name: 'Marca Evidente',
    ph: -1,
    category: 'Social',
    description: 'Sufres Desventaja para ocultar tu Herencia, pasar por otra especie o evitar que reconozcan rasgos físicos distintivos. No aplica si los rasgos están cubiertos eficazmente o el observador no conoce tu Herencia.'
  },
  {
    id: 'metabolismo-delicado',
    name: 'Metabolismo Delicado',
    ph: -1,
    category: 'Físico',
    description: 'Al consumir comida desconocida, mal conservada, muy especiada, fermentada o propia de otra Herencia, sufres Desventaja en Salvaciones de Cuerpo contra malestar o intoxicación leve hasta completar un Descanso Corto o recibir tratamiento.'
  },
  {
    id: 'movimiento-lento',
    name: 'Movimiento Lento',
    ph: -1,
    category: 'Movimiento',
    description: 'No puedes gastar tu Acción Principal ni tu Acción Rápida para desplazarte una segunda vez en el mismo turno: solo puedes moverte con tu Movimiento normal. No afecta a Reacciones ni a efectos que te muevan sin gastar acción. Si un efecto te deja en Movimiento nulo, tampoco puedes gastar acción para desplazarte dentro de Cerca. Es permanente. Es incompatible con Velocidad Mejorada y Arranque Forzado.',
    incompatibleWith: ['velocidad-mejorada', 'arranque-forzado']
  },
  {
    id: 'necesidad-de-humedad',
    name: 'Necesidad de Humedad',
    ph: -1,
    category: 'Físico',
    description: 'Tras una jornada completa en ambiente seco, caluroso o sin acceso razonable a agua, sufres Desventaja en tiradas de Cuerpo relacionadas con esfuerzo prolongado, marcha o soportar el entorno. Termina al hidratarte y pasar al menos una hora fuera de la exposición extrema.'
  },
  {
    id: 'olor-distintivo',
    name: 'Olor Distintivo',
    ph: -1,
    category: 'Social',
    description: 'Sufres Desventaja en Sigilo o disfraz cuando el objetivo pueda detectarte por olor. No aplica si cubres el olor con preparación adecuada, viento favorable, barro, agua, humo o perfumes fuertes.'
  },
  {
    id: 'piel-delicada',
    name: 'Piel Delicada',
    ph: -1,
    category: 'Físico',
    description: 'Mientras estés expuesto a abrasión, arena, sal, ceniza, vegetación cortante o superficies irritantes sin protección, sufres Desventaja en Cuerpo para resistir irritación, dolor superficial o desgaste ambiental.'
  },
  {
    id: 'reaccion-instintiva',
    name: 'Reacción Instintiva',
    ph: -1,
    category: 'Mental',
    description: 'Ante un estímulo biológico definido al crear la Herencia, debes superar Salvación de Aura ND 10 para actuar con normalidad si el estímulo es intenso. Si fallas, sufres Desventaja en Aura para autocontrol, paciencia o atención mientras el estímulo siga presente.'
  },
  {
    id: 'respiracion-exigente',
    name: 'Respiración Exigente',
    ph: -1,
    category: 'Físico',
    description: 'En aire viciado, humo, polvo denso, gran altitud, túneles mal ventilados o ambientes donde respirar sea difícil, sufres Desventaja en Salvaciones de Cuerpo contra asfixia, tos o fatiga respiratoria.'
  },
  {
    id: 'sensibilidad-sonora',
    name: 'Sensibilidad Sonora',
    ph: -1,
    category: 'Mental',
    description: 'Ante ruido extremo, explosiones cercanas, campanas, chillidos o vibraciones intensas, sufres Desventaja en percepción auditiva, concentración o acciones de calma precisa mientras dure el ruido y unos minutos después. En combate dura hasta el final del próximo turno, o hasta el turno siguiente si fue especialmente intenso.'
  },
  {
    id: 'sin-sentido-del-olfato',
    name: 'Sin Sentido del Olfato',
    ph: -1,
    category: 'Físico',
    description: 'No puedes percibir olores. Sufres Desventaja en tiradas donde el olfato sea una vía relevante de información. No aplica si la información puede obtenerse claramente por otros sentidos o herramientas.'
  },
  {
    id: 'sueno-pesado',
    name: 'Sueño Pesado',
    ph: -1,
    category: 'Mental',
    description: 'Mientras duermes, sufres Desventaja en tiradas para despertar ante ruidos, movimientos sutiles o peligros poco evidentes. Termina al despertar por completo, recibir daño, ser sacudido o ante estímulos evidentes como gritos, golpes fuertes o fuego cercano.'
  },
  {
    id: 'torpeza-manual',
    name: 'Torpeza Manual',
    ph: -1,
    category: 'Físico',
    description: 'Sufres Desventaja en tareas de precisión fina con herramientas pequeñas, mecanismos delicados, costura, cirugía precisa o manipulación minuciosa. No aplica con herramientas adaptadas, tiempo suficiente o tareas que no requieran precisión fina.'
  },
  {
    id: 'voz-inusual',
    name: 'Voz Inusual',
    ph: -1,
    category: 'Social',
    description: 'Sufres Desventaja para disfrazar tu voz, imitar voces, hacerte pasar por otra Herencia o hablar sin llamar la atención ante oyentes atentos. No aplica mediante escritura, señas, intermediarios, magia de traducción o máscaras vocales.'
  },
];

// 14 Desventajas Medias (-2 PH)
export const DESVENTAJAS_MEDIAS: Trait[] = [
  {
    id: 'aversion-solar',
    name: 'Aversión Solar',
    ph: -2,
    category: 'Físico',
    description: 'Bajo luz solar directa sin protección, sufres Desventaja en percepción visual, ataques a distancia, rastreo visual, lectura de detalles, sigilo en espacios abiertos y concentración visual sostenida. Dura mientras estés expuesto y unos minutos después.'
  },
  {
    id: 'cuerpo-aparatoso',
    name: 'Cuerpo Aparatoso',
    ph: -2,
    category: 'Físico',
    description: 'En espacios estrechos, mobiliario común, vehículos pequeños, túneles bajos, ropa estándar o estructuras diseñadas para Humes, sufres Desventaja en Destreza para sigilo físico, acrobacias, pasar por espacios estrechos o maniobrar con precisión.'
  },
  {
    id: 'desafinidad-elemental',
    name: 'Desafinidad Elemental',
    ph: -2,
    category: 'Mental',
    description: 'Al crear la Herencia, elige un elemento (Fuego, Agua, Tierra, Metal o Madera). El coste en PX para aprender Conjuros de ese elemento aumenta en 20%, redondeando hacia abajo. Puede tomarse hasta dos veces con elementos distintos. No puede combinarse con Afinidad con un elemento del mismo elemento. No afecta a Conjuros Sin Afinidad. Es permanente.'
  },
  {
    id: 'fisico-inusual',
    name: 'Físico Inusual',
    ph: -2,
    category: 'Físico',
    description: 'No puedes usar armas, armaduras, ropa, monturas o equipo corporal diseñado para Humes o complexiones estándar sin adaptarlo. El coste de adaptación, fabricación o compra especializada se duplica.'
  },
  {
    id: 'incomprension-emocional',
    name: 'Incomprensión Emocional',
    ph: -2,
    category: 'Social',
    description: 'Sufres Desventaja al interpretar emociones, deseos, intenciones afectivas, indirectas emocionales o señales sociales sutiles de criaturas cuya expresión emocional sea distinta a la de tu Herencia.'
  },
  {
    id: 'necesidad-alimentaria-especifica',
    name: 'Necesidad Alimentaria Específica',
    ph: -2,
    category: 'Físico',
    description: 'Si pasas más del periodo definido sin consumir un alimento necesario, no puedes beneficiarte de Descansos Largos para recuperar Resistencia ni reducir Fatiga causada por esta Desventaja. Cada periodo adicional añade 1 nivel de Fatiga no eliminable por descanso normal. Termina al consumir el alimento suficiente y completar un Descanso Largo.'
  },
  {
    id: 'sensibilidad-a-materiales',
    name: 'Sensibilidad a Materiales',
    ph: -2,
    category: 'Físico',
    description: 'Mientras mantengas contacto directo con un material dañino definido al crear la Herencia, sufres Desventaja en Cuerpo y Destreza relacionadas con esfuerzo, combate, concentración física o movimiento preciso. Termina al romper el contacto o cubrir la zona afectada.'
  },
  {
    id: 'torpeza-social-profunda',
    name: 'Torpeza Social Profunda',
    ph: -2,
    category: 'Social',
    description: 'En interacciones formales, diplomáticas, cortesanas, rituales o cargadas de etiqueta, sufres Desventaja en tiradas sociales para agradar, negociar, persuadir con cortesía, ocultar incomodidad o actuar según normas esperadas. Termina cuando la interacción deja de depender de protocolo o alguien te guía explícitamente.'
  },
  {
    id: 'vulnerabilidad-elemental',
    name: 'Vulnerabilidad Elemental',
    ph: -2,
    category: 'Combate',
    description: 'Cuando recibes daño de un tipo elegido al crear la Herencia, recibes +2 de daño adicional. Es permanente, pero puede mitigarse con equipo, cobertura, Conjuros o preparación.'
  },
  {
    id: 'ritmo-biologico-rigido',
    name: 'Ritmo Biológico Rígido',
    ph: -2,
    category: 'Físico',
    description: 'Cuando actúas de forma sostenida contra el ciclo natural de tu Herencia, sufres Desventaja en Cuerpo o Aura relacionadas con esfuerzo prolongado, concentración, paciencia, autocontrol o resistencia al cansancio. Termina tras descansar al menos 4 horas en un periodo compatible, completar Descanso Largo o compensar el desajuste con preparación adecuada.'
  },
  {
    id: 'debilidad-de-recuperacion',
    name: 'Debilidad de Recuperación',
    ph: -2,
    category: 'Físico',
    description: 'Recuperas la mitad de Resistencia mediante Descansos Cortos, redondeando hacia abajo. Los Descansos Largos funcionan normalmente salvo regla contraria.'
  },
  {
    id: 'comunicacion-limitada',
    name: 'Comunicación Limitada',
    ph: -2,
    category: 'Social',
    description: 'Sufres Desventaja en tiradas sociales donde claridad verbal, tono, pronunciación, ritmo o expresión facial sean importantes frente a criaturas no acostumbradas a tu Herencia. No aplica con escritura, señas, traductor, magia de comunicación o interlocutores acostumbrados.'
  },
  {
    id: 'rechazo-espiritual',
    name: 'Rechazo Espiritual',
    ph: -2,
    category: 'Mental',
    description: 'Al crear la Herencia, elige si el rechazo proviene de criaturas Exaltadas o Corruptas. Frente al tipo elegido, sus lugares, reliquias o rituales, sufres Desventaja en Aura para ocultar presencia espiritual, resistir juicio sobrenatural, negociar o participar en rituales. Además, esas criaturas tienen actitud inicial al menos Desconfiada. Si afectara a Exaltadas y Corruptas a la vez, debe tratarse como Desventaja Mayor o requerir justificación fuerte.'
  },
  {
    id: 'instinto-de-huida',
    name: 'Instinto de Huida',
    ph: -2,
    category: 'Mental',
    description: 'Cuando una amenaza claramente superior te hiere, te supera en tamaño de forma evidente o reduce tu Resistencia a la mitad o menos, sufres Desventaja en Aura para mantener posición, actuar con valentía o resistir miedo mientras la amenaza siga activa y cercana. Para acercarte voluntariamente a ella, debes superar Salvación de Aura ND 11.'
  },
];

// 10 Desventajas Mayores (-3 PH)
export const DESVENTAJAS_MAYORES: Trait[] = [
  {
    id: 'vulnerabilidad-grave',
    name: 'Vulnerabilidad Grave',
    ph: -3,
    category: 'Combate',
    description: 'Cuando recibes daño de un tipo elegido, recibes +4 de daño adicional. El tipo debe ser concreto. Es permanente, aunque puede mitigarse con protección adecuada.'
  },
  {
    id: 'incapacidad-sensorial-grave',
    name: 'Incapacidad Sensorial Grave',
    ph: -3,
    category: 'Físico',
    description: 'Careces por completo de un sentido principal o este funciona de forma extremadamente limitada. Sufres Desventaja en tiradas donde ese sentido sea necesario y no puedes realizar acciones que dependan exclusivamente de él sin ayuda, herramientas o adaptación.'
  },
  {
    id: 'dependencia-vital',
    name: 'Dependencia Vital',
    ph: -3,
    category: 'Físico',
    description: 'Si pasas más de una jornada completa sin acceso a una sustancia, condición o práctica vital definida, no puedes beneficiarte de Descansos Largos para recuperar Resistencia ni reducir Fatiga causada por esta Desventaja. Cada jornada adicional añade 1 nivel de Fatiga no eliminable por descanso normal. Termina al satisfacer la dependencia y completar un Descanso Largo en condiciones adecuadas.'
  },
  {
    id: 'fisico-imposible',
    name: 'Físico Imposible',
    ph: -3,
    category: 'Físico',
    description: 'Tu anatomía es tan distinta que no puedes usar equipo corporal común sin fabricación especializada. Armas, armaduras, ropa, monturas, herramientas grandes y mobiliario deben diseñarse para tu Herencia. El coste de adaptación o fabricación especializada se triplica.'
  },
  {
    id: 'rechazo-social-generalizado',
    name: 'Rechazo Social Generalizado',
    ph: -3,
    category: 'Social',
    description: 'En comunidades donde tu Herencia es temida, perseguida o restringida, la actitud inicial hacia ti es al menos Desconfiada. Sufres Desventaja para obtener confianza, hospedaje, audiencia, protección legal o trato justo mientras tu Herencia sea reconocible.'
  },
  {
    id: 'incompatibilidad-espiritual-mayor',
    name: 'Incompatibilidad Espiritual Mayor',
    ph: -3,
    category: 'Mental',
    description: 'Elige una categoría espiritual amplia: Exaltados, Corruptos, espíritus naturales, no-muertos, entidades primigenias u otra aprobada. Las criaturas de esa categoría tienen actitud inicial Hostil o Desconfiada hacia ti. Bajo su influencia directa, lugares consagrados o rituales vinculados, sufres Desventaja en Salvaciones de Aura y tiradas sociales contra sus efectos, juicios o presiones.'
  },
  {
    id: 'torpeza-motriz-grave',
    name: 'Torpeza Motriz Grave',
    ph: -3,
    category: 'Movimiento',
    description: 'Sufres Desventaja en Destreza relacionada con acrobacias, sigilo físico, equilibrio dinámico, maniobras rápidas, esquiva narrativa, persecuciones a pie o manipulación precisa bajo presión. No aplica con equipo adaptado, sin presión de tiempo, asistencia adecuada o tareas de fuerza bruta.'
  },
  {
    id: 'debilidad-muscular-grave',
    name: 'Debilidad Muscular Grave',
    ph: -3,
    category: 'Físico',
    description: 'Sufres Desventaja en Cuerpo relacionado con levantar peso, cargar objetos pesados, empujar, arrastrar, romper, forzar puertas, resistir desplazamientos, mantener una presa, trepar por pura fuerza o soportar esfuerzo físico explosivo. No afecta Destreza ni acciones de precisión.'
  },
  {
    id: 'necesidad-depredadora',
    name: 'Necesidad Depredadora',
    ph: -3,
    category: 'Físico',
    description: 'Si pasas más del periodo definido sin cazar, consumir carne fresca, sangre animal, presa viva o realizar una conducta depredadora necesaria, sufres Desventaja en Aura para autocontrol, paciencia, trato pacífico, negociación calmada o resistir estímulos de hambre. Cada periodo adicional añade 1 nivel de Fatiga no eliminable por descanso normal. Termina al satisfacer la necesidad y completar Descanso Largo.'
  },
  {
    id: 'fragilidad-estructural',
    name: 'Fragilidad Estructural',
    ph: -3,
    category: 'Combate',
    description: 'Cuando recibes daño Contundente, Cortante o Penetrante, recibes +2 de daño adicional. Puede mitigarse con armadura, escudo, cobertura, Conjuros defensivos o protección adecuada.'
  },
];

export const ALL_TRAITS: Trait[] = [
  ...VENTAJAS_MENORES,
  ...VENTAJAS_MEDIAS,
  ...VENTAJAS_MAYORES,
  ...DESVENTAJAS_MENORES,
  ...DESVENTAJAS_MEDIAS,
  ...DESVENTAJAS_MAYORES,
].sort((a, b) => a.name.localeCompare(b.name, 'es'));

// 11 preguntas de la prueba final oficial del documento PAPA Engine
export const PAPA_CHECKLIST_QUESTIONS = [
  { id: 'balance', text: '¿Cierra exactamente en 0 PH?', autoRule: 'isBalanced' },
  { id: 'count', text: '¿Tiene entre 2 y 9 rasgos en total?', autoRule: 'isTraitCountValid' },
  { id: 'naturaleza', text: '¿Tiene una Naturaleza fija gratuita?', autoRule: 'hasNaturaleza' },
  { id: 'desventaja', text: '¿Incluye al menos una desventaja mecánica?', autoRule: 'hasDisadvantage' },
  { id: 'utilidad', text: '¿Sus ventajas aparecen lo suficiente para sentirse útiles?', autoRule: null },
  { id: 'jugabilidad', text: '¿Sus desventajas generan juego sin impedir participar?', autoRule: null },
  { id: 'estructura_desventaja', text: '¿Cada desventaja indica inicio, tiradas afectadas, duración y cierre?', autoRule: null },
  { id: 'sin_escena', text: '¿Evita "escena" como duración mecánica?', autoRule: null },
  { id: 'sin_primera_tirada', text: '¿Evita "primera tirada después de X"?', autoRule: null },
  { id: 'promesa_clara', text: '¿La Herencia tiene una promesa clara que un jugador entiende rápido?', autoRule: null },
  { id: 'bandas_distancia', text: '¿Mide todas las distancias en bandas y evita sumar más de 1 banda de movimiento adicional por turno desde rasgos de Herencia?', autoRule: 'movementBandValid' },
];

export interface HerenciaPreset {
  name: string;
  naturaleza: string;
  description: string;
  traitIds: string[];
}

export const PRESET_HERENCIAS: HerenciaPreset[] = [
  {
    name: 'Morador de las Cavernas (Quiróptero)',
    naturaleza: 'Cautelosamente',
    description: 'Humanoides adaptados a la penumbra perpetua de las simas profundas. Se orientan por ecolocalización y poseen extremidades aladas para planear entre grietas.',
    traitIds: ['ecolocalizacion', 'alas', 'vision-en-penumbra', 'aversion-solar', 'cuerpo-aparatoso'] // 2 + 1 + 1 - 2 - 2 = 0 PH (5 rasgos)
  },
  {
    name: 'Saurio del Pantano',
    naturaleza: 'Tenazmente',
    description: 'Cazadores reptilianos de piel escamosa y hábitos carnívoros voraces, capaces de respirar bajo el agua y acechar en el lodo.',
    traitIds: ['fisiologia-anfibia', 'armas-naturales-debiles', 'defensa-natural', 'apetito-voraz', 'necesidad-de-humedad', 'fragilidad-termica', 'parpados-nictitantes'] // 1 + 1 + 2 - 1 - 1 - 1 + 1 = +3? Wait: 1+1+2+1=5; -1-1-1 = -3. Let's adjust to 0!
  },
  {
    name: 'Titán de Roca',
    naturaleza: 'Metódicamente',
    description: 'Linaje de gigantes rocosos, resistentes como montañas pero lentos de reflejos y con dificultades para interactuar con la infraestructura común.',
    traitIds: ['tamano-grande', 'defensa-natural', 'duros-de-cabeza', 'movimiento-lento', 'cuerpo-aparatoso', 'torpeza-manual'] // +3 +2 +1 -1 -2 -1 = -1 -> wait: 3 + 2 + 1 = 6; -1 -2 -1 = -4. Let's balance!
  }
];

// Clean presets with exact 0 PH
PRESET_HERENCIAS[1].traitIds = ['fisiologia-anfibia', 'armas-naturales-debiles', 'defensa-natural', 'apetito-voraz', 'necesidad-de-humedad', 'torpeza-manual']; // +1 +1 +2 -1 -1 -1 = +1; let's balance:
// 1 + 1 + 2 = +4; -1 -1 -2 (cuerpo-aparatoso) = -4 -> sum = 0!
PRESET_HERENCIAS[1].traitIds = ['fisiologia-anfibia', 'armas-naturales-debiles', 'defensa-natural', 'apetito-voraz', 'necesidad-de-humedad', 'cuerpo-aparatoso']; // +1 +1 +2 -1 -1 -2 = 0 PH!

PRESET_HERENCIAS[2].traitIds = ['tamano-grande', 'defensa-natural', 'duros-de-cabeza', 'movimiento-lento', 'cuerpo-aparatoso', 'torpeza-motriz-grave']; // +3 +2 +1 -1 -2 -3 = 0 PH! (6 rasgos)
