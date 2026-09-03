import { TroubleshootingEntry } from '@/types/microbiology';

export const troubleshootingData: TroubleshootingEntry[] = [
  {
    id: 'ts-gram-stain-pink-positives',
    category: 'Staining',
    problemSymptom: 'Gram-positive bacteria (e.g. S. aureus, B. subtilis) staining pink/red instead of dark purple (False Gram-Negative)',
    possibleCauses: [
      'Over-decolorization: 95% Ethanol left on slide longer than 15-20 seconds, or pure acetone used too slowly.',
      'Aged bacterial culture: Culture is older than 24 hours. Autolytic enzymes have degraded the peptidoglycan wall.',
      'Excessive heat-fixing: Slide held in Bunsen flame too long, incinerating cell walls and creating pores.',
      'Smear too thin or washed off prior to iodine application.'
    ],
    diagnosticChecklist: [
      'How old was the bacterial colony used (hours)? [Ideal: 18-24 hrs]',
      'How many seconds was ethanol applied? [Ideal: 10-15s until runoff is faint]',
      'Was the slide uncomfortably hot to the back of the hand during heat fixing?'
    ],
    correctiveActions: [
      'Repeat Gram stain with a fresh subculture grown for 18-24 hours.',
      'Count drops of decolorizer (4-6 drops) and immediately flush with wash bottle water.',
      'Pass slide quickly through top third of flame only 2-3 times.'
    ],
    preventionMeasures: [
      'Always include a known control streak (e.g. fresh S. aureus and E. coli side-by-side) on the same slide.',
      'Use 1:1 ethanol-acetone mixture if pure acetone is too difficult to control.'
    ]
  },
  {
    id: 'ts-gram-stain-purple-negatives',
    category: 'Staining',
    problemSymptom: 'Gram-negative bacteria (e.g. E. coli) staining purple/violet instead of pink (False Gram-Positive)',
    possibleCauses: [
      'Under-decolorization: Ethanol was rinsed off too quickly (<5 seconds) or not agitated across smear.',
      'Smear too dense/thick: Inoculum was too heavy, forming clumps where alcohol cannot penetrate.',
      'Counterstain (Safranin) expired or washed off too quickly.'
    ],
    diagnosticChecklist: [
      'Is the smear opaque/cloudy to the naked eye on the slide? [Should be semi-transparent]',
      'Did crystal violet run completely clear before applying safranin?'
    ],
    correctiveActions: [
      'Prepare a much thinner emulsion: single colony touched lightly in a larger drop of water.',
      'Extend alcohol wash until no visible violet dye trails off the tilted slide.'
    ],
    preventionMeasures: [
      'Spread bacterial droplet across the entire central third of the glass slide to ensure single-cell monolayers.'
    ]
  },
  {
    id: 'ts-streak-lawn-no-single-colonies',
    category: 'Culture & Isolation',
    problemSymptom: 'Quadrant streak plate yielded confluent lawn growth with zero isolated single colonies',
    possibleCauses: [
      'Failure to flame-sterilize inoculating loop between streak sectors.',
      'Re-dipping the loop into original stock culture before streaking Sectors 2, 3, or 4.',
      'Streaking back into Sector 1 too many times instead of 1-2 cross-streaks.',
      'Moisture on agar surface allowing motile bacteria to swarm together.'
    ],
    diagnosticChecklist: [
      'Did you flame and COOL the loop before starting Sector 2 and Sector 3?',
      'Did you pick fresh culture from the stock tube more than once? [Must be done ONCE only!]',
      'Were agar plates pre-incubated or dried in laminar hood to remove condensation drops?'
    ],
    correctiveActions: [
      'Flame loop until glowing red, touch agar margin for 5 seconds to cool, pull 2 strokes from end of Sector 1, then zig-zag into Sector 2 without returning to Sector 1.',
      'Pre-dry inverted Petri dishes at 37°C for 30 minutes before streaking.'
    ],
    preventionMeasures: [
      'Draw quadrant guidelines on the base of the Petri dish with a marker before streaking.'
    ]
  },
  {
    id: 'ts-agar-failed-to-solidify',
    category: 'Media Preparation',
    problemSymptom: 'Poured agar media remains liquid or soft slushy gel at room temperature',
    possibleCauses: [
      'Agar was not completely dissolved/boiled before autoclaving.',
      'pH of media is too acidic (pH < 5.0) during autoclaving, which hydrolyzes agar polysaccharides into short non-gelling oligosaccharides.',
      'Insufficient agar powder weighed (standard is 1.5% w/v = 15 g/L).',
      'Media held at excessive temperature (>60°C) for too long before pouring.'
    ],
    diagnosticChecklist: [
      'Did the media solution reach a clear boiling state before or during autoclave cycle?',
      'Was pH adjusted to <5.0 prior to autoclaving (e.g., Sabouraud Dextrose or fruit extract media)?'
    ],
    correctiveActions: [
      'For acidic media (e.g. Potato Dextrose Agar pH 3.5), autoclave agar and acid/sugar components separately, or adjust pH after cooling to 50°C.',
      'Always boil media with stirring until completely transparent before bottling.'
    ],
    preventionMeasures: [
      'Check calibration of analytical balance before weighing agar powder.'
    ]
  },
  {
    id: 'ts-pcr-smear-non-specific',
    category: 'PCR & Gel Electrophoresis',
    problemSymptom: 'Agarose gel shows a continuous vertical smear or multiple non-specific bands instead of a crisp single target amplicon',
    possibleCauses: [
      'Annealing temperature ($T_m$) too low, permitting non-specific primer mispriming.',
      'Excessive template DNA (>100 ng) added, saturating primer binding kinetics.',
      'Excessive cycle count (>35-40 cycles) causing non-specific background amplification.',
      'MgCl2 concentration in reaction buffer too high (>3-4 mM).'
    ],
    diagnosticChecklist: [
      'What was the calculated annealing temperature relative to primer Tm? [Should be Tm - 3°C to 5°C]',
      'How much template DNA was loaded? [10-50 ng is optimal]'
    ],
    correctiveActions: [
      'Perform gradient PCR over a 50°C to 62°C range to determine optimal stringent annealing temperature.',
      'Dilute template DNA 1:10 or 1:50 with nuclease-free water.',
      'Switch to Hot-Start Taq Polymerase to prevent room-temperature mispriming.'
    ],
    preventionMeasures: [
      'Design primers with GC content 40-60% and avoid 3\' terminal complementarity to eliminate primer-dimers.'
    ]
  },
  {
    id: 'ts-cell-culture-contamination-fungal',
    category: 'Contamination',
    problemSymptom: 'Fuzzy cotton-like white/green/black filament mats floating on liquid broth or spreading over agar plates',
    possibleCauses: [
      'Airborne fungal mold spores (Penicillium, Aspergillus, Rhizopus) falling into vessels during inoculation.',
      'Laminar Flow Hood HEPA filter failure or working with hands over open vessel necks.',
      'Incubator humidity tray water stagnant and contaminated with mold.'
    ],
    diagnosticChecklist: [
      'Does the growth show filamentous hyphae under low power (10x) microscope?',
      'Has the incubator water tray been cleaned and treated with an antifungal agent (e.g. copper sulfate or Roccal)?'
    ],
    correctiveActions: [
      'Immediately autoclave and discard contaminated plates/flasks in biohazard bag (do not open contaminated plates on open bench).',
      'Thoroughly sanitize incubator chamber with 70% isopropanol and replace water tray with sterile distilled water.'
    ],
    preventionMeasures: [
      'Never pass hands/arms directly over open bottles or Petri dishes.',
      'Work within 6 inches of the center of certified Biosafety Cabinets.'
    ]
  }
];
