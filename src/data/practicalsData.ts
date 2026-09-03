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
    aim: 'To determine the ability of bacteria to convert the amino acid tryptophan into indole.',
    principle: 'Tryptophan is an essential amino acid. Some bacteria possess tryptophanase, which hydrolyzes tryptophan into indole, pyruvic acid, and ammonia. The indole reacts with the aldehyde in Kovacs reagent to form a red rosindole dye.',
    requirements: {
      reagents: ['Kovacs reagent (p-dimethylaminobenzaldehyde, HCl, amyl alcohol)'],
      media: ['Tryptone broth or SIM medium'],
      glasswareEquipment: ['Inoculating loop', 'Test tubes', 'Incubator'],
      safetyPPE: ['Lab coat', 'Gloves', 'Fume hood for reagent']
    },
    protocol: [
      { stepNumber: 1, title: 'Inoculation', description: 'Aseptically inoculate the tryptone broth with the test organism using a sterile loop.' },
      { stepNumber: 2, title: 'Incubation', description: 'Incubate the tubes at 37°C for 24 to 48 hours.', durationSeconds: 86400 },
      { stepNumber: 3, title: 'Reagent Addition', description: 'After incubation, add 5 drops of Kovacs reagent directly to the broth.', criticalWarning: 'Use Kovacs reagent in a fume hood. Do not shake the tube.' },
      { stepNumber: 4, title: 'Observation', description: 'Allow the reagent to form a layer on top of the broth and observe for a cherry-red ring.' }
    ],
    expectedObservations: {
      positiveResult: 'A cherry-red ring forms at the surface of the broth.',
      negativeResult: 'No color change occurs; the reagent layer remains yellow or brown.',
      visualDescription: 'A distinct, bright red layer floating on top of the turbid yellowish broth.',
      interpretationGuide: 'Red ring indicates presence of indole (organism produces tryptophanase).'
    },
    troubleshootingTips: [
      'Weak or false negative results can occur if the medium does not contain sufficient tryptophan. Always use peptone or tryptone broth.',
      'Incubating for less than 24 hours may yield false negatives.'
    ],
    vivaQuestions: [
      { question: 'What enzyme is responsible for indole production?', answer: 'Tryptophanase.' },
      { question: 'What is the active ingredient in Kovacs reagent?', answer: 'p-dimethylaminobenzaldehyde.' }
    ],
    faqs: []
  },
  {
    id: 'imvic-mr',
    title: 'Methyl Red (MR) Test',
    category: 'Biochemical Characterization',
    level: 'BSc',
    durationEstimate: '48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Determine the ability of an organism to perform mixed-acid fermentation, producing stable acid end products.',
    tags: ['IMViC', 'Biochemical', 'Enterobacteriaceae'],
    aim: 'To detect the production of strong stable acids through the mixed-acid fermentation of glucose.',
    principle: 'Organisms that perform mixed-acid fermentation produce large amounts of lactic, acetic, succinic, and formic acids, dropping the pH below 4.4, where methyl red turns red. Other organisms produce neutral end products (acetoin), raising the pH and giving a yellow color.',
    requirements: {
      reagents: ['Methyl Red indicator solution'],
      media: ['MR-VP broth (contains glucose, peptone, and phosphate buffer)'],
      glasswareEquipment: ['Inoculating loop', 'Test tubes', 'Incubator'],
      safetyPPE: ['Lab coat', 'Gloves']
    },
    protocol: [
      { stepNumber: 1, title: 'Inoculation', description: 'Aseptically inoculate the MR-VP broth with the test organism.' },
      { stepNumber: 2, title: 'Incubation', description: 'Incubate at 37°C for 48 hours.', durationSeconds: 172800, tip: 'Longer incubation is required to ensure the organism overcomes the phosphate buffer in the medium.' },
      { stepNumber: 3, title: 'Splitting Aliquot', description: 'Transfer 1/3 of the broth to a clean tube for the MR test.' },
      { stepNumber: 4, title: 'Reagent Addition', description: 'Add 5 drops of Methyl Red indicator to the tube and observe the color change immediately.' }
    ],
    expectedObservations: {
      positiveResult: 'The broth turns immediately red.',
      negativeResult: 'The broth turns yellow.',
      visualDescription: 'A stark contrast between the bright cherry red of a positive test and the distinct yellow of a negative test.',
      interpretationGuide: 'Red indicates pH < 4.4 (Mixed acid fermenter). Yellow indicates pH > 6.0 (Non-mixed acid fermenter).'
    },
    troubleshootingTips: [
      'Incubating for only 24 hours can cause false positives because early fermentation by all organisms produces acid; butylene glycol fermenters need time to convert acid to neutral end products.',
      'An orange color is equivocal and usually indicates the test was read too early.'
    ],
    vivaQuestions: [
      { question: 'Why is phosphate buffer included in MR-VP broth?', answer: 'To resist slight pH changes, ensuring only strong mixed-acid fermenters can drop the pH below 4.4.' }
    ],
    faqs: []
  },
  {
    id: 'imvic-vp',
    title: 'Voges-Proskauer (VP) Test',
    category: 'Biochemical Characterization',
    level: 'BSc',
    durationEstimate: '48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Detect the production of neutral end products (acetoin) from glucose fermentation.',
    tags: ['IMViC', 'Biochemical', 'Enterobacteriaceae'],
    aim: 'To determine if an organism utilizes the butylene glycol pathway to produce acetoin from glucose.',
    principle: 'Some bacteria ferment glucose to produce 2,3-butanediol. Acetoin is an intermediate in this pathway. In the presence of oxygen and KOH, acetoin is oxidized to diacetyl, which then reacts with alpha-naphthol to produce a red color.',
    requirements: {
      reagents: ['Barritts Reagent A (alpha-naphthol)', 'Barritts Reagent B (40% KOH)'],
      media: ['MR-VP broth (saved from MR test)'],
      glasswareEquipment: ['Test tubes', 'Vortex mixer or shaker'],
      safetyPPE: ['Lab coat', 'Gloves', 'Safety glasses']
    },
    protocol: [
      { stepNumber: 1, title: 'Sample Preparation', description: 'Use the remaining 2/3 of the incubated MR-VP broth (from the MR test).' },
      { stepNumber: 2, title: 'Reagent A', description: 'Add 15 drops of Barritts Reagent A and shake vigorously to oxygenate.', tip: 'The reaction requires oxygen; vigorous shaking is essential.' },
      { stepNumber: 3, title: 'Reagent B', description: 'Add 5 drops of Barritts Reagent B and shake vigorously again.', criticalWarning: 'Barritts Reagent B contains strong potassium hydroxide. Avoid skin contact.' },
      { stepNumber: 4, title: 'Development', description: 'Allow the tube to sit undisturbed for 15-30 minutes.' }
    ],
    expectedObservations: {
      positiveResult: 'A pink or crimson-red color forms at the surface or throughout the broth.',
      negativeResult: 'A copper or yellow/brown color forms.',
      visualDescription: 'The positive test develops a deep rose-pink to crimson red color starting from the top layer.',
      interpretationGuide: 'Red color confirms the presence of acetoin (acetylmethylcarbinol).'
    },
    troubleshootingTips: [
      'Adding reagents in the wrong order can yield false negatives. Always add Reagent A (alpha-naphthol) before Reagent B (KOH).',
      'Failure to shake the tube prevents the necessary oxidation of acetoin to diacetyl.'
    ],
    vivaQuestions: [
      { question: 'What is the intermediate compound detected in the VP test?', answer: 'Acetoin (acetylmethylcarbinol).' }
    ],
    faqs: []
  },
  {
    id: 'imvic-citrate',
    title: 'Citrate Utilization Test',
    category: 'Biochemical Characterization',
    level: 'BSc',
    durationEstimate: '24-48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Determine if an organism can use citrate as its sole carbon source.',
    tags: ['IMViC', 'Biochemical', 'Enterobacteriaceae'],
    aim: 'To assess the ability of bacteria to transport and utilize citrate via the enzyme citrate permease.',
    principle: 'Simmons citrate agar contains sodium citrate as the only carbon source and ammonium salts as the nitrogen source. Organisms with citrate permease metabolize the ammonium salts, releasing ammonia, raising the pH, and turning the bromothymol blue indicator from green (pH 6.9) to blue (pH 7.6).',
    requirements: {
      reagents: [],
      media: ['Simmons Citrate Agar slants'],
      glasswareEquipment: ['Inoculating needle', 'Incubator'],
      safetyPPE: ['Lab coat', 'Gloves']
    },
    protocol: [
      { stepNumber: 1, title: 'Inoculation', description: 'Use an inoculating needle to lightly streak the surface of the Simmons citrate agar slant.', tip: 'Do not stab the butt, as the reaction requires oxygen. Avoid a heavy inoculum.' },
      { stepNumber: 2, title: 'Incubation', description: 'Incubate the slant at 37°C for 24 to 48 hours.', durationSeconds: 86400 },
      { stepNumber: 3, title: 'Observation', description: 'Observe the slant for growth and color change from green to Prussian blue.' }
    ],
    expectedObservations: {
      positiveResult: 'Visible growth with a distinct blue color change in the medium.',
      negativeResult: 'No growth, and the agar remains green.',
      visualDescription: 'A striking shift from a forest green slant to a deep, vibrant Prussian blue.',
      interpretationGuide: 'Growth and blue color mean the organism is positive for citrate permease.'
    },
    troubleshootingTips: [
      'A heavy inoculum can carry over nutrients from the previous medium, leading to false-positive growth and color change.',
      'Incubating with a tightly sealed cap can inhibit growth, as the citrate utilization pathway requires oxygen.'
    ],
    vivaQuestions: [
      { question: 'What is the pH indicator used in Simmons Citrate Agar?', answer: 'Bromothymol blue.' },
      { question: 'Why does the medium turn blue instead of yellow during utilization?', answer: 'Metabolism of ammonium salts releases ammonia, which makes the medium alkaline (pH > 7.6).' }
    ],
    faqs: []
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
    aim: 'To perform all 4 IMViC tests concurrently and interpret the combined profile to identify common coliforms.',
    principle: 'The IMViC series is a critical set of tests used in water quality analysis to distinguish between fecal coliforms (E. coli), which indicate human or animal waste contamination, and non-fecal coliforms (Enterobacter), which are naturally found in soil and plant material.',
    requirements: {
      reagents: ['Kovacs reagent', 'Methyl Red indicator', 'Barritts A & B'],
      media: ['Tryptone broth', 'MR-VP broth (2 tubes or 1 large tube)', 'Simmons Citrate slant'],
      glasswareEquipment: ['Inoculating loop and needle', 'Incubator'],
      safetyPPE: ['Lab coat', 'Gloves']
    },
    protocol: [
      { stepNumber: 1, title: 'Inoculation', description: 'Inoculate all three media types (Tryptone, MR-VP, Citrate) with a pure culture of the test organism.' },
      { stepNumber: 2, title: 'Incubation', description: 'Incubate all tubes at 37°C for 48 hours.' },
      { stepNumber: 3, title: 'Indole Reading', description: 'Add Kovacs reagent to the Tryptone broth and record Indole results.' },
      { stepNumber: 4, title: 'MR-VP Splitting', description: 'Split the MR-VP broth into two aliquots.' },
      { stepNumber: 5, title: 'MR Reading', description: 'Add Methyl Red to one aliquot and record MR results.' },
      { stepNumber: 6, title: 'VP Reading', description: 'Add Barritts A and B to the second aliquot, agitate, wait 15 mins, and record VP results.' },
      { stepNumber: 7, title: 'Citrate Reading', description: 'Observe the Citrate slant for growth and blue color change.' }
    ],
    expectedObservations: {
      visualDescription: 'Combined observations across 4 tubes. Red top (Indole+), Red broth (MR+), Yellow broth (VP-), Green slant (Citrate-).',
      interpretationGuide: 'E. coli profile: ++--. Enterobacter aerogenes profile: --++.'
    },
    troubleshootingTips: [
      'Ensure pure cultures are used. Mixed cultures will give uninterpretable mixed profiles.'
    ],
    vivaQuestions: [
      { question: 'What does IMViC stand for?', answer: 'Indole, Methyl Red, Voges-Proskauer, and Citrate (i is for easier pronunciation).' }
    ],
    faqs: []
  },

  // =========================================================================
  // MEDICAL MICROBIOLOGY
  // =========================================================================
  {
    id: 'med-staph-aureus',
    title: 'Isolation & Identification of Staphylococcus aureus',
    category: 'Isolation & Pure Culture',
    level: 'BSc',
    durationEstimate: '48 hours',
    biosafetyLevel: 'BSL-2',
    summary: 'Isolate S. aureus from clinical or environmental samples and confirm identity using Mannitol Salt Agar, Coagulase, and Catalase tests.',
    tags: ['Staphylococcus', 'Clinical', 'Selective Media', 'Coagulase'],
    aim: 'To isolate Staphylococci using high-salt selective media and differentiate S. aureus from coagulase-negative staphylococci (CoNS).',
    principle: 'S. aureus is a halotolerant organism that thrives in 7.5% NaCl. It ferments mannitol to produce acid. Pathogenic strains produce the enzyme coagulase, which converts fibrinogen to fibrin, coating the bacteria in a clot to protect it from phagocytosis.',
    requirements: {
      reagents: ['Rabbit plasma for coagulase test', '3% Hydrogen peroxide for catalase test'],
      media: ['Mannitol Salt Agar (MSA) plates', 'Blood Agar plates'],
      glasswareEquipment: ['Specimen swabs (e.g., nasal swabs)', 'Inoculating loop', 'Incubator'],
      safetyPPE: ['Lab coat', 'Gloves', 'Biohazard disposal']
    },
    protocol: [
      { stepNumber: 1, title: 'Swabbing', description: 'Swab the anterior nares or skin surface and streak onto an MSA plate.' },
      { stepNumber: 2, title: 'Incubation', description: 'Incubate at 37°C for 24-48 hours.' },
      { stepNumber: 3, title: 'MSA Observation', description: 'Examine MSA for growth and color change. S. aureus ferments mannitol, turning the red agar yellow.' },
      { stepNumber: 4, title: 'Subculture', description: 'Subculture a yellow colony onto a Blood Agar plate. Incubate 24 hrs.' },
      { stepNumber: 5, title: 'Catalase Test', description: 'Mix a colony with H2O2 on a slide. Bubbling indicates a positive result.' },
      { stepNumber: 6, title: 'Coagulase Test', description: 'Emulsify a colony in 0.5 mL rabbit plasma. Incubate at 37°C and check for clot formation at 4 hrs and 24 hrs.' }
    ],
    expectedObservations: {
      positiveResult: 'S. aureus: Growth on MSA with yellow halos, Catalase positive (bubbles), Beta-hemolysis on Blood Agar, Coagulase positive (plasma clots).',
      negativeResult: 'S. epidermidis: Growth on MSA but agar stays red, Coagulase negative.',
      visualDescription: 'Vibrant yellow zones around creamy colonies on pink MSA plates. Plasma tubes show a solid jelly-like clot.',
      interpretationGuide: 'A positive coagulase test is the definitive marker for S. aureus among staphylococci.'
    },
    troubleshootingTips: [
      'Do not read coagulase tests past 24 hours, as S. aureus also produces fibrinolysin which can dissolve the clot.'
    ],
    vivaQuestions: [
      { question: 'Why is Mannitol Salt Agar selective and differential?', answer: 'Selective because 7.5% salt inhibits most non-staphylococci. Differential because mannitol fermentation turns the phenol red indicator yellow.' }
    ],
    faqs: []
  },
  
  // =========================================================================
  // HAEMATOLOGY
  // =========================================================================
  {
    id: 'hem-blood-group',
    title: 'ABO & Rh Blood Grouping',
    category: 'Staining & Microscopy',
    level: 'MSc',
    durationEstimate: '30 minutes',
    biosafetyLevel: 'BSL-2',
    summary: 'Determine human blood type using slide agglutination with monoclonal Anti-A, Anti-B, and Anti-D antisera.',
    tags: ['Hematology', 'Serology', 'Agglutination'],
    aim: 'To determine the ABO and Rh blood group of a human blood sample.',
    principle: 'Blood types are determined by the presence of glycoproteins (antigens) on the RBC surface. When corresponding antibodies bind to these antigens, they cross-link the RBCs, causing visible macroscopic agglutination.',
    requirements: {
      reagents: ['Monoclonal Anti-A serum', 'Monoclonal Anti-B serum', 'Monoclonal Anti-D serum', '70% alcohol'],
      media: [],
      glasswareEquipment: ['Sterile lancets', 'Glass cavity slides or clean porcelain tiles', 'Applicator sticks'],
      safetyPPE: ['Lab coat', 'Gloves', 'Sharps disposal container']
    },
    protocol: [
      { stepNumber: 1, title: 'Preparation', description: 'Clean the fingertip with an alcohol swab and let it dry.' },
      { stepNumber: 2, title: 'Blood Collection', description: 'Prick the finger with a sterile lancet and wipe away the first drop.', criticalWarning: 'Dispose of lancets immediately in a sharps container. Never share lancets.' },
      { stepNumber: 3, title: 'Plating', description: 'Place three distinct drops of blood on the glass slide, labeled A, B, and D.' },
      { stepNumber: 4, title: 'Antisera Addition', description: 'Add one drop of Anti-A serum to drop A, Anti-B to drop B, and Anti-D to drop D.' },
      { stepNumber: 5, title: 'Mixing', description: 'Mix each drop thoroughly with a separate, clean applicator stick.', tip: 'Do not mix sticks, or you will cross-contaminate the antibodies.' },
      { stepNumber: 6, title: 'Observation', description: 'Rock the slide gently for 1-2 minutes and observe for clumping (agglutination).' }
    ],
    expectedObservations: {
      positiveResult: 'Distinct granular clumping of red blood cells.',
      negativeResult: 'A smooth, homogeneous red suspension.',
      visualDescription: 'Agglutinated blood looks like red sand or clumps floating in a clear fluid. Negative looks like normal opaque blood.',
      interpretationGuide: 'Clumping in A = A antigen. Clumping in B = B antigen. Clumping in both = AB. No clumping in A or B = Type O. Clumping in D = Rh Positive.'
    },
    troubleshootingTips: [
      'Drying out of the drops can mimic agglutination. Read the results within 2 minutes.',
      'Weak D antigens may require microscopic examination to confirm lack of agglutination.'
    ],
    vivaQuestions: [
      { question: 'What class of antibodies are typically used in routine ABO slide testing?', answer: 'IgM, because they are pentameric and highly efficient at direct agglutination.' }
    ],
    faqs: []
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
    aim: 'To measure the in vitro susceptibility of bacteria to antimicrobial agents using the disk diffusion method.',
    principle: 'Antibiotics diffuse outward from a paper disk into Mueller-Hinton agar, creating a concentration gradient. Bacteria grow until they reach a concentration that inhibits them. The size of the resulting clear zone depends on the drugs diffusion rate and the organisms susceptibility.',
    requirements: {
      reagents: ['0.5 McFarland turbidity standard', 'Antibiotic disks (e.g., Penicillin, Tetracycline, Gentamicin)'],
      media: ['Mueller-Hinton Agar (MHA) plates (poured to exactly 4mm depth)'],
      glasswareEquipment: ['Sterile cotton swabs', 'Antibiotic disk dispenser or sterile forceps', 'Ruler or calipers'],
      safetyPPE: ['Lab coat', 'Gloves']
    },
    protocol: [
      { stepNumber: 1, title: 'Inoculum Preparation', description: 'Prepare a suspension of the test organism in sterile saline matching the 0.5 McFarland standard.' },
      { stepNumber: 2, title: 'Swabbing', description: 'Dip a sterile swab into the suspension, press against the tube wall to remove excess fluid, and streak the MHA plate in three different directions to ensure a uniform lawn.' },
      { stepNumber: 3, title: 'Drying', description: 'Allow the plate to dry for 5 minutes.' },
      { stepNumber: 4, title: 'Disk Placement', description: 'Using sterile forceps, place the antibiotic disks firmly onto the agar surface, spaced evenly apart.' },
      { stepNumber: 5, title: 'Incubation', description: 'Incubate the plates inverted at 37°C for 16-18 hours.', durationSeconds: 64800 },
      { stepNumber: 6, title: 'Measurement', description: 'Measure the diameter of the clear zones (Zones of Inhibition) in millimeters using a ruler.' }
    ],
    expectedObservations: {
      visualDescription: 'A confluent lawn of opaque bacterial growth punctuated by circular, completely clear zones around the white paper antibiotic disks.',
      interpretationGuide: 'Compare measured zone diameters to standard CLSI tables to classify the organism as Susceptible (S), Intermediate (I), or Resistant (R).'
    },
    troubleshootingTips: [
      'If the agar is too thick (>4mm), diffusion is slow, leading to falsely small zones (false resistance).',
      'If the inoculum is too heavy (>0.5 McFarland), zones will be falsely small.'
    ],
    vivaQuestions: [
      { question: 'Why is Mueller-Hinton agar specifically used for this test?', answer: 'It is highly standardized for cation concentration (Ca, Mg) and allows for highly reproducible antibiotic diffusion rates.' }
    ],
    faqs: []
  },

  // =========================================================================
  // BIOCHEMISTRY & CARBOHYDRATES
  // =========================================================================
  {
    id: 'biochem-benedicts',
    title: 'Benedicts Test for Reducing Sugars',
    category: 'Biochemical Characterization',
    level: 'BSc',
    durationEstimate: '1 hour',
    biosafetyLevel: 'BSL-1',
    summary: 'Qualitative test to detect the presence of reducing sugars (like glucose, fructose, and maltose) in biological samples.',
    tags: ['Biochemistry', 'Carbohydrates', 'Reducing Sugars'],
    aim: 'To understand the chemical basis of carbohydrate reduction and perform Benedicts test on various sugar solutions.',
    principle: 'Reducing sugars have a free aldehyde or ketone group that can donate electrons. Under hot alkaline conditions, they reduce the blue cupric ions (Cu2+) in Benedicts reagent to cuprous ions (Cu+), which precipitate out of solution as brick-red cuprous oxide (Cu2O).',
    requirements: {
      reagents: ['Benedicts Reagent (CuSO4, Sodium Citrate, Sodium Carbonate)', 'Test sugar solutions (Glucose, Sucrose, Starch)'],
      media: [],
      glasswareEquipment: ['Test tubes and rack', 'Boiling water bath', 'Tongs'],
      safetyPPE: ['Lab coat', 'Safety glasses', 'Heat-resistant gloves']
    },
    protocol: [
      { stepNumber: 1, title: 'Preparation', description: 'Label test tubes for each sugar and a water blank.' },
      { stepNumber: 2, title: 'Reagent Addition', description: 'Add 5 mL of Benedicts reagent to each tube.' },
      { stepNumber: 3, title: 'Sugar Addition', description: 'Add 8-10 drops of the test sugar solution to the respective tube.' },
      { stepNumber: 4, title: 'Heating', description: 'Place all tubes in a vigorously boiling water bath for exactly 5 minutes.', criticalWarning: 'Boiling water baths can cause severe burns.' },
      { stepNumber: 5, title: 'Cooling', description: 'Remove tubes carefully using tongs and allow them to cool slowly at room temperature.' },
      { stepNumber: 6, title: 'Observation', description: 'Observe and record the color of the precipitate.' }
    ],
    expectedObservations: {
      positiveResult: 'A green, yellow, orange, or brick-red precipitate forms, indicating varying concentrations of reducing sugars.',
      negativeResult: 'The solution remains clear blue.',
      visualDescription: 'Depending on sugar concentration, a striking color gradient from blue -> green -> yellow -> orange -> red.',
      interpretationGuide: 'Blue (no change) = Negative. Green/Yellow = Trace/Low. Orange/Red = Moderate. Brick-red = High sugar.'
    },
    troubleshootingTips: [
      'Sucrose is not a reducing sugar and will test negative unless it is first hydrolyzed into glucose and fructose with acid.'
    ],
    vivaQuestions: [
      { question: 'What is the active component that is reduced in Benedicts reagent?', answer: 'Cupric ions (Cu2+) are reduced to Cuprous ions (Cu+).' }
    ],
    faqs: []
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
    aim: 'To construct a UV survival curve for E. coli and demonstrate light-dependent DNA repair (photoreactivation).',
    principle: 'UV light at 254nm is highly absorbed by DNA, causing adjacent pyrimidine bases (thymine) to covalently bond, forming thymine dimers. This distorts the DNA helix, blocking replication. Photoreactivation uses the enzyme photolyase, activated by visible light, to cleave the dimers.',
    requirements: {
      reagents: ['Sterile saline dilution blanks'],
      media: ['E. coli broth culture (mid-log phase)', 'Nutrient Agar plates'],
      glasswareEquipment: ['UV germicidal lamp (254 nm)', 'Cardboard shields', 'Spreaders'],
      safetyPPE: ['Lab coat', 'UV-blocking safety goggles', 'Gloves']
    },
    protocol: [
      { stepNumber: 1, title: 'Inoculation', description: 'Prepare serial dilutions of the E. coli culture and spread-plate 0.1 mL of a 10^-5 dilution onto several Nutrient Agar plates.' },
      { stepNumber: 2, title: 'UV Exposure', description: 'Remove the lids of the plates (UV cannot penetrate plastic/glass). Expose plates to the UV lamp at a fixed distance for varying times (e.g., 0, 10, 30, 60, 120 seconds). Use cardboard to cover half of each plate as an internal control.', criticalWarning: 'Never look directly at a UV lamp. Ensure the lamp is shielded.' },
      { stepNumber: 3, title: 'Dark Repair', description: 'Immediately cover the plates in aluminum foil to prevent light exposure (dark repair only).' },
      { stepNumber: 4, title: 'Photoreactivation', description: 'Expose one additional set of UV-irradiated plates to visible light for 30 mins before incubating.' },
      { stepNumber: 5, title: 'Incubation', description: 'Incubate all plates at 37°C for 24-48 hours.' },
      { stepNumber: 6, title: 'Counting', description: 'Count colonies and calculate survival percentage relative to the 0-second control.' }
    ],
    expectedObservations: {
      visualDescription: 'Plates exposed to UV for longer times will have exponentially fewer colonies. The half of the plate covered by cardboard will show a thick lawn of growth.',
      interpretationGuide: 'Colony counts will decrease logarithmically as UV exposure time increases. Plates exposed to visible light post-UV will show significantly higher survival rates due to photolyase repair enzymes.'
    },
    troubleshootingTips: [
      'Leaving the plastic lid on during UV exposure will block 254nm light entirely, resulting in no cell death.'
    ],
    vivaQuestions: [
      { question: 'What specific type of DNA damage is primarily caused by 254nm UV light?', answer: 'Cyclobutane pyrimidine dimers (mostly thymine dimers).' }
    ],
    faqs: []
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
    aim: 'To isolate amylolytic microbes from natural soil and visualize enzyme activity using iodine.',
    principle: 'Alpha-amylase is a critical industrial enzyme used in brewing and corn syrup production. It acts on alpha-1,4-glycosidic bonds in starch. Screening on starch agar allows rapid visual identification. Starch reacts with iodine to form a deep blue-black complex. Colonies that secrete amylase will leave a clear halo where starch was degraded.',
    requirements: {
      reagents: ['Grams Iodine solution', 'Sterile dilution blanks'],
      media: ['Starch Agar plates (Nutrient agar supplemented with 1% soluble starch)', 'Soil samples'],
      glasswareEquipment: ['Test tubes', 'Vortex mixer', 'Spreaders'],
      safetyPPE: ['Lab coat', 'Gloves']
    },
    protocol: [
      { stepNumber: 1, title: 'Sample Prep', description: 'Prepare a soil suspension: 1g soil in 10 mL sterile water. Shake vigorously.' },
      { stepNumber: 2, title: 'Dilution', description: 'Perform serial dilutions up to 10^-4.' },
      { stepNumber: 3, title: 'Inoculation', description: 'Spread 0.1 mL of dilutions onto Starch Agar plates.' },
      { stepNumber: 4, title: 'Incubation', description: 'Incubate plates at 30°C for 48-72 hours to allow growth and enzyme secretion.', durationSeconds: 172800 },
      { stepNumber: 5, title: 'Staining', description: 'After incubation, flood the agar plates with Grams Iodine solution.' },
      { stepNumber: 6, title: 'Observation', description: 'Pour off excess iodine after 1 minute. Observe the colonies for a clear, colorless halo against the dark blue/purple background.' }
    ],
    expectedObservations: {
      positiveResult: 'A clear, colorless halo surrounding the colony on a dark blue background.',
      negativeResult: 'The dark blue color extends right up to the edge of the colony.',
      visualDescription: 'Colonies appear like bright stars in a dark night sky where the amylase has cleared the starch.',
      interpretationGuide: 'A clear halo indicates the production and secretion of extracellular alpha-amylase.'
    },
    troubleshootingTips: [
      'Reading the plate too slowly after iodine addition can result in the iodine diffusing away or evaporating, causing false clear zones.'
    ],
    vivaQuestions: [
      { question: 'Why must we wait 48-72 hours before testing with iodine?', answer: 'To allow the organisms sufficient time to grow and secrete enough extracellular enzyme to create a visible degradation zone.' }
    ],
    faqs: []
  }
];
