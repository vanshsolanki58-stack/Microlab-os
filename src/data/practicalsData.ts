import { Practical } from '@/types/microbiology';

export const practicalsData: Practical[] = [
  // =========================================================================
  // IMViC TESTS (Separated as requested)
  // =========================================================================
  {
    id: 'imvic-indole',
    title: 'Indole Test',
    category: 'Biochemical Characterization',
    level: 'BSc',
    durationEstimate: '24-48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Determine the ability of an organism to produce the enzyme tryptophanase, which breaks down the amino acid tryptophan into indole.',
    tags: ['IMViC', 'Biochemical', 'Enterobacteriaceae'],
    objectives: [
      'Understand the biochemical breakdown of tryptophan.',
      'Differentiate enteric bacilli based on indole production.',
      'Perform and interpret the Indole test using Kovacs reagent.'
    ],
    materials: [
      'Tryptone broth or SIM medium',
      'Kovacs reagent (p-dimethylaminobenzaldehyde, HCl, amyl alcohol)',
      'Inoculating loop',
      'Test organisms (e.g., E. coli, Enterobacter aerogenes)'
    ],
    procedureSteps: [
      'Aseptically inoculate the tryptone broth with the test organism.',
      'Incubate the tubes at 37°C for 24 to 48 hours.',
      'After incubation, add 5 drops of Kovacs reagent directly to the broth.',
      'Do not shake the tube. Allow the reagent to form a layer on top of the broth.',
      'Observe for the formation of a cherry-red ring at the surface.'
    ],
    expectedResults: 'A cherry-red ring at the surface indicates a positive test (Indole produced). No color change (yellow/brown ring) indicates a negative test.',
    safetyPrecautions: 'Kovacs reagent contains concentrated hydrochloric acid and amyl alcohol, which are corrosive and toxic. Handle in a fume hood or well-ventilated area.',
    backgroundTheory: 'Tryptophan is an essential amino acid. Some bacteria possess tryptophanase, which hydrolyzes tryptophan into indole, pyruvic acid, and ammonia. The indole reacts with the aldehyde in Kovacs reagent to form a red rosindole dye.'
  },
  {
    id: 'imvic-mr',
    title: 'Methyl Red (MR) Test',
    category: 'Biochemical Characterization',
    level: 'BSc',
    durationEstimate: '48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Determine the ability of an organism to perform mixed-acid fermentation, producing stable acid end products that lower the pH of the medium significantly.',
    tags: ['IMViC', 'Biochemical', 'Enterobacteriaceae'],
    objectives: [
      'Understand mixed-acid fermentation pathways.',
      'Use a pH indicator to detect significant acid production.',
      'Differentiate E. coli (MR positive) from Enterobacter spp. (MR negative).'
    ],
    materials: [
      'MR-VP broth (contains glucose, peptone, and phosphate buffer)',
      'Methyl Red indicator solution',
      'Inoculating loop',
      'Test organisms'
    ],
    procedureSteps: [
      'Aseptically inoculate the MR-VP broth with the test organism.',
      'Incubate at 37°C for 48 hours (longer incubation may be required to overcome the buffer).',
      'Transfer 1/3 of the broth to a clean tube for the MR test (save the rest for VP).',
      'Add 5 drops of Methyl Red indicator to the tube.',
      'Observe the color change immediately.'
    ],
    expectedResults: 'Red color immediately indicates a positive test (pH < 4.4). Yellow color indicates a negative test (pH > 6.0). Orange is equivocal.',
    safetyPrecautions: 'Standard BSL-2 precautions when handling enteric pathogens.',
    backgroundTheory: 'Organisms that perform mixed-acid fermentation produce large amounts of lactic, acetic, succinic, and formic acids, overcoming the phosphate buffer and dropping the pH below 4.4, where methyl red is red. Other organisms may produce neutral end products (acetoin), raising the pH and giving a yellow color.'
  },
  {
    id: 'imvic-vp',
    title: 'Voges-Proskauer (VP) Test',
    category: 'Biochemical Characterization',
    level: 'BSc',
    durationEstimate: '48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Detect the production of neutral end products (acetoin/acetylmethylcarbinol) from glucose fermentation.',
    tags: ['IMViC', 'Biochemical', 'Enterobacteriaceae'],
    objectives: [
      'Understand the butylene glycol fermentation pathway.',
      'Detect the presence of acetoin as a fermentation byproduct.',
      'Differentiate members of the Enterobacteriaceae family.'
    ],
    materials: [
      'MR-VP broth (saved from MR test)',
      'Barritts Reagent A (alpha-naphthol)',
      'Barritts Reagent B (KOH)',
      'Test organisms'
    ],
    procedureSteps: [
      'Use the remaining 2/3 of the incubated MR-VP broth.',
      'Add 15 drops of Barritts Reagent A and shake vigorously to oxygenate.',
      'Add 5 drops of Barritts Reagent B and shake vigorously again.',
      'Allow the tube to sit undisturbed for 15-30 minutes.',
      'Observe for a pink-to-red color change.'
    ],
    expectedResults: 'A pink or crimson-red color at the surface or throughout the broth indicates a positive test (acetoin present). A copper or yellow color is negative.',
    safetyPrecautions: 'Barritts Reagent B contains strong potassium hydroxide. Avoid skin contact.',
    backgroundTheory: 'Some bacteria ferment glucose to produce 2,3-butanediol. Acetoin is an intermediate in this pathway. In the presence of oxygen and KOH, acetoin is oxidized to diacetyl, which then reacts with alpha-naphthol to produce a red color.'
  },
  {
    id: 'imvic-citrate',
    title: 'Citrate Utilization Test',
    category: 'Biochemical Characterization',
    level: 'BSc',
    durationEstimate: '24-48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Determine if an organism can use citrate as its sole carbon source and ammonium salts as its sole nitrogen source.',
    tags: ['IMViC', 'Biochemical', 'Enterobacteriaceae'],
    objectives: [
      'Assess the ability of bacteria to transport and utilize citrate.',
      'Observe alkaline pH shifts due to ammonia production.',
      'Differentiate fecal coliforms from non-fecal coliforms.'
    ],
    materials: [
      'Simmons Citrate Agar slants',
      'Inoculating needle',
      'Test organisms'
    ],
    procedureSteps: [
      'Use an inoculating needle to lightly streak the surface of the Simmons citrate agar slant.',
      'Do not stab the butt, as the reaction requires oxygen.',
      'Incubate the slant at 37°C for 24 to 48 hours.',
      'Observe the slant for growth and color change from green to Prussian blue.'
    ],
    expectedResults: 'Growth with a blue color change in the medium indicates a positive test. No growth and a green color indicates a negative test.',
    safetyPrecautions: 'Avoid heavy inocula, which can result in false positives due to carryover nutrients.',
    backgroundTheory: 'Simmons citrate agar contains sodium citrate as the only carbon source and ammonium dihydrogen phosphate as the nitrogen source. Organisms possessing citrate permease can transport citrate into the cell. When they metabolize the ammonium salts, ammonia is released, raising the pH and turning the bromothymol blue indicator from green (pH 6.9) to blue (pH 7.6).'
  },
  {
    id: 'imvic-joint',
    title: 'Complete IMViC Series',
    category: 'Biochemical Characterization',
    level: 'BSc',
    durationEstimate: '48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'A combined protocol running the Indole, Methyl Red, Voges-Proskauer, and Citrate tests simultaneously to fully profile enteric bacteria.',
    tags: ['IMViC', 'Biochemical', 'Enterobacteriaceae', 'Water Quality'],
    objectives: [
      'Perform all 4 IMViC tests concurrently.',
      'Interpret the combined profile to identify common coliforms.',
      'Differentiate E. coli (++--) from Enterobacter aerogenes (--++).'
    ],
    materials: [
      'Tryptone broth',
      'MR-VP broth (2 tubes or 1 large tube)',
      'Simmons Citrate slant',
      'Kovacs reagent, Methyl Red indicator, Barritts A & B',
      'Test organisms'
    ],
    procedureSteps: [
      'Inoculate all three media types (Tryptone, MR-VP, Citrate) with a pure culture of the test organism.',
      'Incubate all tubes at 37°C for 48 hours.',
      'Add Kovacs reagent to the Tryptone broth and record Indole results.',
      'Split the MR-VP broth into two aliquots.',
      'Add Methyl Red to one aliquot and record MR results.',
      'Add Barritts A and B to the second aliquot, agitate, wait 15 mins, and record VP results.',
      'Observe the Citrate slant for growth and blue color change.'
    ],
    expectedResults: 'E. coli profile: Indole (+), MR (+), VP (-), Citrate (-). Enterobacter profile: Indole (-), MR (-), VP (+), Citrate (+).',
    safetyPrecautions: 'Handle all reagents with care. Use fume hoods for Kovacs and Barritts reagents.',
    backgroundTheory: 'The IMViC series is a critical set of tests used in water quality analysis to distinguish between fecal coliforms (E. coli), which indicate human or animal waste contamination, and non-fecal coliforms (Enterobacter), which are naturally found in soil and plant material.'
  },

  // =========================================================================
  // MEDICAL MICROBIOLOGY
  // =========================================================================
  {
    id: 'med-staph-aureus',
    title: 'Isolation & Identification of Staphylococcus aureus',
    category: 'Isolation & Pure Culture',
    level: 'All',
    durationEstimate: '48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Isolate S. aureus from clinical or environmental samples and confirm identity using Mannitol Salt Agar, Coagulase, and Catalase tests.',
    tags: ['Staphylococcus', 'Clinical', 'Selective Media', 'Coagulase'],
    objectives: [
      'Isolate Staphylococci using high-salt selective media.',
      'Differentiate S. aureus from coagulase-negative staphylococci (CoNS).',
      'Observe hemolysis on Blood Agar.'
    ],
    materials: [
      'Mannitol Salt Agar (MSA) plates',
      'Blood Agar plates',
      'Rabbit plasma for coagulase test',
      '3% Hydrogen peroxide for catalase test',
      'Specimen swabs (e.g., nasal swabs)'
    ],
    procedureSteps: [
      'Swab the anterior nares or skin surface and streak onto an MSA plate.',
      'Incubate at 37°C for 24-48 hours.',
      'Examine MSA for growth and color change. S. aureus ferments mannitol, turning the red agar yellow.',
      'Subculture a yellow colony onto a Blood Agar plate. Incubate 24 hrs.',
      'Perform a catalase test on the isolate: mix a colony with H2O2 on a slide. Bubbling = positive.',
      'Perform a tube coagulase test: emulsify a colony in 0.5 mL rabbit plasma. Incubate at 37°C and check for clot formation at 4 hrs and 24 hrs.'
    ],
    expectedResults: 'S. aureus: Growth on MSA with yellow halos, Catalase positive (bubbles), Beta-hemolysis on Blood Agar, Coagulase positive (plasma clots). S. epidermidis: Growth on MSA but agar stays red, Coagulase negative.',
    safetyPrecautions: 'S. aureus is an opportunistic pathogen. Do not open plates directly toward the face. Discard all swabs and loops in biohazard bags.',
    backgroundTheory: 'S. aureus is a halotolerant organism that thrives in 7.5% NaCl. It ferments mannitol to produce acid. Pathogenic strains produce the enzyme coagulase, which converts fibrinogen to fibrin, coating the bacteria in a clot to protect it from phagocytosis.'
  },
  
  // =========================================================================
  // HAEMATOLOGY
  // =========================================================================
  {
    id: 'hem-blood-group',
    title: 'ABO & Rh Blood Grouping',
    category: 'Hematology & Urinalysis',
    level: 'All',
    durationEstimate: '30 minutes',
    biosafetyLevel: 'BSL-2',
    summary: 'Determine human blood type using slide agglutination with monoclonal Anti-A, Anti-B, and Anti-D antisera.',
    tags: ['Hematology', 'Serology', 'Agglutination'],
    objectives: [
      'Understand the antigen-antibody basis of blood typing.',
      'Perform a slide agglutination assay safely.',
      'Interpret agglutination patterns to assign ABO and Rh status.'
    ],
    materials: [
      'Monoclonal Anti-A (blue), Anti-B (yellow), and Anti-D (colorless) sera',
      'Sterile lancets and alcohol swabs',
      'Glass cavity slides or clean porcelain tiles',
      'Applicator sticks'
    ],
    procedureSteps: [
      'Clean the fingertip with an alcohol swab and let it dry.',
      'Prick the finger with a sterile lancet and wipe away the first drop.',
      'Place three distinct drops of blood on the glass slide, labeled A, B, and D.',
      'Add one drop of Anti-A serum to the blood drop labeled A.',
      'Add one drop of Anti-B serum to the blood drop labeled B.',
      'Add one drop of Anti-D serum to the blood drop labeled D.',
      'Mix each drop thoroughly with a separate, clean applicator stick.',
      'Rock the slide gently for 1-2 minutes and observe for clumping (agglutination).'
    ],
    expectedResults: 'Clumping in A = A antigen present. Clumping in B = B antigen present. Clumping in both = AB. No clumping in A or B = Type O. Clumping in D = Rh Positive. No clumping in D = Rh Negative.',
    safetyPrecautions: 'Work ONLY with your own blood. Dispose of all lancets in a sharps container immediately. Wipe down surfaces with 10% bleach.',
    backgroundTheory: 'Blood types are determined by the presence of glycoproteins (antigens) on the RBC surface. When corresponding antibodies bind to these antigens, they cross-link the RBCs, causing visible macroscopic agglutination.'
  },

  // =========================================================================
  // ANTIMICROBIAL SENSITIVITY
  // =========================================================================
  {
    id: 'ast-kirby-bauer',
    title: 'Kirby-Bauer Disk Diffusion Assay',
    category: 'Antimicrobial & Pharmacological',
    level: 'BSc',
    durationEstimate: '24 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Determine the susceptibility of a clinical isolate to various antibiotics using standardized antibiotic-impregnated disks.',
    tags: ['Antibiotics', 'Kirby-Bauer', 'Zone of Inhibition', 'CLSI'],
    objectives: [
      'Standardize a bacterial suspension to 0.5 McFarland standard.',
      'Inoculate a confluent bacterial lawn.',
      'Measure and interpret Zones of Inhibition using CLSI charts.'
    ],
    materials: [
      'Mueller-Hinton Agar (MHA) plates (poured to 4mm depth)',
      'Sterile cotton swabs',
      'Antibiotic disk dispenser or sterile forceps',
      'Antibiotic disks (e.g., Penicillin, Tetracycline, Gentamicin)',
      '0.5 McFarland turbidity standard',
      'Ruler or calipers'
    ],
    procedureSteps: [
      'Prepare a suspension of the test organism in sterile saline matching the 0.5 McFarland standard.',
      'Dip a sterile swab into the suspension, press against the tube wall to remove excess fluid.',
      'Inoculate the MHA plate by swabbing the entire surface in three different directions to ensure a uniform lawn.',
      'Allow the plate to dry for 5 minutes.',
      'Using sterile forceps, place the antibiotic disks firmly onto the agar surface, spaced evenly apart.',
      'Incubate the plates inverted at 37°C for 16-18 hours.',
      'Measure the diameter of the clear zones (Zones of Inhibition) in millimeters using a ruler.'
    ],
    expectedResults: 'A clear zone indicates growth inhibition. The diameter must be compared to standard CLSI tables to classify the organism as Susceptible (S), Intermediate (I), or Resistant (R) to each antibiotic.',
    safetyPrecautions: 'Ensure plates are properly closed during incubation. Measure zones without opening the lids if possible.',
    backgroundTheory: 'Antibiotics diffuse outward from the disk, creating a concentration gradient. The bacteria will grow until they reach a concentration that inhibits them (the Minimum Inhibitory Concentration). The size of the zone depends on the drug diffusion rate, molecular weight, and the organism susceptibility.'
  },

  // =========================================================================
  // BIOCHEMISTRY & CARBOHYDRATES
  // =========================================================================
  {
    id: 'biochem-benedicts',
    title: 'Benedicts Test for Reducing Sugars',
    category: 'Biochemical Characterization',
    level: 'All',
    durationEstimate: '1 hour',
    biosafetyLevel: 'BSL-1',
    summary: 'Qualitative test to detect the presence of reducing sugars (like glucose, fructose, and maltose) in biological samples.',
    tags: ['Biochemistry', 'Carbohydrates', 'Reducing Sugars'],
    objectives: [
      'Understand the chemical basis of carbohydrate reduction.',
      'Perform Benedicts test on various sugar solutions.',
      'Grade the concentration of sugar based on precipitate color.'
    ],
    materials: [
      'Benedicts Reagent (CuSO4, Sodium Citrate, Sodium Carbonate)',
      'Test sugar solutions (Glucose, Sucrose, Starch)',
      'Test tubes and rack',
      'Boiling water bath'
    ],
    procedureSteps: [
      'Label test tubes for each sugar and a water blank.',
      'Add 5 mL of Benedicts reagent to each tube.',
      'Add 8-10 drops of the test sugar solution to the respective tube.',
      'Place all tubes in a vigorously boiling water bath for exactly 5 minutes.',
      'Remove tubes carefully using tongs and allow them to cool slowly at room temperature.',
      'Observe and record the color of the precipitate.'
    ],
    expectedResults: 'Blue (no change) = Negative (e.g., Sucrose, Starch). Green/Yellow precipitate = Trace/Low reducing sugar (0.5-1%). Orange/Red precipitate = Moderate sugar (1-2%). Brick-red precipitate = High sugar concentration (>2%).',
    safetyPrecautions: 'Use test tube holders when handling hot tubes. Boiling water baths can cause severe burns.',
    backgroundTheory: 'Reducing sugars have a free aldehyde or ketone group that can donate electrons. Under hot alkaline conditions, they reduce the blue cupric ions (Cu2+) in Benedicts reagent to cuprous ions (Cu+), which precipitate out of solution as brick-red cuprous oxide (Cu2O).'
  },

  // =========================================================================
  // GENETICS & MOLECULAR
  // =========================================================================
  {
    id: 'gen-uv-survival',
    title: 'UV Survival & Mutagenesis in E. coli',
    category: 'Molecular Biology & Genetics',
    level: 'MSc',
    durationEstimate: '48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Investigate the lethal and mutagenic effects of Ultraviolet (UV) radiation on bacterial DNA and the role of photoreactivation repair.',
    tags: ['Genetics', 'UV Radiation', 'DNA Repair', 'Mutagenesis'],
    objectives: [
      'Construct a UV survival curve for E. coli.',
      'Understand the formation of thymine dimers.',
      'Demonstrate light-dependent DNA repair (photoreactivation).'
    ],
    materials: [
      'E. coli broth culture (mid-log phase)',
      'Nutrient Agar plates',
      'UV germicidal lamp (254 nm)',
      'Sterile saline dilution blanks',
      'Cardboard shields'
    ],
    procedureSteps: [
      'Prepare serial dilutions of the E. coli culture and spread-plate 0.1 mL of a 10^-5 dilution onto several Nutrient Agar plates.',
      'Remove the lids of the plates (UV cannot penetrate plastic/glass).',
      'Expose plates to the UV lamp at a fixed distance for varying times (e.g., 0, 10, 30, 60, 120 seconds). Use cardboard to cover half of each plate as an internal control.',
      'Immediately cover the plates in aluminum foil to prevent light exposure (dark repair only).',
      'Expose one additional set of UV-irradiated plates to visible light for 30 mins before incubating (photoreactivation).',
      'Incubate all plates at 37°C for 24-48 hours.',
      'Count colonies and calculate survival percentage relative to the 0-second control.'
    ],
    expectedResults: 'Colony counts will decrease logarithmically as UV exposure time increases. Plates exposed to visible light post-UV will show significantly higher survival rates due to photolyase repair enzymes.',
    safetyPrecautions: 'Wear UV-blocking safety goggles and skin protection. Never look directly at a UV lamp. Ensure the lamp is shielded in a closed box.',
    backgroundTheory: 'UV light at 254nm is highly absorbed by DNA, causing adjacent pyrimidine bases (thymine) to covalently bond, forming thymine dimers. This distorts the DNA helix, blocking replication. Photoreactivation uses the enzyme photolyase, activated by visible light, to cleave the dimers.'
  },

  // =========================================================================
  // INDUSTRIAL MICROBIOLOGY
  // =========================================================================
  {
    id: 'ind-amylase',
    title: 'Screening for Amylase-Producing Microorganisms',
    category: 'Fermentation & Enzymology',
    level: 'MSc',
    durationEstimate: '72 hours',
    biosafetyLevel: 'BSL-1',
    summary: 'Screen soil samples for bacteria and fungi capable of producing extracellular alpha-amylase to degrade starch.',
    tags: ['Industrial', 'Enzymology', 'Amylase', 'Starch Agar'],
    objectives: [
      'Isolate amylolytic microbes from natural soil.',
      'Use Starch Agar and Iodine vapor/solution to visualize enzyme activity.',
      'Identify clearing zones indicative of starch hydrolysis.'
    ],
    materials: [
      'Soil samples',
      'Starch Agar plates (Nutrient agar supplemented with 1% soluble starch)',
      'Grams Iodine solution',
      'Sterile dilution blanks'
    ],
    procedureSteps: [
      'Prepare a soil suspension: 1g soil in 10 mL sterile water. Shake vigorously.',
      'Perform serial dilutions up to 10^-4.',
      'Spread 0.1 mL of dilutions onto Starch Agar plates.',
      'Incubate plates at 30°C for 48-72 hours to allow growth and enzyme secretion.',
      'After incubation, flood the agar plates with Grams Iodine solution.',
      'Pour off excess iodine after 1 minute.',
      'Observe the colonies for a clear, colorless halo against the dark blue/purple background.'
    ],
    expectedResults: 'Starch reacts with iodine to form a deep blue-black complex. Colonies that secrete amylase will have hydrolyzed the starch around them into maltose and glucose, leaving a clear zone (halo) where the iodine does not change color.',
    safetyPrecautions: 'Standard microbiological techniques. Environmental isolates may include opportunistic pathogens; treat plates with care.',
    backgroundTheory: 'Alpha-amylase is a critical industrial enzyme used in brewing, textiles, and corn syrup production. It acts on alpha-1,4-glycosidic bonds in starch. Screening on starch agar allows rapid visual identification of high-yield producing strains, such as Bacillus subtilis and Aspergillus niger.'
  }
];
