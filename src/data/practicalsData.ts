import { Practical } from '@/types/microbiology';

export const practicalsData: Practical[] = [
  // ==========================
  // BSC LEVEL PRACTICALS
  // ==========================
  {
    id: 'bsc-gram-staining',
    title: 'Differential Staining: Gram Staining of Unknown Bacterial Cultures',
    level: 'BSc',
    category: 'Staining & Microscopy',
    durationEstimate: '45 mins',
    biosafetyLevel: 'BSL-1',
    summary: 'The fundamental differential staining procedure to distinguish bacteria into Gram-positive and Gram-negative based on peptidoglycan cell wall architecture.',
    aim: 'To perform Gram staining on given bacterial cultures, observe cell morphology and arrangement under oil immersion (100x), and classify them as Gram-positive or Gram-negative.',
    principle: 'Gram staining differentiates bacteria by the chemical and physical properties of their cell walls. Gram-positive bacteria possess a thick, multilayered peptidoglycan meshwork (50-90% of wall) with teichoic acids, whereas Gram-negative bacteria have a thin single layer of peptidoglycan (10%) surrounded by a lipopolysaccharide (LPS) outer membrane. Primary stain (Crystal Violet) enters all cells. Gram\'s Iodine acts as a mordant forming an insoluble Crystal Violet-Iodine (CV-I) complex. Decolorizer (95% ethanol/acetone) dehydrates the thick peptidoglycan in Gram-positives, trapping the CV-I complex (cells remain purple). In Gram-negatives, alcohol dissolves the outer lipid membrane and washes out the CV-I through the porous thin peptidoglycan. Counterstain (Safranin) then stains the colorless Gram-negative cells pink/red.',
    reactionMechanism: 'Crystal Violet (Basic Dye) + Gram\'s Iodine (Mordant) -> Insoluble CV-I complex. Alcohol Decolorization: Dehydrates Gram-positive peptidoglycan pores (locks in dye); Dissolves Gram-negative lipid-rich outer membrane (washes out dye). Safranin: Cationic counterstain binds negatively charged cellular nucleic acids/proteins.',
    requirements: {
      microorganisms: ['Staphylococcus aureus (Gram +ve cocci in clusters)', 'Escherichia coli (Gram -ve bacilli)'],
      reagents: [
        'Crystal Violet (0.5% aqueous)',
        'Gram\'s Iodine solution (1g I2 + 2g KI in 300mL H2O)',
        '95% Ethanol or Decolorizer (Ethanol:Acetone 1:1)',
        'Safranin (0.25% aqueous)',
        'Cedarwood Immersion Oil',
        'Distilled Water'
      ],
      glasswareEquipment: [
        'Clean grease-free glass slides',
        'Inoculating loop (Nichrome/Platinum)',
        'Bunsen burner / Spirit lamp',
        'Staining rack and wash bottle',
        'Bibulous/Blotting paper',
        'Compound Light Microscope with 100x Oil Immersion Objective'
      ],
      safetyPPE: ['Laboratory coat', 'Nitrile gloves', 'Safety goggles']
    },
    protocol: [
      {
        stepNumber: 1,
        title: 'Smear Preparation & Heat Fixing',
        description: 'Place a small drop of sterile water/saline on a clean, grease-free slide. Using a sterilized, cooled loop, touch a bacterial colony and emulsify in the drop to form a thin, uniform, milky suspension. Allow it to completely AIR DRY at room temperature. Pass the slide through the upper flame of a Bunsen burner 2-3 times (smear facing up) to coagulate cellular proteins and fix cells to the glass.',
        criticalWarning: 'Do NOT overheat the slide in the flame, as this distorts cell morphology and ruptures cell walls, causing Gram-positives to stain falsely negative.',
        durationSeconds: 120,
        tip: 'Check temperature on the back of your wrist; it should feel comfortably hot, not burning.'
      },
      {
        stepNumber: 2,
        title: 'Primary Staining (Crystal Violet)',
        description: 'Place the slide on a horizontal staining rack. Flood the heat-fixed smear completely with Crystal Violet solution. Let it stand for 60 seconds.',
        durationSeconds: 60,
        tip: 'Ensure the entire smear area is covered with dye without drying out.'
      },
      {
        stepNumber: 3,
        title: 'Rinse with Water',
        description: 'Tilt the slide and gently wash off the excess dye using a slow stream of distilled water from a wash bottle. Direct the stream above the smear so water flows across it gently.',
        durationSeconds: 10
      },
      {
        stepNumber: 4,
        title: 'Mordant Application (Gram\'s Iodine)',
        description: 'Flood the smear with Gram\'s Iodine solution. Allow it to react for 60 seconds. Iodine forms a large coordinate complex with crystal violet within the peptidoglycan matrix.',
        durationSeconds: 60
      },
      {
        stepNumber: 5,
        title: 'Rinse with Water',
        description: 'Gently rinse the slide with distilled water to remove excess iodine.',
        durationSeconds: 10
      },
      {
        stepNumber: 6,
        title: 'Critical Decolorization (95% Ethanol)',
        description: 'Hold the slide tilted at a 45-degree angle over the sink. Apply 95% Ethanol drop by drop onto the upper end of the slide until the runoff stream runs clear/faint violet (typically 10 to 20 seconds). Immediately rinse with water to halt the decolorization reaction.',
        criticalWarning: 'This is the most time-sensitive step! Over-decolorizing will make Gram-positive cells pink. Under-decolorizing will leave Gram-negative cells purple.',
        durationSeconds: 15,
        tip: 'Count drops (usually 5-8 drops) or look for when the violet color ceases streaming off.'
      },
      {
        stepNumber: 7,
        title: 'Counterstaining (Safranin)',
        description: 'Flood the smear with Safranin counterstain. Let it stand for 45 to 60 seconds to impart a contrasting pink/red color to decolorized Gram-negative cells.',
        durationSeconds: 45
      },
      {
        stepNumber: 8,
        title: 'Final Wash & Gentle Blotting',
        description: 'Gently wash with distilled water until runoff is clear. Blot the slide dry gently between sheets of bibulous paper or allow to air dry. Do not wipe the smear surface.',
        durationSeconds: 30
      },
      {
        stepNumber: 9,
        title: 'Microscopic Examination (100x Oil Immersion)',
        description: 'Focus first under 10x, then 40x. Place a single drop of immersion oil directly onto the dry smear. Swing the 100x oil immersion lens into the oil drop. Adjust the iris diaphragm and condenser to the top for maximum light and resolution.',
        durationSeconds: 180,
        tip: 'Never drag the 40x objective through immersion oil.'
      }
    ],
    expectedObservations: {
      positiveResult: 'Deep Purple/Violet spherical cells arranged in clusters or chains (Gram-positive, e.g., Staphylococcus aureus, Bacillus subtilis).',
      negativeResult: 'Pink to Red rod-shaped or curved cells (Gram-negative, e.g., Escherichia coli, Pseudomonas aeruginosa).',
      visualDescription: 'Gram-positive cells appear intense crystal violet / dark royal purple. Gram-negative cells appear bright pinkish-red.',
      interpretationGuide: 'Gram-positive retain Crystal Violet-Iodine complex due to thick peptidoglycan. Gram-negative lose primary dye during ethanol treatment and absorb Safranin.'
    },
    troubleshootingTips: [
      'Gram-positive cells appearing pink: Culture is older than 24 hours (autolysis of peptidoglycan), or decolorization with alcohol was too long (>20s), or excessive heat fixing burned the cell walls.',
      'Gram-negative cells appearing purple: Decolorizer was not applied long enough, smear was too thick, or iodine wash was insufficient.',
      'Crystalline precipitates on slide: Crystal violet solution was not filtered or was allowed to evaporate/dry on the slide.',
      'No cells visible: Smear washed away because it was not heat-fixed, or slide was viewed upside down.'
    ],
    vivaQuestions: [
      {
        question: 'What is the role of Gram\'s Iodine in the staining procedure?',
        answer: 'Iodine acts as a chemical mordant. It reacts with crystal violet to form a large, water-insoluble Crystal Violet-Iodine (CV-I) complex that becomes physically trapped within the thick multilayered peptidoglycan mesh of Gram-positive cell walls.'
      },
      {
        question: 'Why must cultures used for Gram staining be young (18-24 hours)?',
        answer: 'Old cultures (>24 hours) undergo cellular aging and autolytic enzyme activity, causing degradation and thinning of the peptidoglycan layer. Consequently, older Gram-positive bacteria cannot retain the CV-I complex and stain falsely Gram-negative.'
      },
      {
        question: 'What happens if you reverse the order of Crystal Violet and Safranin?',
        answer: 'Safranin as a primary stain followed by iodine does not form the same stable locked complex. Furthermore, crystal violet is much darker and would overpower safranin regardless of wall structure, rendering all cells purple.'
      }
    ],
    faqs: [
      {
        question: 'Can acetone be used instead of 95% ethanol?',
        answer: 'Yes, pure acetone or an acetone-alcohol mixture (1:1) can be used, but acetone is an extremely rapid decolorizer (2-5 seconds) and requires rapid handling to avoid over-decolorization.'
      },
      {
        question: 'Are there any bacteria that cannot be Gram-stained?',
        answer: 'Yes. Mycoplasma (lack peptidoglycan cell walls), Mycobacterium species (thick waxy mycolic acid layer requiring Acid-Fast Ziehl-Neelsen stain), and Spirochetes (Treponema pallidum - too thin to resolve under standard light microscopy).'
      }
    ],
    tags: ['Gram Stain', 'Differential Staining', 'Cell Wall', 'Microscopy', 'BSc', 'Diagnostic']
  },

  {
    id: 'bsc-endospore-staining',
    title: 'Special Staining: Endospore Staining by Schaeffer-Fulton Method',
    level: 'BSc',
    category: 'Staining & Microscopy',
    durationEstimate: '40 mins',
    biosafetyLevel: 'BSL-1',
    summary: 'Differential staining technique using heat as a physical mordant to drive primary dye into resilient bacterial endospores (Bacillus and Clostridium).',
    aim: 'To detect and differentiate bacterial endospores from vegetative cells in sporulating cultures using the Schaeffer-Fulton malachite green method.',
    principle: 'Endospores are metabolically dormant, tough, non-reproductive survival structures produced by genera like Bacillus and Clostridium. Their thick keratinaceous spore coats, dipicolinic acid-calcium complexes (Ca-DPA), and dehydrated core make them impervious to standard dyes. In the Schaeffer-Fulton technique, steam heat acts as a physical mordant to expand spore coat pores and drive the water-soluble primary stain, Malachite Green, into the endospore. Once cooled, the spore coat contracts, trapping the dye. Vegetative cells are easily decolorized with tap water because Malachite Green has weak affinity for cellular components. Safranin is then applied to counterstain vegetative cells pink.',
    requirements: {
      microorganisms: ['Bacillus subtilis or Bacillus megaterium (48-72 hour nutrient agar culture)'],
      reagents: ['Malachite Green (5% aqueous)', 'Safranin (0.5% aqueous)', 'Distilled water'],
      glasswareEquipment: ['Beaker with boiling water on hotplate for steam bath', 'Staining rack', 'Forceps', 'Glass slides', 'Inoculating loop', 'Microscope (100x)'],
      safetyPPE: ['Lab coat', 'Heat-resistant gloves', 'Eye protection']
    },
    protocol: [
      {
        stepNumber: 1,
        title: 'Smear Preparation and Heat Fixing',
        description: 'Prepare a thin smear of Bacillus culture (from a 48h sporulating agar slant). Air dry and heat fix gently.',
        durationSeconds: 120
      },
      {
        stepNumber: 2,
        title: 'Steam-Assisted Primary Staining (Malachite Green)',
        description: 'Place slide over a steaming beaker of water on a wire gauze. Place a small strip of blotting/filter paper over the smear to prevent dye precipitation. Flood with 5% Malachite Green. Steam continuously for 5 to 7 minutes, replenishing dye if it begins to dry.',
        criticalWarning: 'Do NOT allow the stain to dry on the slide while steaming. Add fresh drops of Malachite Green periodically.',
        durationSeconds: 360,
        tip: 'Gentle steam is sufficient; do not boil the stain vigorously.'
      },
      {
        stepNumber: 3,
        title: 'Cool and Decolorize with Water',
        description: 'Remove the filter paper strip with forceps. Allow slide to cool to room temperature. Rinse thoroughly with a gentle stream of tap/distilled water for 30 seconds until runoff is clear.',
        durationSeconds: 40
      },
      {
        stepNumber: 4,
        title: 'Counterstain (Safranin)',
        description: 'Flood the slide with Safranin solution and incubate for 60 to 90 seconds at room temperature.',
        durationSeconds: 60
      },
      {
        stepNumber: 5,
        title: 'Wash, Dry & View under Oil Immersion',
        description: 'Rinse with water, blot dry with bibulous paper, and examine under 100x oil immersion objective.',
        durationSeconds: 120
      }
    ],
    expectedObservations: {
      positiveResult: 'Bright green oval/spherical structures representing endospores (central, sub-terminal, or terminal) and free spores.',
      negativeResult: 'Pink/red vegetative bacilli with no green internal structures.',
      visualDescription: 'Endospores appear brilliant emerald green; vegetative bacterial cells appear pink/red rods.',
      interpretationGuide: 'Dormant endospores retain Malachite Green due to heat penetration into the spore coat; vegetative cells wash out and take up Safranin.'
    },
    troubleshootingTips: [
      'No green spores seen: Culture is too young (<18 hours) before sporulation occurred. Use 48-72 hour nutrient agar starved cultures.',
      'Everything is stained green: Slide was not rinsed sufficiently with water to decolorize vegetative cytoplasm.',
      'Vegetative cells ruptured/destroyed: Slide was overheated during steaming.'
    ],
    vivaQuestions: [
      {
        question: 'Why is heat required to drive Malachite Green into endospores?',
        answer: 'Endospores have a heavily cross-linked proteinaceous spore coat rich in cysteine and dipicolinic acid that resists chemical penetration at room temperature. Heat expands the microscopic pores in the spore coat, permitting entry of the dye.'
      },
      {
        question: 'Why is water used as the decolorizer rather than ethanol?',
        answer: 'Malachite Green is water-soluble and binds very weakly to vegetative cytoplasm. Plain water easily washes it from vegetative cells without requiring harsh organic solvents like alcohol, which could strip dye from fragile spores.'
      }
    ],
    faqs: [
      {
        question: 'What is the clinical importance of endospores?',
        answer: 'Endospores allow pathogenic bacteria like Clostridium tetani (tetanus), Clostridium botulinum (botulism), Clostridium difficile (colitis), and Bacillus anthracis (anthrax) to survive autoclave failures, boiling, radiation, and disinfectants.'
      }
    ],
    tags: ['Endospore', 'Schaeffer-Fulton', 'Bacillus', 'Special Stain', 'BSc']
  },

  {
    id: 'bsc-serial-dilution-spc',
    title: 'Serial Dilution & Standard Viable Plate Count (CFU/mL)',
    level: 'BSc',
    category: 'Isolation & Pure Culture',
    durationEstimate: '60 mins + 24h incubation',
    biosafetyLevel: 'BSL-1',
    summary: 'Quantitative microbiological method to enumerate viable bacterial cells in liquid cultures, milk, or soil samples using serial dilution and spread/pour plating.',
    aim: 'To perform 10-fold serial dilutions of a bacterial broth culture, plate defined aliquots onto nutrient agar, and calculate the Colony Forming Units per milliliter (CFU/mL).',
    principle: 'A bacterial suspension typically contains millions to billions of cells/mL, making direct counting impossible. Serial dilution is a stepwise 10-fold ($10^{-1}$ to $10^{-7}$) dilution process in sterile saline/peptone water. A fixed volume (0.1 mL for spread plate, or 1.0 mL for pour plate) from each dilution tube is inoculated onto solid agar. After incubation at 37°C for 24-48 hours, plates yielding between 30 and 300 colonies are counted (statistically valid range). Each colony is assumed to originate from a single viable bacterial cell or clump (Colony Forming Unit).',
    reactionMechanism: 'Calculation Formula: CFU/mL = (Number of Colonies / Volume Plated in mL) * Dilution Factor (Reciprocal of Dilution).',
    requirements: {
      microorganisms: ['Overnight broth culture of Escherichia coli or Serratia marcescens'],
      reagents: ['Sterile 0.85% physiological saline or 0.1% peptone water blanks (9 mL each, 6-7 tubes)', '70% Ethanol for spreader sterilization'],
      glasswareEquipment: [
        'Sterile 90mm Nutrient Agar plates (pre-dried, 6 plates)',
        'Micropipettes (100 µL and 1000 µL) + sterile filter tips',
        'L-shaped glass spreader (hockey stick)',
        'Bunsen burner',
        'Vortex mixer',
        '37°C Bacteriological Incubator',
        'Colony counter / Quebec grid'
      ],
      safetyPPE: ['Lab coat', 'Nitrile gloves']
    },
    protocol: [
      {
        stepNumber: 1,
        title: 'Tube Labeling & Setup',
        description: 'Arrange 6 sterile test tubes in a rack, each containing exactly 9.0 mL of sterile saline. Label tubes sequentially: 10^-1, 10^-2, 10^-3, 10^-4, 10^-5, 10^-6.',
        durationSeconds: 60
      },
      {
        stepNumber: 2,
        title: 'Serial 10-fold Dilution Execution',
        description: 'Vortex the stock bacterial broth. Using a micropipette with a sterile tip, transfer 1.0 mL of stock culture into the 10^-1 tube (Total volume = 10 mL; dilution = 1:10 or 10^-1). Vortex the 10^-1 tube. With a FRESH tip, transfer 1.0 mL from 10^-1 into the 10^-2 tube. Repeat systematically across all tubes up to 10^-6, changing tips between each transfer.',
        criticalWarning: 'Always change pipette tips between every dilution tube! Reusing tips carries residual concentrated cells and ruins the dilution linearity.',
        durationSeconds: 300,
        tip: 'Vortex each tube for 5 seconds before withdrawing the next aliquot.'
      },
      {
        stepNumber: 3,
        title: 'Spread Plating (Aseptic Inoculation)',
        description: 'Label pre-dried Nutrient Agar plates with corresponding dilutions (10^-4, 10^-5, 10^-6). Pipette 100 µL (0.1 mL) of dilution onto the center of each plate.',
        durationSeconds: 180
      },
      {
        stepNumber: 4,
        title: 'Ethanol Flame Sterilization of Spreader',
        description: 'Dip L-shaped glass spreader in 70% ethanol, pass briefly through Bunsen flame to ignite, and allow flame to burn off. Touch the spreader to the sterile agar perimeter to cool. Spread the 0.1 mL liquid evenly across the entire agar surface while rotating the Petri dish.',
        criticalWarning: 'Never return a hot spreader to the ethanol jar; it will ignite the alcohol reservoir.',
        durationSeconds: 180
      },
      {
        stepNumber: 5,
        title: 'Incubation & Colony Counting',
        description: 'Allow plates to absorb liquid for 10 minutes. Invert plates and incubate at 37°C for 24 hours. Select plates with 30-300 colonies (Countable range). Plates with >300 are TNTC (Too Numerous To Count); plates <30 are TFTC (Too Few To Count).',
        durationSeconds: 120
      }
    ],
    expectedObservations: {
      positiveResult: 'Distinct, isolated, round colonies on countable plates (e.g., 85 colonies on 10^-5 plate).',
      visualDescription: 'Decreasing density of colonies across progressive dilution plates, transitioning from a confluent lawn to countable isolated dots.',
      interpretationGuide: 'For 85 colonies from 0.1 mL of 10^-5 dilution: CFU/mL = (85 / 0.1) * 10^5 = 85 * 10 * 10^5 = 8.5 * 10^7 CFU/mL.'
    },
    troubleshootingTips: [
      'Lawn growth on all plates: Pipetting error or dilutions not carried out far enough for high-density overnight cultures ($10^9$ CFU/mL).',
      'Zero colonies on all plates: Inoculum was spread with a red-hot glass spreader, killing all bacteria.',
      'Colonies clumped at plate margins: Plate was tilted before liquid was fully absorbed, or spreader was uneven.'
    ],
    vivaQuestions: [
      {
        question: 'Why is the 30 to 300 colony range chosen as statistically valid?',
        answer: 'Plates with fewer than 30 colonies have high statistical sampling error (Poisson variation). Plates with more than 300 colonies cause nutrient exhaustion, overcrowding, and colony overlapping where multiple cells fuse into a single colony, underestimating the true count.'
      },
      {
        question: 'Why do we report bacterial counts as "CFU" instead of "cells"?',
        answer: 'Because a single colony may arise from a single bacterium or a clump/chain of multiple bacteria (e.g. Staphylococci in clusters, Streptococci in chains) that cannot be separated during dilution.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Spread Plate and Pour Plate method?',
        answer: 'Spread plate inoculates 0.1 mL on pre-solidified agar (all colonies grow on surface, ideal for aerobes). Pour plate mixes 1.0 mL with molten agar (45°C) before solidification (colonies grow both on surface and embedded inside agar, suitable for microaerophiles).'
      }
    ],
    tags: ['Serial Dilution', 'CFU/mL', 'Standard Plate Count', 'Spread Plate', 'BSc', 'Quantification']
  },

  // ==========================
  // MSC LEVEL PRACTICALS
  // ==========================
  {
    id: 'msc-imvic-battery',
    title: 'IMViC Biochemical Battery for Enterobacteriaceae Identification',
    level: 'MSc',
    category: 'Biochemical Characterization',
    durationEstimate: '45 mins + 48h incubation',
    biosafetyLevel: 'BSL-2',
    summary: 'A definitive four-part biochemical testing battery (Indole, Methyl Red, Voges-Proskauer, Citrate) used to distinguish coliforms and members of Enterobacteriaceae (e.g., E. coli vs. Enterobacter aerogenes).',
    aim: 'To perform the IMViC series of tests on unknown Gram-negative bacilli to determine their metabolic profiles and differentiate enteric bacteria.',
    principle: '1. **Indole Test**: Microbes possessing tryptophanase hydrolyze tryptophan into indole, pyruvic acid, and ammonia. Indole reacts with p-dimethylaminobenzaldehyde (Kovac\'s reagent) to form a rosindole cherry-red ring at the solvent interface.\n2. **Methyl Red (MR) Test**: Detects mixed acid fermentation of glucose (producing lactic, acetic, succinic, formic acids). Sufficient organic acid lowers pH below 4.4, turning the Methyl Red indicator bright red (positive). At pH >6.0 it turns yellow (negative).\n3. **Voges-Proskauer (VP) Test**: Detects butylene glycol pathway where glucose is fermented into neutral acetoin (acetylmethylcarbinol). In the presence of atmospheric oxygen and 40% KOH + 5% alpha-naphthol (Barritt\'s reagents), acetoin oxidizes to diacetyl, reacting with peptone guanidine groups to produce a crimson-red complex.\n4. **Citrate Utilization Test**: Simmon\'s Citrate agar contains sodium citrate as sole carbon source and ammonium dihydrogen phosphate as sole nitrogen source. Bacteria with citrate permease convert ammonium salts into alkaline ammonia and sodium carbonate, raising pH above 7.6 and shifting bromothymol blue from green to Prussian blue.',
    reactionMechanism: 'Tryptophan --(Tryptophanase)--> Indole + Pyruvate + NH3. Indole + Kovac\'s (p-DMAB) -> Cherry red dye. Glucose -> Mixed Acids (MR +ve) OR Acetoin -> Diacetyl + Guanidine (VP +ve). Citrate -> Pyruvate + CO2; NH4+ -> NH3 (pH > 7.6 -> Bromothymol Blue turns Deep Blue).',
    requirements: {
      microorganisms: ['Escherichia coli (ATCC 25922)', 'Enterobacter aerogenes (ATCC 13048)', 'Klebsiella pneumoniae'],
      reagents: [
        '1% Tryptone Broth (for Indole)',
        'MR-VP Broth (Buffered Peptone Glucose)',
        'Simmons Citrate Agar slants',
        'Kovac\'s Reagent (p-DMAB in isoamyl alcohol + conc. HCl)',
        'Methyl Red indicator solution',
        'Barritt\'s Reagent A (5% w/v alpha-naphthol in absolute ethanol)',
        'Barritt\'s Reagent B (40% w/v potassium hydroxide KOH)',
        'Inoculating loop/needle',
        '37°C Incubator'
      ],
      glasswareEquipment: ['Sterile test tubes', 'Test tube racks', 'Dropping pipettes', 'Vortex mixer'],
      safetyPPE: ['Lab coat', 'Nitrile gloves', 'Chemical splash goggles']
    },
    protocol: [
      {
        stepNumber: 1,
        title: 'Aseptic Inoculation of Test Media',
        description: 'Label sets of 4 tubes for each organism (Tryptone broth, 2 MR-VP broths, and 1 Simmons Citrate slant). Inoculate lightly using an inoculating loop from a fresh 24h pure culture.',
        durationSeconds: 180
      },
      {
        stepNumber: 2,
        title: 'Incubation',
        description: 'Incubate all tubes at 35-37°C for 24 to 48 hours (48h is required for accurate MR and VP development).',
        durationSeconds: 60
      },
      {
        stepNumber: 3,
        title: 'Indole Development (Tryptone Broth)',
        description: 'Add 5 drops of Kovac\'s reagent directly to the incubated Tryptone broth. Gently agitate the tube and let stand for 2 minutes.',
        durationSeconds: 120,
        tip: 'Look for the top organic solvent layer separating.'
      },
      {
        stepNumber: 4,
        title: 'Methyl Red (MR) Reaction',
        description: 'Add 5 drops of Methyl Red indicator to the first MR-VP broth tube. Shake gently and observe immediate color change.',
        durationSeconds: 30
      },
      {
        stepNumber: 5,
        title: 'Voges-Proskauer (VP) Reaction',
        description: 'To the second MR-VP broth tube, add 6 drops of Barritt\'s Reagent A (alpha-naphthol) followed by 2 drops of Barritt\'s Reagent B (40% KOH). Shake vigorously to aerate the solution. Let stand uncovered for 15-30 minutes.',
        criticalWarning: 'Always add Reagent A first before Reagent B. Vigorous shaking is essential as oxidation of acetoin requires atmospheric oxygen.',
        durationSeconds: 900
      },
      {
        stepNumber: 6,
        title: 'Citrate Utilization Reading',
        description: 'Inspect Simmons Citrate slants for bacterial growth and color shift from forest green to intense royal/Prussian blue.',
        durationSeconds: 30
      }
    ],
    expectedObservations: {
      positiveResult: 'E. coli: Indole (+, cherry red), MR (+, bright red), VP (-, no color change/yellow), Citrate (-, green/no growth). IMViC Pattern: ++--.\nE. aerogenes: Indole (-, yellow ring), MR (-, yellow), VP (+, crimson red), Citrate (+, royal blue growth). IMViC Pattern: --++.',
      visualDescription: 'Indole: Cherry-red top band vs yellow band. MR: Vibrant red vs yellow. VP: Pink-red surface coloration vs copper/yellow. Citrate: Electric blue vs green.',
      interpretationGuide: 'Classic differentiation: E. coli is ++-- while Enterobacter/Klebsiella is --++.'
    },
    troubleshootingTips: [
      'False-negative VP test: Reading the test too early (<15 min) or failing to shake the tube for oxygen exposure.',
      'False-positive Citrate: Inoculating too heavily (carryover of broth nutrients permits growth without citrate utilization). Use a light needle stab/streak.'
    ],
    vivaQuestions: [
      {
        question: 'Why are MR and VP tests mutually exclusive for most Enterobacteriaceae?',
        answer: 'Bacteria typically direct pyruvate metabolism predominantly into either mixed acid pathways (generating persistent strong acids that keep pH low for MR +ve) or the 2,3-butanediol neutral pathway (producing acetoin and maintaining higher pH, rendering MR -ve and VP +ve).'
      },
      {
        question: 'Why is Simmons Citrate agar green at neutral pH?',
        answer: 'The medium contains bromothymol blue indicator, which is green at neutral pH (6.8-7.0), yellow at acidic pH (<6.0), and vivid blue at alkaline pH (>7.6).'
      }
    ],
    faqs: [
      {
        question: 'What does IMViC stand for?',
        answer: 'I = Indole, M = Methyl Red, V = Voges-Proskauer, i = small "i" added for phonetic pronunciation, C = Citrate.'
      }
    ],
    tags: ['IMViC', 'Enteric Bacteria', 'E. coli', 'Biochemical', 'MSc', 'Diagnostic']
  },

  {
    id: 'msc-kirby-bauer-ast',
    title: 'Kirby-Bauer Antibiotic Susceptibility Testing & Zone of Inhibition (CLSI Standards)',
    level: 'MSc',
    category: 'Antimicrobial & Pharmacological',
    durationEstimate: '45 mins + 18h incubation',
    biosafetyLevel: 'BSL-2',
    summary: 'Standardized agar disc diffusion assay to evaluate bacterial susceptibility to antimicrobial agents and determine resistance profiles per CLSI clinical guidelines.',
    aim: 'To perform Kirby-Bauer disc diffusion on bacterial test isolates using standardized McFarland inoculum and measure zones of inhibition in millimeters to categorize strains as Susceptible (S), Intermediate (I), or Resistant (R).',
    principle: 'Antimicrobial impregnated filter paper discs are placed onto a Mueller-Hinton Agar (MHA) plate uniformly seeded with a standardized bacterial suspension (0.5 McFarland standard = ~1.5 * 10^8 CFU/mL). The antibiotic diffuses radially outward through the agar, establishing a decreasing concentration gradient. Bacterial growth occurs where antibiotic concentration is below the Minimum Inhibitory Concentration (MIC), forming a clear circular zone of inhibition (ZOI). The diameter of clearing (in mm) is inversely proportional to MIC and is matched against CLSI clinical breakpoints.',
    requirements: {
      microorganisms: ['Staphylococcus aureus (ATCC 25923)', 'Escherichia coli (ATCC 25922)', 'Pseudomonas aeruginosa (ATCC 27853)'],
      reagents: [
        'Mueller-Hinton Agar (MHA) plates (4mm depth precisely)',
        '0.5 McFarland Turbidity Standard (Barium Chloride + Sulfuric acid)',
        'Sterile 0.85% Saline tubes',
        'Antibiotic Discs: Penicillin (10 U), Ampicillin (10 µg), Ciprofloxacin (5 µg), Tetracycline (30 µg), Gentamicin (10 µg), Vancomycin (30 µg)',
        'Sterile cotton swabs'
      ],
      glasswareEquipment: ['Vernier caliper / Millimeter ruler', 'Disc dispenser or sterile fine forceps', 'Vortex', '37°C Incubator'],
      safetyPPE: ['Lab coat', 'Gloves', 'Safety glasses']
    },
    protocol: [
      {
        stepNumber: 1,
        title: '0.5 McFarland Inoculum Standardization',
        description: 'Touch 3-5 isolated colonies with a sterile loop and suspend in 4 mL sterile saline. Vortex and visually match turbidity against the 0.5 McFarland standard using a Wickerham card (black lines).',
        durationSeconds: 120,
        tip: 'Check turbidity against a card with black lines under good light.'
      },
      {
        stepNumber: 2,
        title: 'Lawn Inoculation of Mueller-Hinton Agar',
        description: 'Dip a sterile cotton swab into the suspension. Press and rotate the swab against the inside tube wall to remove excess liquid. Streak the entire surface of the MHA plate in three directions (rotating the plate 60° each time) to ensure an even, confluent bacterial lawn. Rim the outer perimeter.',
        criticalWarning: 'Inoculate within 15 minutes of preparing the McFarland suspension.',
        durationSeconds: 180
      },
      {
        stepNumber: 3,
        title: 'Antibiotic Disc Application',
        description: 'Allow the agar surface to dry for 3 to 5 minutes. Using sterile forceps or a multi-disc dispenser, place antibiotic discs at least 24 mm apart and 15 mm from the edge (max 6 discs per 90mm plate). Tap each disc gently to ensure firm contact.',
        criticalWarning: 'Once a disc touches agar, do NOT move it; antibiotic diffusion begins immediately upon contact.',
        durationSeconds: 180
      },
      {
        stepNumber: 4,
        title: 'Incubation',
        description: 'Invert plates within 15 minutes and incubate at 35±2°C for 16-18 hours in ambient air.',
        durationSeconds: 60
      },
      {
        stepNumber: 5,
        title: 'Zone of Inhibition Measurement',
        description: 'Measure the complete diameter of clear zones (including the 6mm disc) to the nearest millimeter using a caliper or ruler across the back of the inverted plate over a black non-reflecting surface.',
        durationSeconds: 300
      }
    ],
    expectedObservations: {
      positiveResult: 'Clear circular zones surrounding susceptible antibiotic discs (e.g. Ciprofloxacin: 26 mm -> Susceptible; Ampicillin: 11 mm -> Resistant).',
      visualDescription: 'Uniform confluent microbial lawn with distinct clear rings around active antibiotic discs.',
      interpretationGuide: 'Cross-reference diameter with CLSI M100 charts (e.g. Ciprofloxacin for Enterobacteriaceae: <=15mm R, 16-20mm I, >=21mm S).'
    },
    troubleshootingTips: [
      'Zones too small overall: Inoculum was too dense (>0.5 McFarland), or agar was too thick (>4mm), slowing diffusion.',
      'Zones too large overall: Inoculum was too dilute (<0.5 McFarland), or agar was too thin (<4mm).',
      'Colonies inside inhibition zone: Indicates resistant mutant sub-clones or mixed culture contamination.'
    ],
    vivaQuestions: [
      {
        question: 'Why is Mueller-Hinton Agar (MHA) the gold standard for Kirby-Bauer testing?',
        answer: 'MHA shows reproducible batch-to-batch consistency, low concentrations of sulfonamide/trimethoprim inhibitors (thymine/thymidine), supports most non-fastidious pathogens, and has ideal agar concentration (1.5%) for standardized molecular diffusion.'
      },
      {
        question: 'Why must MHA plates have a precise depth of 4 mm?',
        answer: 'Agar depth dictates vertical vs lateral diffusion rates. If agar is <4mm, antibiotics diffuse laterally faster, producing falsely large zones. If >4mm, downward diffusion dominates, producing falsely small zones.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between MIC and Zone of Inhibition?',
        answer: 'MIC (Minimum Inhibitory Concentration) is the exact lowest drug concentration (in µg/mL) that prevents visible growth in broth. Zone of inhibition is a qualitative/semi-quantitative agar diffusion surrogate calibrated to clinical MIC breakpoints.'
      }
    ],
    tags: ['Kirby-Bauer', 'Antibiotic Susceptibility', 'CLSI', 'Mueller-Hinton', 'MSc', 'Pharmacology']
  },

  {
    id: 'msc-growth-kinetics',
    title: 'Bacterial Growth Kinetics: Determination of Specific Growth Rate (µ) & Generation Time (g)',
    level: 'MSc',
    category: 'Growth Kinetics & Physiology',
    durationEstimate: '4 hours (30 min intervals)',
    biosafetyLevel: 'BSL-1',
    summary: 'Spectrophotometric quantification of bacterial batch growth phases (lag, log/exponential, stationary) and mathematical determination of doubling time.',
    aim: 'To plot a bacterial growth curve (OD600 vs. time), identify the exponential growth phase, and compute the specific growth rate constant (µ) and generation/doubling time (g).',
    principle: 'In a closed batch culture with excess nutrients, bacteria divide by binary fission, exhibiting exponential growth ($N_t = N_0 \cdot 2^n = N_0 \cdot e^{\mu t}$). Optical Density at 600 nm ($OD_{600}$) is directly proportional to biomass concentration via the Beer-Lambert law within linear range ($OD < 0.8$). Plotting $\ln(OD)$ vs. time yields a straight line during exponential phase whose slope represents specific growth rate ($\mu$). The generation/doubling time ($g$) is calculated as $g = \frac{\ln(2)}{\mu} = \frac{0.693}{\mu}$.',
    reactionMechanism: 'Differential equation: dX/dt = \mu * X. Integrated form: \ln(X2/X1) = \mu * (t2 - t1). Generation time: g = \ln(2) / \mu = 0.693 / \mu.',
    requirements: {
      microorganisms: ['Escherichia coli (fresh overnight culture in LB broth)'],
      reagents: ['Sterile Luria-Bertani (LB) or Nutrient Broth (250 mL in 500 mL Erlenmeyer flask)', 'Sterile blank broth'],
      glasswareEquipment: [
        'UV-Vis Spectrophotometer (set to 600 nm)',
        'Optical glass/plastic cuvettes (1 cm pathlength)',
        'Orbital shaking incubator (37°C @ 180 RPM)',
        'Micropipettes & tips',
        'Sterile sampling tubes'
      ],
      safetyPPE: ['Lab coat', 'Gloves']
    },
    protocol: [
      {
        stepNumber: 1,
        title: 'Inoculation & Zero-Time Measurement',
        description: 'Aseptically inoculate 250 mL pre-warmed LB broth with 2.5 mL (1% v/v) of overnight E. coli broth. Swirl gently. Immediately withdraw 2 mL, blank the spectrophotometer with sterile LB at 600 nm, and record OD600 at t = 0 min.',
        durationSeconds: 180
      },
      {
        stepNumber: 2,
        title: 'Incubation & Periodic Sampling',
        description: 'Place the flask in an orbital shaker at 37°C, 180 RPM. Aseptically withdraw 2 mL samples every 30 minutes for 3.5 to 4 hours. Record OD600 at each time interval.',
        durationSeconds: 14400,
        tip: 'If OD600 exceeds 0.8, dilute 1:2 or 1:5 in sterile broth to stay in spectrophotometer linear range, then multiply reading by dilution factor.'
      },
      {
        stepNumber: 3,
        title: 'Data Plotting (Semi-Log Growth Curve)',
        description: 'Plot time (minutes) on X-axis vs. OD600 (linear and log scale) on Y-axis. Identify Lag phase, Exponential (Log) phase, and onset of Stationary phase.',
        durationSeconds: 300
      },
      {
        stepNumber: 4,
        title: 'Kinetic Mathematical Calculation',
        description: 'Select two points (t1, OD1) and (t2, OD2) firmly within the linear exponential phase. Compute:\n\n$$\\mu = \\frac{\\ln(OD_2) - \\ln(OD_1)}{t_2 - t_1}$$\n\n$$g = \\frac{0.693}{\\mu}$$',
        durationSeconds: 300
      }
    ],
    expectedObservations: {
      positiveResult: 'Sigmoidal growth curve showing clear Lag phase (0-45m), Log phase (45-180m), and Stationary plateau (>180m).',
      visualDescription: 'Transmittance decreases and absorbance at 600nm climbs exponentially from ~0.05 to >1.5.',
      interpretationGuide: 'For E. coli in rich LB broth at 37°C, generation time g is typically 20-30 minutes, and µ is approximately 1.4 - 2.0 hr^-1.'
    },
    troubleshootingTips: [
      'Extended lag phase (>2 hours): Inoculum was taken from an old stationary-phase culture, or culture was shocked by cold media.',
      'Erratic non-linear readings at high cell density: Spectrophotometer detector saturation above OD 1.0. Always dilute concentrated samples.'
    ],
    vivaQuestions: [
      {
        question: 'Why is 600 nm wavelength used for bacterial growth measurement?',
        answer: 'Bacteria do not contain specific chromophores absorbing at 600 nm; rather, light is scattered (turbidimetry/Rayleigh-Tyndall scattering). 600 nm avoids damaging cells and bypasses absorption by media nutrients.'
      },
      {
        question: 'What factors trigger the onset of stationary phase in batch culture?',
        answer: 'Depletion of essential nutrients/carbon source, accumulation of toxic metabolic byproducts (organic acids, ammonia), drop in pH, and limiting dissolved oxygen.'
      }
    ],
    faqs: [
      {
        question: 'What is diauxic growth?',
        answer: 'A diphasic growth curve with two distinct exponential phases separated by a short lag phase, occurring when bacteria are grown in media containing two sugars (e.g. Glucose + Lactose; glucose is consumed first).'
      }
    ],
    tags: ['Growth Kinetics', 'Doubling Time', 'OD600', 'Spectrophotometry', 'MSc', 'Physiology']
  },

  // ==========================
  // PHD & RESEARCH LEVEL PRACTICALS
  // ==========================
  {
    id: 'phd-plasmid-dna-isolation',
    title: 'Alkaline Lysis Isolation of Plasmid DNA (Miniprep) & Nanodrop/Purity Analysis',
    level: 'PhD',
    category: 'Molecular Biology & Genetics',
    durationEstimate: '90 mins',
    biosafetyLevel: 'BSL-1',
    summary: 'Birnboim and Doly alkaline lysis protocol for high-yield, pure isolation of covalently closed circular (ccc) supercoiled plasmid DNA from recombinant E. coli with A260/A280 spectral quality analysis.',
    aim: 'To isolate plasmid DNA (pUC19/pBR322/pET28a) from transformed E. coli host cells via alkaline denaturation, selective renaturation, and column silica purification, followed by spectrophotometric yield and purity assessment.',
    principle: 'Bacterial cells are suspended in isotonic Tris-EDTA-RNase buffer (Solution I) and lysed with an alkaline detergent mix of SDS and Sodium Hydroxide (Solution II, pH ~12.5). SDS solubilizes membrane phospholipids and denatures proteins, while NaOH denatures both chromosomal and plasmid DNA into single strands. Neutralization buffer containing Potassium Acetate (Solution III, pH ~4.8) rapidly drops the pH. Small, covalently closed circular (ccc) supercoiled plasmid DNA strands remain topologically interlinked and rapidly snap-renature into double-stranded plasmids. Large chromosomal DNA cannot align properly and forms an insoluble tangled aggregate with SDS-potassium-protein complexes. Centrifugation pelleted the genomic debris, leaving purified plasmid DNA in the supernatant to be bound to silica membranes or ethanol precipitated.',
    reactionMechanism: 'Solution I: 50mM Tris-HCl pH 8.0, 10mM EDTA (chelates Mg2+ to inhibit DNases), 100 µg/mL RNase A. Solution II: 0.2N NaOH (denatures DNA), 1% SDS (cell lysis). Solution III: 3.0M Potassium Acetate pH 4.8 (forms insoluble KDS-protein-genomic DNA precipitate).',
    requirements: {
      microorganisms: ['E. coli DH5alpha or Top10 harboring pUC19/pET vector (overnight LB + Ampicillin broth)'],
      reagents: [
        'Resuspension Buffer P1 (50mM Tris-HCl pH 8.0, 10mM EDTA, 100µg/mL RNase A)',
        'Lysis Buffer P2 (200mM NaOH, 1% w/v SDS - freshly prepared)',
        'Neutralization Buffer P3 (3.0M Potassium Acetate pH 4.8 - chilled)',
        'Silica spin columns & collection tubes (or 100% Isopropanol and 70% Ethanol)',
        'Wash Buffer (Ethanol-based)',
        'Elution Buffer EB (10mM Tris-HCl pH 8.5) or sterile nuclease-free water'
      ],
      glasswareEquipment: ['Refrigerated microcentrifuge (13,000 RPM / 17,000 x g)', 'Vortex', 'Micro-volume UV Spectrophotometer (NanoDrop)'],
      safetyPPE: ['Lab coat', 'Nitrile gloves', 'Safety goggles']
    },
    protocol: [
      {
        stepNumber: 1,
        title: 'Cell Harvesting',
        description: 'Pellet 3.0 mL of overnight E. coli culture in a 1.5 mL microcentrifuge tube by spinning at 10,000 RPM (8,000 x g) for 2 minutes. Decant supernatant completely.',
        durationSeconds: 120
      },
      {
        stepNumber: 2,
        title: 'Cell Resuspension (Buffer P1)',
        description: 'Add 250 µL of chilled Buffer P1 with RNase A. Resuspend the bacterial pellet completely by vortexing or pipetting up and down until no cell clumps remain.',
        durationSeconds: 60,
        tip: 'Incomplete resuspension leads to poor lysis and low yield.'
      },
      {
        stepNumber: 3,
        title: 'Alkaline Lysis (Buffer P2)',
        description: 'Add 250 µL of Buffer P2. Mix gently by inverting the tube 4 to 6 times until the suspension clears and becomes viscous. Do NOT vortex.',
        criticalWarning: 'Never vortex during lysis! Vigorous agitation shears fragile genomic chromosomal DNA into fragments that co-purify with plasmid DNA.',
        durationSeconds: 180
      },
      {
        stepNumber: 4,
        title: 'Neutralization & Precipitation (Buffer P3)',
        description: 'Add 350 µL of chilled Buffer P3. Immediately invert the tube gently 6-8 times. A dense white curd-like precipitate of SDS-potassium-protein and chromosomal DNA forms.',
        durationSeconds: 60
      },
      {
        stepNumber: 5,
        title: 'Clarification Centrifugation',
        description: 'Centrifuge at 13,000 RPM (17,000 x g) for 10 minutes at 4°C. A tight, compact white pellet will form along the tube wall.',
        durationSeconds: 600
      },
      {
        stepNumber: 6,
        title: 'Silica Column Binding & Washing',
        description: 'Pipette the clear supernatant into a silica spin column. Centrifuge at 12,000 RPM for 60s (flow-through discarded). Add 750 µL ethanol Wash Buffer, spin 60s, discard wash. Spin empty column 2 minutes at 13,000 RPM to remove residual ethanol.',
        criticalWarning: 'Residual ethanol inhibits downstream PCR, restriction digestion, and sequencing.',
        durationSeconds: 240
      },
      {
        stepNumber: 7,
        title: 'Elution & Nanodrop Purity Analysis',
        description: 'Place column in clean 1.5 mL tube. Add 50 µL Elution Buffer directly to silica membrane center. Stand 2 mins, spin 1 min. Blank NanoDrop with Elution Buffer, load 1.5 µL plasmid DNA. Record concentration (ng/µL) and A260/A280, A260/A230 ratios.',
        durationSeconds: 180
      }
    ],
    expectedObservations: {
      positiveResult: 'Yield: 50-200 ng/µL of plasmid DNA. Purity: A260/A280 ratio between 1.80 and 1.95 (pure DNA). A260/A230 ratio > 2.0.',
      visualDescription: 'Clear, transparent solution in nuclease-free tube. Clean NanoDrop absorbance peak at exactly 260 nm.',
      interpretationGuide: 'A260/A280 < 1.7 indicates protein or phenol contamination. A260/A230 < 1.8 indicates salt/EDTA or carbohydrate carryover.'
    },
    troubleshootingTips: [
      'Low plasmid DNA yield: Inefficient cell lysis, old culture with lost antibiotic selection, or incomplete elution.',
      'Chromosomal DNA contamination (smear on agarose gel): Tubes were shaken/vortexed during or after adding Buffer P2.',
      'RNA contamination (low molecular weight smear on gel): Buffer P1 RNase A expired or degraded.'
    ],
    vivaQuestions: [
      {
        question: 'Why does plasmid DNA renature while chromosomal DNA precipitates during alkaline lysis?',
        answer: 'Plasmids are small, covalently closed circular (ccc) supercoiled molecules whose complementary strands remain intimately intertwined even when hydrogen bonds denature at pH 12.5. Chromosomal DNA is linear and huge (>4 Mb); upon denaturation, its long single strands dissociate and cannot re-align properly upon neutralization, precipitating with SDS-protein complexes.'
      },
      {
        question: 'What is the significance of the A260/A280 ratio in nucleic acid quality control?',
        answer: 'Nucleic acids absorb maximally at 260 nm (aromatic purine/pyrimidine bases), while proteins absorb maximally at 280 nm (tryptophan, tyrosine, phenylalanine). A ratio of 1.8 indicates pure DNA. A lower ratio indicates residual protein contamination.'
      }
    ],
    faqs: [
      {
        question: 'Can this plasmid DNA be directly used for Sanger sequencing or mammalian cell transfection?',
        answer: 'Yes, column-purified plasmid DNA is typically grade-sufficient for enzymatic digests, PCR, and Sanger sequencing. For mammalian transfection, endotoxin-free columns are recommended to remove bacterial LPS.'
      }
    ],
    tags: ['Plasmid Isolation', 'Alkaline Lysis', 'Miniprep', 'Molecular Biology', 'PhD', 'DNA Quality']
  },

  {
    id: 'phd-16s-rrna-pcr',
    title: 'Polymerase Chain Reaction (PCR) Amplification of 16S rRNA & Agarose Gel Electrophoresis',
    level: 'PhD',
    category: 'Molecular Biology & Genetics',
    durationEstimate: '3 hours',
    biosafetyLevel: 'BSL-1',
    summary: 'Universal PCR amplification of the 1,500 bp prokaryotic 16S ribosomal RNA gene using 27F and 1492R primers, followed by resolving bands on 1% agarose gel.',
    aim: 'To amplify the ~1.5 kb 16S rDNA sequence from unknown bacterial isolates using universal primers and verify amplicon size and specificity by agarose gel electrophoresis with DNA ladder.',
    principle: 'The 16S rRNA gene (~1,540 bp) is the gold standard taxonomic marker for bacterial phylogenetic identification due to alternating conserved and hypervariable regions (V1-V9). Universal forward primer 27F (5\'-AGAGTTTGATCMTGGCTCAG-3\') and reverse primer 1492R (5\'-TACGGYTACCTTGTTACGACTT-3\') anneal to highly conserved terminal flanking regions. PCR cycles through: (1) Initial denaturation at 95°C (melts dsDNA), (2) Annealing at ~52-55°C (primers hybridize specifically), (3) Extension at 72°C (Taq DNA polymerase synthesizes complementary strands $5\'\\rightarrow3\'$ at ~1 kb/min). Amplified DNA is resolved on a 1% agarose gel with GelRed/Ethidium Bromide under UV/Blue light.',
    requirements: {
      microorganisms: ['Bacterial genomic DNA template (10-50 ng)'],
      reagents: [
        '2X PCR Master Mix (Taq DNA Polymerase, 0.4 mM dNTPs, 4 mM MgCl2, reaction buffer)',
        'Forward Primer 27F (10 µM stock)',
        'Reverse Primer 1492R (10 µM stock)',
        'Nuclease-free PCR water',
        'Agarose (molecular biology grade)',
        '1X TAE or TBE Buffer',
        '1 kb DNA Ladder',
        '6X Gel Loading Dye',
        'GelRed or Ethidium Bromide nucleic acid stain'
      ],
      glasswareEquipment: [
        'Automated PCR Thermocycler',
        'Horizontal Gel Electrophoresis Tank & Power Supply',
        'UV Transilluminator / Blue Light Gel Documentation System',
        '0.2 mL thin-wall PCR tubes',
        'Pipettes (0.5-10 µL and 10-100 µL)'
      ],
      safetyPPE: ['Lab coat', 'Gloves', 'UV face shield / Amber filter glasses']
    },
    protocol: [
      {
        stepNumber: 1,
        title: 'Master Mix Preparation (25 µL Reaction)',
        description: 'Set up PCR reactions on ice. In sterile 0.2 mL PCR tubes, assemble:\n- 2X PCR Master Mix: 12.5 µL\n- Forward Primer 27F (10 µM): 1.0 µL (final 0.4 µM)\n- Reverse Primer 1492R (10 µM): 1.0 µL (final 0.4 µM)\n- Template DNA (20 ng/µL): 1.5 µL\n- Nuclease-free H2O: 9.0 µL\nTotal Volume: 25.0 µL. Include a No-Template Control (NTC) substituting water for DNA.',
        durationSeconds: 300,
        tip: 'Always prepare Master Mix on ice to prevent non-specific primer binding before thermocycling.'
      },
      {
        stepNumber: 2,
        title: 'Thermocycler Programming',
        description: 'Set program:\n1. Initial Denaturation: 95°C for 5 min (1 cycle)\n2. Denaturation: 95°C for 30 sec\n3. Annealing: 54°C for 45 sec\n4. Extension: 72°C for 90 sec\n(Repeat steps 2-4 for 30 cycles)\n5. Final Extension: 72°C for 10 min (1 cycle)\n6. Hold: 4°C infinite.',
        durationSeconds: 120
      },
      {
        stepNumber: 3,
        title: '1% Agarose Gel Casting',
        description: 'Weigh 0.5 g agarose in 50 mL 1X TAE buffer (1% w/v). Microwave for 60-90s until completely dissolved and crystal clear. Cool to ~55°C. Add 5 µL GelRed stain. Pour into casting tray with comb inserted. Allow 25 minutes to solidify.',
        durationSeconds: 1500
      },
      {
        stepNumber: 4,
        title: 'Sample Loading & Electrophoresis',
        description: 'Submerge gel in 1X TAE. Load 5 µL of 1 kb DNA ladder in Lane 1. Load 10 µL of PCR products with loading dye in subsequent lanes. Run at 90 Volts constant for 50-60 minutes.',
        durationSeconds: 3600
      },
      {
        stepNumber: 5,
        title: 'Gel Documentation & Sizing',
        description: 'Visualize gel on UV transilluminator or Blue LED gel doc system. Inspect for a single sharp band at ~1,500 base pairs.',
        durationSeconds: 180
      }
    ],
    expectedObservations: {
      positiveResult: 'A crisp, prominent single band at approximately 1,500 bp (1.5 kb) relative to the DNA ladder.',
      negativeResult: 'No bands in the No-Template Control (NTC) lane, confirming no master mix contamination.',
      visualDescription: 'Luminescent orange/green band aligned precisely at the 1.5 kb ladder rung under UV/Blue light.',
      interpretationGuide: '16S gene amplicon is ready for Sanger sequencing and BLAST taxonomic matching.'
    },
    troubleshootingTips: [
      'Smear in lane: Excess template DNA added, annealing temperature too low, or too many PCR cycles (>35).',
      'Primer-dimer band (<100 bp): Excess primer concentration or low annealing temperature. Increase annealing temp by 2°C.',
      'No band formed: Template DNA degraded, PCR inhibitor carryover (EDTA, phenol, ethanol), or failure of Taq polymerase.'
    ],
    vivaQuestions: [
      {
        question: 'Why is the 16S rRNA gene specifically chosen for bacterial identification over other genes?',
        answer: 'The 16S rRNA gene is present in all bacteria, has an essential conserved structural function (low mutation rate), contains interspersed variable regions that provide genus/species taxonomic resolution, and has standard universal primer sites (e.g. 27F/1492R).'
      },
      {
        question: 'What is the role of MgCl2 in a PCR reaction?',
        answer: 'Mg2+ ions act as an essential cofactor for Taq DNA Polymerase catalytic activity and stabilize the electrostatic repulsion between negative phosphate backbones of primers and template DNA.'
      }
    ],
    faqs: [
      {
        question: 'What is the next step after obtaining this 1,500 bp PCR band?',
        answer: 'PCR cleanup (silica column or ExoSAP-IT enzymatic digestion to remove primers and dNTPs), Sanger sequencing with 27F/1492R, contig assembly, and NCBI BLASTn searching for >=99% identity matching.'
      }
    ],
    tags: ['16S rRNA', 'PCR', 'Phylogenetics', 'Gel Electrophoresis', 'PhD', 'Molecular Biology']
  },

  {
    id: 'phd-bioreactor-fermentation',
    title: 'Microbial Bioreactor Fermentation: Batch Kinetics, DO Monitoring & Biomass Yield (Yx/s)',
    level: 'PhD',
    category: 'Fermentation & Enzymology',
    durationEstimate: '8-12 hours',
    biosafetyLevel: 'BSL-1',
    summary: 'Operation of a 3-liter stirred-tank bioreactor for high-density recombinant E. coli/yeast fermentation, online DO and pH loop control, and calculation of substrate yield coefficients (Yx/s).',
    aim: 'To operate a benchtop stirred-tank fermenter, regulate critical process parameters (Temperature 37°C, pH 7.0, Dissolved Oxygen >30% via cascade agitation), and determine specific growth rate and biomass-to-substrate yield ($Y_{X/S}$).',
    principle: 'Stirred-tank bioreactors provide tight closed-loop control of environmental variables (temperature, dissolved oxygen, pH, agitation, aeration) critical for maximizing microbial cell density and recombinant product yield. Dissolved Oxygen ($DO$) is monitored using a polarographic or optical sensor and maintained by cascading impeller speed (200-800 RPM) and mass airflow (vvm). Samples are drawn periodically for dry cell weight ($DCW, g/L$) and residual glucose substrate concentration ($S, g/L$). The biomass yield coefficient on substrate ($Y_{X/S}$) is determined by $Y_{X/S} = \\frac{\\Delta X}{\\Delta S} = \\frac{X_t - X_0}{S_0 - S_t}$.',
    requirements: {
      microorganisms: ['E. coli BL21(DE3) or Saccharomyces cerevisiae (5% v/v active seed inoculum)'],
      reagents: [
        'Defined Minimal or Semi-Rich Fermentation Medium (Glucose 20 g/L, Yeast Extract, (NH4)2SO4, KH2PO4, MgSO4)',
        'Antifoam agent (Silicone emulsion or PPG 2000)',
        '2M NaOH (Base titration)',
        '2M HCl or 10% H3PO4 (Acid titration)',
        'Glucose Assay Kit (DNSA method or enzymatic Glucose Oxidase-Peroxidase)'
      ],
      glasswareEquipment: [
        '3L Stirred-Tank Benchtop Bioreactor (Applikon/Sartorius/BioFlo)',
        'DO probe (polarographic/optical) & pH electrode',
        'Peristaltic feed pumps',
        'Sterilizable sampling port',
        'Centrifuge & Drying oven (105°C) for Dry Cell Weight (DCW)'
      ],
      safetyPPE: ['Lab coat', 'Safety glasses', 'Heat-resistant autoclave gloves']
    },
    protocol: [
      {
        stepNumber: 1,
        title: 'Sensor Calibration & Vessel In-Situ Autoclaving',
        description: 'Calibrate pH probe using standard buffers (pH 4.0 and 7.0). Fill fermenter vessel with 2.0 L media. Autoclave assembled vessel at 121°C for 20 minutes with vent filters covered in foil.',
        durationSeconds: 1800
      },
      {
        stepNumber: 2,
        title: 'Polarographic DO Probe 2-Point Calibration',
        description: 'Mount vessel on controller. Set temperature to 37°C. Set aeration to 1.0 vvm and stirrer to 800 RPM for 30 minutes to saturate media with oxygen. Calibrate 100% DO. Sparge with nitrogen gas or zero-sulfite solution to set 0% DO.',
        durationSeconds: 1800
      },
      {
        stepNumber: 3,
        title: 'Aseptic Inoculation & Loop Automation',
        description: 'Aseptically inject 100 mL (5% v/v) seed culture through the septal inoculation port. Enable automatic pH control (setpoint 7.0 with 2M NaOH pump) and DO cascade control (minimum 30% DO by ramping agitation from 250 to 800 RPM).',
        durationSeconds: 300
      },
      {
        stepNumber: 4,
        title: 'Kinetic Sampling & Analytical Profiling',
        description: 'Aseptically pull 15 mL broth samples every 60 minutes. Measure: (1) OD600, (2) Dry Cell Weight (DCW) via pre-weighed 0.22µm membrane filter dried at 105°C, and (3) Residual glucose in supernatant via DNSA assay.',
        durationSeconds: 28800
      },
      {
        stepNumber: 5,
        title: 'Yield Coefficient ($Y_{X/S}$) Calculation',
        description: 'Plot Biomass produced $\\Delta X$ (g/L) vs. Glucose consumed $\\Delta S$ (g/L). Calculate slope:\n\n$$Y_{X/S} = \\frac{X_{\\text{final}} - X_0}{S_0 - S_{\\text{final}}}$$',
        durationSeconds: 600
      }
    ],
    expectedObservations: {
      positiveResult: 'Biomass accumulation reaching 8-15 g/L DCW. Yield coefficient $Y_{X/S} \\approx 0.45 - 0.50$ g cells / g glucose consumed under aerobic respiration.',
      visualDescription: 'Fermentation broth transforms from clear pale yellow to dense creamy-tan turbid suspension.',
      interpretationGuide: 'If $Y_{X/S} < 0.25$, indicates anaerobic fermentative shift (acetate/ethanol overflow metabolism due to oxygen starvation).'
    },
    troubleshootingTips: [
      'DO drops to 0% and won\'t recover: Oxygen transfer rate (OTR) is lower than oxygen uptake rate (OUR). Supplement pure oxygen, increase vessel backpressure, or increase airflow/RPM.',
      'Foam flooding exhaust filter: Severe foaming during rapid growth. Adjust antifoam sensor conductivity and peristaltic pulse dosing.'
    ],
    vivaQuestions: [
      {
        question: 'What is the volumetric oxygen mass transfer coefficient ($k_L a$)?',
        answer: 'The volumetric mass transfer coefficient ($k_L a$, hr^-1) quantifies the efficiency with which oxygen is transferred from sparged gas bubbles into the liquid fermentation broth. It is governed by impeller geometry, power input per volume, and gas superficial velocity.'
      },
      {
        question: 'Why does E. coli produce acetic acid (Crabtree/overflow effect) even under aerobic conditions?',
        answer: 'When glucose concentration exceeds the capacity of the TCA cycle and respiratory electron transport chain, excess pyruvate is routed into the acetate pathway (overflow metabolism), lowering broth pH and inhibiting cell growth.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between batch and fed-batch fermentation?',
        answer: 'In batch fermentation, all nutrients are added at time zero and culture runs until limiting nutrient depletes. In fed-batch, concentrated limiting substrate (e.g. 50% glucose) is continuously or incrementally fed to achieve ultra-high cell densities (>50-100 g/L DCW) while preventing overflow metabolism.'
      }
    ],
    tags: ['Bioreactor', 'Fermentation', 'Biomass Yield', 'Kinetics', 'PhD', 'Industrial']
  }
];
