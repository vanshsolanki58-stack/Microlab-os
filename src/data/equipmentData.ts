import { EquipmentSOP } from '@/types/microbiology';

export const equipmentData: EquipmentSOP[] = [
  // ==========================================
  // BSC LEVEL ESSENTIAL MACHINERY
  // ==========================================
  {
    id: 'autoclave-vertical',
    name: 'Vertical Autoclave (Steam Sterilizer)',
    tagline: 'High-pressure steam sterilizer for media, glassware, and biohazard decontamination at 121°C @ 15 psi.',
    aliases: ['Pressure Steam Cooker', 'Benchtop Retort Sterilizer'],
    level: 'BSc',
    category: 'Sterilization',
    iconType: 'ShieldAlert',
    principle: 'Utilizes saturated moist steam under 15 psi pressure (1.05 kg/cm²) to elevate water boiling temperature from 100°C to 121°C. The latent heat released upon condensation denatures all microbial proteins and irreversibly coagulates endospores of Geobacillus stearothermophilus within 15-20 minutes.',
    partsUsed: [
      { name: 'Pressure Chamber & Outer Jacket', function: 'Heavy-gauge stainless steel vessel engineered to withstand internal pressures up to 30 psi.' },
      { name: 'Immersion Heating Elements', function: 'Electrical resistive coils in the water sump that generate continuous saturated steam.' },
      { name: 'Bourdon Pressure Gauge & Temperature Scale', function: 'Dual dial indicating chamber pressure (psi/bar) and corresponding steam temperature (°C).' },
      { name: 'Air Exhaust / Bleed Valve', function: 'Expels cold trapped air during warm-up so only pure steam fills the chamber.' },
      { name: 'Spring-Loaded Safety Relief Valve', function: 'Emergency pressure pop-off valve that automatically vents if pressure exceeds 20 psi.' },
      { name: 'Silicone Lid Gasket & Radial Clamping Wing Nuts', function: 'Ensures an airtight, steam-leak-proof hermetic seal during operation.' },
      { name: 'Perforated Stainless Steel Loading Baskets', function: 'Holds bottles and flasks above the boiling water reservoir, allowing steam circulation.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Check that water covers immersion heating coils by at least 2 inches with fresh distilled water.',
        'Inspect silicone lid gasket for cracks, burns, or agar powder build-up.',
        'Verify bottle caps are loosened by 1/4 turn to avoid explosive vessel bursts.'
      ],
      operation: [
        'Place items in perforated baskets with adequate spacing (never jam tightly).',
        'Place autoclave indicator tape across packages.',
        'Tighten lid wing nuts in opposite diagonal pairs for even compression.',
        'Open exhaust valve and power ON heating elements. Let steam purge air for 5-7 minutes.',
        'Close exhaust valve once pure steam roars out. Allow pressure to rise to 15 psi (121°C).',
        'Maintain 15 psi for 15 minutes (liquids/media) or 20 minutes (discard waste).'
      ],
      shutdown: [
        'Switch OFF power. FOR LIQUIDS: Let cool naturally until pressure reaches exactly 0 psi and temperature <80°C.',
        'Never force-open exhaust valve on liquid batches (causes violent boiling over).',
        'Wear heat-resistant safety gloves and face shield when opening lid away from face.'
      ]
    },
    criticalSafetyRules: [
      'NEVER autoclave sealed, tightly capped glass bottles — thermal pressure will shatter glass violently.',
      'NEVER attempt to unscrew lid nuts while the pressure gauge indicates any reading above 0 psi.',
      'NEVER autoclave flammable solvents, bleach, or corrosive volatile chemicals.'
    ],
    calibrationSteps: [
      'Weekly biological spore ampoule test: Geobacillus stearothermophilus spores (10^6) incubated at 55°C for 24h.',
      'Class 5 chemical integrator strip run with every sterilization cycle.',
      'Annual certified pressure gauge recalibration against master standard.'
    ],
    routineMaintenance: [
      'Daily: Drain sump water and refill with pure deionized water to prevent mineral scale.',
      'Weekly: Clean chamber floor of boiled-over agar spills with warm water and non-chloride detergent.',
      'Quarterly: Manually test emergency safety relief valve ring.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Chamber reaches 15 psi but media comes out contaminated (Incomplete Sterilization)',
        underlyingCause: 'Air was not purged before closing exhaust valve. Trapped air-steam mixtures have lower temperatures (e.g. 112°C instead of 121°C at 15 psi).',
        fixAndPrevention: 'Leave exhaust valve open during heating until a steady roaring steam stream displaces all internal air (5-7 mins).'
      },
      {
        errorSymptom: 'Agar media boils over, coating baskets and flasks',
        underlyingCause: 'Fast pressure exhaust was used on liquid loads, causing superheated broth to boil flash-explosively.',
        fixAndPrevention: 'Always use Slow Exhaust / Natural Cooling for liquids. Never open valve manually until gauge reads 0 psi.'
      },
      {
        errorSymptom: 'Agar media turns brown or fails to solidify after autoclaving',
        underlyingCause: 'Over-sterilization (>30 mins) or overheating acidic media, causing caramelization of sugars and acid hydrolysis of agar polysaccharides.',
        fixAndPrevention: 'Strictly monitor 15-minute cycle at 121°C; autoclave sugars and acidic components separately if pH < 5.0.'
      }
    ]
  },

  {
    id: 'compound-brightfield-microscope',
    name: 'Compound Light & Oil Immersion Microscope',
    tagline: 'Primary optical magnification tool (40x - 1000x) for observing stained bacterial smears, fungal hyphae, and yeast budding.',
    aliases: ['Brightfield Clinical Microscope', 'Biological Student Microscope'],
    level: 'BSc',
    category: 'Imaging',
    iconType: 'Eye',
    principle: 'Combines an objective lens and an ocular eyepiece to produce a magnified, inverted virtual image. Light from a halogen/LED sub-stage lamp passes through an Abbe condenser and iris diaphragm. Cedarwood or synthetic immersion oil (refractive index n = 1.518, matching glass) eliminates light refraction at the slide-air boundary, maximizing Numerical Aperture (NA = 1.25) to resolve objects down to 0.2 µm under 100x.',
    partsUsed: [
      { name: 'Revolving Nosepiece & Objectives', function: 'Holds 4x (Scanning), 10x (Low power), 40x (High dry), and 100x (Oil immersion spring-loaded).' },
      { name: 'Abbe Sub-Stage Condenser', function: 'Focuses and concentrates light beam onto the slide specimen plane.' },
      { name: 'Iris Diaphragm & Aperture Lever', function: 'Regulates cone diameter of illuminating light to balance contrast vs resolution.' },
      { name: 'Coarse & Fine Coaxial Adjustment Knobs', function: 'Coarse knob moves stage vertically for rapid focus; Fine knob allows micrometric focal sharpness.' },
      { name: 'Mechanical Stage & Coaxial Slide Holder', function: 'Graduated X-Y caliper knobs to scan slide across field of view systematically.' },
      { name: 'Binocular Eyepieces (10x)', function: 'Provides diopter adjustment and interpupillary distance scaling for stereo comfort.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Place microscope on a sturdy level table away from direct sunlight.',
        'Clean lenses with optical lens paper only (never use Kimwipes or rough tissue).',
        'Verify voltage dimmer is dialed down to lowest level before turning power ON.'
      ],
      operation: [
        'Clip stained slide onto mechanical stage, smear facing UP.',
        'Start with 10x objective; raise stage to topmost position with coarse knob while looking from side.',
        'Look into eyepieces and adjust fine focus until specimen is crisp.',
        'Switch to 40x objective and adjust fine focus and iris diaphragm for contrast.',
        'FOR 100x OIL: Rotate nosepiece halfway between 40x and 100x. Add 1 drop of immersion oil directly on illuminated area. Click 100x into oil. Use FINE FOCUS only.'
      ],
      shutdown: [
        'Lower stage, remove glass slide.',
        'IMMEDIATELY wipe oil from 100x lens using fresh lens paper moistened with 70% isopropanol.',
        'Switch to lowest 4x objective, lower dimmer, switch OFF power, and cover with dust jacket.'
      ]
    },
    criticalSafetyRules: [
      'NEVER turn coarse adjustment knob when on 40x or 100x objectives (will crush the glass slide and crack front lens element).',
      'NEVER allow immersion oil to touch or contaminate the 40x dry objective.',
      'Always carry microscope with two hands: one gripping the arm, one supporting the base.'
    ],
    calibrationSteps: [
      'Stage micrometer (0.01 mm divisions) aligned with ocular reticle units (OU) to calculate µm/OU conversion factors for 10x, 40x, 100x.',
      'Köhler illumination centering: Focus condenser, close field diaphragm, center polygon, open until field is just filled.'
    ],
    routineMaintenance: [
      'Daily: Clean all ocular and objective glass faces with lens paper.',
      'Monthly: Lubricate mechanical stage gears with specialized optical grease.',
      'Annually: Professional optical alignment and prism cleaning.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Image is pitch black or very dark at 100x magnification',
        underlyingCause: 'Substage condenser is lowered all the way down, or iris diaphragm is closed shut.',
        fixAndPrevention: 'Raise condenser to the topmost position and open iris diaphragm to match 100x NA (0.9-1.25).'
      },
      {
        errorSymptom: 'Field of view is hazy, milky, and impossible to focus sharply',
        underlyingCause: 'Dried, hardened immersion oil on the 100x or 40x lens front element from previous uncleaned use.',
        fixAndPrevention: 'Clean lens gently with lens paper dipped in optical lens cleaning fluid or reagent-grade isopropanol.'
      },
      {
        errorSymptom: 'Artifact specks rotate when the ocular eyepiece is turned',
        underlyingCause: 'Mascara, eyelash oil, or dust particles settled on the top ocular glass surface.',
        fixAndPrevention: 'Wipe top surface of eyepiece with circular motion using dry lens paper.'
      }
    ]
  },

  {
    id: 'bacteriological-incubator',
    name: 'Bacteriological Static Incubator (37°C)',
    tagline: 'Thermostatically controlled chamber providing stable warm ambient environment for microbial culture propagation.',
    aliases: ['Static Lab Incubator', 'Culture Chamber'],
    level: 'BSc',
    category: 'Incubation & Mixing',
    iconType: 'Thermometer',
    principle: 'Employs electrical resistive heating elements surrounded by natural convection or low-velocity forced air circulation, regulated by a PID digital micro-controller and PT100 temperature sensor to maintain precise temperatures (typically 37°C ± 0.5°C for human pathogens, or 28°C-30°C for environmental fungi).',
    partsUsed: [
      { name: 'Double Door System (Glass Inner + Insulated Outer)', function: 'Permits visual inspection of culture growth without disturbing chamber temperature.' },
      { name: 'PID Temperature Controller & LED Display', function: 'Maintains setpoint temperature with micro-degree accuracy via feedback loop.' },
      { name: 'Safety Over-Temperature Thermostat', function: 'Secondary physical cut-off circuit preventing accidental thermal runaways.' },
      { name: 'Perforated Stainless Steel Shelves', function: 'Allows non-obstructed convective thermal airflow around Petri dish stacks.' },
      { name: 'Internal Water Humidity Tray (Optional)', function: 'Maintains ambient humidity to prevent agar dehydration during extended incubation.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Check digital temperature display reads 37.0°C (or desired setpoint).',
        'Inspect internal chamber for spills or mold growth from broken tubes.'
      ],
      operation: [
        'Invert inoculated agar plates (lid facing DOWN) to prevent condensation droplets from falling onto bacterial streaks.',
        'Stack Petri dishes no higher than 3-4 plates high to ensure even heating.',
        'Close glass inner door followed by main insulated door.'
      ],
      shutdown: [
        'Remove plates promptly after designated incubation time (usually 18-24 hours).',
        'Wipe shelves with 70% ethanol if liquid was spilled.'
      ]
    },
    criticalSafetyRules: [
      'NEVER place flammable solvents, alcohol jars, or toxic volatile chemicals inside incubator.',
      'Always incubate Petri dishes inverted (upside down) to avoid condensation flooding.'
    ],
    calibrationSteps: [
      'Monthly temperature mapping: Place 5 calibrated digital thermometers (corners + center) to verify uniform temperature distribution within ±0.5°C.',
      'Annual NABL/ISO sensor recalibration against master reference thermocouple.'
    ],
    routineMaintenance: [
      'Weekly: Disinfect interior stainless walls with 70% isopropanol.',
      'Monthly: Autoclave and refill water humidity tray with sterile distilled water + antifungal copper sulfate traces.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Confluent watery bacterial lawn covering entire plate instead of isolated colonies',
        underlyingCause: 'Plates were incubated upright (lid UP); water vapor condensed on lid and dripped down, spreading bacteria across the agar surface.',
        fixAndPrevention: 'Always invert Petri dishes (agar side up, lid side down) before loading into incubator.'
      },
      {
        errorSymptom: 'Agar media dries out, cracks, and shrinks after 24 hours',
        underlyingCause: 'Incubator is running too hot (>40°C due to calibration drift) or ambient humidity in chamber is too dry (<30%).',
        fixAndPrevention: 'Verify temperature with a secondary reference thermometer; add a tray of sterile distilled water at the bottom.'
      }
    ]
  },

  {
    id: 'digital-analytical-balance',
    name: 'Precision Analytical Electronic Balance (0.1 mg)',
    tagline: 'High-sensitivity electromagnetic force restoration balance for micro-accurate chemical and antibiotic weighing.',
    aliases: ['Microbalance', 'Electronic Laboratory Scale'],
    level: 'BSc',
    category: 'Analytical',
    iconType: 'Scale',
    principle: 'Measures unknown mass by generating an opposing electromagnetic force via a servo coil in a magnetic field required to balance the load. Resolves mass down to 0.0001 g (0.1 mg) inside an enclosed glass draft shield to eliminate atmospheric draft errors.',
    partsUsed: [
      { name: 'Glass Draft Shield with Sliding Doors', function: 'Shields weighing pan from ambient air currents and laboratory draft turbulence.' },
      { name: 'Stainless Steel Weighing Pan', function: 'Receives the weighing boat/vessel.' },
      { name: 'Spirit Level Bubble & Leveling Feet', function: 'Ensures the balance is horizontally level for true gravitational vector measurement.' },
      { name: 'Tare / Zero Key', function: 'Subtacts mass of weighing container/boat so net sample weight is measured directly.' },
      { name: 'Internal Calibration Weight Mechanism', function: 'Automated motorized mass for motorized routine calibration.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Check spirit level bubble is centered in circle; adjust leveling feet if off.',
        'Ensure glass draft shield is clean of spilled chemical powders.',
        'Power ON and allow electronic warm-up for at least 15 minutes.'
      ],
      operation: [
        'Close draft doors and press "TARE / ZERO" button until display reads 0.0000 g.',
        'Open door, place clean weighing boat on center of pan, close door, and press TARE again.',
        'Add chemical powder using a clean spatula in small increments until target mass is reached.',
        'Close draft shield doors completely and wait for stability indicator (circle or "g" icon) before recording mass.'
      ],
      shutdown: [
        'Remove weighing boat immediately; clean any spilled powder around pan using soft camel-hair brush.',
        'Close glass doors.'
      ]
    },
    criticalSafetyRules: [
      'NEVER weigh chemicals directly onto the stainless steel pan without a weighing boat/paper.',
      'NEVER place hot or cold objects on the balance pan (thermal convection currents cause erratic readings).',
      'Never exceed maximum weight capacity (typically 120 g or 220 g).'
    ],
    calibrationSteps: [
      'Internal Motorized Calibration: Trigger auto-cal routine before analytical runs.',
      'External Class E2/F1 Stainless Steel Standard Weights (10g, 50g, 100g) calibration test monthly.'
    ],
    routineMaintenance: [
      'Daily: Clean pan and draft chamber with antistatic brush.',
      'Annual certified service calibration.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Weight display drifts continuously without stabilizing',
        underlyingCause: 'Weighing boat is carrying static electrical charge, or glass draft door is open to air currents.',
        fixAndPrevention: 'Close draft shield doors; use antistatic weighing boats or ionizer strip; let sample reach room temperature.'
      },
      {
        errorSymptom: 'Reagents prepared from weighed powder have incorrect pH or concentration',
        underlyingCause: 'Balance was not zeroed/tared after placing weighing boat, or balance was unlevel.',
        fixAndPrevention: 'Check spirit level bubble; always tare container before adding chemical powder.'
      }
    ]
  },

  {
    id: 'magnetic-stirrer-hotplate',
    name: 'Magnetic Stirrer with Ceramic Hotplate',
    tagline: 'Simultaneous chemical heating and magnetic vortex mixing for dissolving agar and preparing culture media.',
    aliases: ['Stirring Hotplate', 'Magnetic Agitator'],
    level: 'BSc',
    category: 'Incubation & Mixing',
    iconType: 'RotateCcw',
    principle: 'A rotating internal magnet driven by an electric motor creates a rotating magnetic field, spinning a Teflon-coated magnetic stir bar inside the vessel. Ceramic/aluminum heating elements simultaneously deliver uniform heat up to 350°C.',
    partsUsed: [
      { name: 'Ceramic Top Plate', function: 'Chemically resistant, high-thermal-conductivity surface for glass beakers and flasks.' },
      { name: 'Stir Speed Knob (100-1500 RPM)', function: 'Adjusts rotational speed of internal drive magnet.' },
      { name: 'Heat Control Knob & Digital Thermometer Probe', function: 'Regulates surface heating temperature with optional liquid immersion probe.' },
      { name: 'PTFE Teflon-Coated Magnetic Stir Bar (Flea)', function: 'Chemically inert magnetic capsule placed inside liquid for vortex generation.' },
      { name: 'Magnetic Stir Bar Retriever Wand', function: 'Long magnetic rod to safely extract stir bar from chemical flasks.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Inspect ceramic top plate for cracks or burnt chemical crust.',
        'Ensure beaker base is flat (never use round-bottom flasks without heating mantle).'
      ],
      operation: [
        'Place Teflon stir bar into beaker containing media liquid.',
        'Center beaker on plate. Slowly turn stirring knob to establish a gentle vortex (do not jump to max RPM).',
        'Turn on heat. Watch liquid carefully as agar reaches boiling point (transparent golden state).',
        'Turn off heat and stirring; retrieve stir bar with magnetic wand before autoclaving.'
      ],
      shutdown: [
        'Switch both knobs to OFF position.',
        'Leave plate uncovered until "HOT" warning lamp extinguishes.'
      ]
    },
    criticalSafetyRules: [
      'NEVER leave boiling agar unattended (agar boils over explosively within seconds of reaching 100°C).',
      'NEVER autoclave a flask with the magnetic stir bar inside (can break glass during pressure cycles).',
      'Beware of thermal burns from the ceramic top.'
    ],
    calibrationSteps: [
      'Digital tachometer verification of RPM at 300, 600, 1000 RPM.',
      'Thermocouple surface temperature verification.'
    ],
    routineMaintenance: [
      'Clean ceramic surface with damp cloth when completely cold.',
      'Check power cord for fraying.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Stir bar rattles, bounces violently, and loses magnetic coupling',
        underlyingCause: 'Stirring speed increased too rapidly, or beaker is off-center, or beaker base is concave.',
        fixAndPrevention: 'Slowly ramp speed from low to high; center the flat-bottomed beaker over plate.'
      },
      {
        errorSymptom: 'Agar media scorches and forms burnt brown flakes at bottom of flask',
        underlyingCause: 'Heating was turned to maximum without sufficient stirring speed, scorching agar powder on hot bottom.',
        fixAndPrevention: 'Always establish active vortex stirring BEFORE applying heat.'
      }
    ]
  },

  {
    id: 'constant-temp-waterbath',
    name: 'Thermostatic Serological Water Bath (45°C - 50°C)',
    tagline: 'Maintains molten agar at 45°C-50°C for pour-plating without solidifying or killing bacterial inocula.',
    aliases: ['Bacteriological Water Bath', 'Agar Tempering Bath'],
    level: 'BSc',
    category: 'Incubation & Mixing',
    iconType: 'Droplets',
    principle: 'Heats distilled water bath with immersion coils and circulating impeller to maintain uniform water temperatures (within ±0.1°C). Essential for tempering molten agar to 45°C-50°C (molten above 42°C, solidifies below 40°C), allowing bacterial mixing in pour plates without thermal cell death.',
    partsUsed: [
      { name: 'Stainless Steel Tank Basin', function: 'Holds distilled water reservoir with curved easy-clean corners.' },
      { name: 'Gabled Stainless Steel Lid', function: 'Pitched roof lid directing condensation droplets to tank walls rather than dripping on flask caps.' },
      { name: 'Internal Circulation Pump / Diffuser Tray', function: 'Eliminates hot/cold stratification spots throughout bath volume.' },
      { name: 'Microprocessor Digital PID Controller', function: 'Maintains target temperature within ±0.2°C.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Check water level is above minimum fill line with fresh distilled water.',
        'Turn on and allow bath to stabilize at setpoint (e.g. 48°C) for 30 minutes.'
      ],
      operation: [
        'Place autoclaved molten agar flasks into bath racks.',
        'Allow flasks to equilibrate for 30-45 minutes until entire flask is uniformly 48°C-50°C.',
        'Dry exterior of flask with paper towel before pouring into sterile plates.'
      ],
      shutdown: [
        'Turn OFF power switch at end of workday.',
        'Keep lid closed to prevent water evaporation.'
      ]
    },
    criticalSafetyRules: [
      'NEVER turn on heater when water bath is empty or below heating coil level (burns out elements immediately).',
      'Never use ordinary tap water (causes severe calcium carbonate mineral scaling).'
    ],
    calibrationSteps: [
      'Quarterly 5-point temperature calibration with certified mercury/digital thermometer.'
    ],
    routineMaintenance: [
      'Weekly: Drain and clean tank with non-abrasive detergent; refill with pure distilled water.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Zero colonies formed in pour plate method',
        underlyingCause: 'Molten agar was poured while too hot (>55°C), thermally killing the inoculated bacterial cells.',
        fixAndPrevention: 'Temper agar in water bath at 45°C-48°C; test flask against wrist before mixing bacterial culture.'
      },
      {
        errorSymptom: 'Lumpy, solidified agar clumps form while pouring plates',
        underlyingCause: 'Water bath temperature dropped below 42°C, allowing premature agar polymerization/gelling.',
        fixAndPrevention: 'Keep bath calibrated at 48°C-50°C until ready to pour.'
      }
    ]
  },

  // ==========================================
  // MSC LEVEL APPLIED & ANALYTICAL MACHINERY
  // ==========================================
  {
    id: 'biosafety-cabinet-class2',
    name: 'Class II Type A2 Biosafety Cabinet (BSC)',
    tagline: 'Primary biohazard containment hood with HEPA filtration providing personnel, product, and environmental protection.',
    aliases: ['Laminar Flow Biohazard Hood', 'Tissue Culture Hood'],
    level: 'MSc',
    category: 'Containment',
    iconType: 'ShieldCheck',
    principle: 'Draws room air into front intake grille to create an air barrier (personnel protection). 70% of air is recirculated through a supply HEPA filter as a laminar (non-turbulent) vertical downflow curtain over the work zone (product protection), while 30% is exhausted through an exhaust HEPA filter (environmental protection). Traps 99.97% of particles >=0.3 µm.',
    partsUsed: [
      { name: 'Supply & Exhaust HEPA Filters', function: 'Microfiber matrix trapping 99.97% of airborne bacteria, viruses, and fungal spores.' },
      { name: 'Magnehelic Differential Pressure Gauge', function: 'Indicates static pressure drop across HEPA filters (normal: 1.0 - 1.8 in. w.g.).' },
      { name: 'Sliding Front Glass Sash with Height Alarm', function: 'Positioned at certified operating height (8-10 inches); alarms if opened too high.' },
      { name: 'Centrifugal Blower Motor & Speed Controller', function: 'Maintains steady inflow (100 fpm) and downflow (60 fpm) velocities.' },
      { name: 'UV-C Germicidal Decontamination Lamp (254 nm)', function: 'Irradiates work surfaces to destroy surface microbial DNA when cabinet is closed.' },
      { name: 'Front Air Intake Grille & Rear Exhaust Perforations', function: 'Directs laminar air paths and prevents dirty room air entering clean zone.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Check Magnehelic pressure gauge reads within certified operating range.',
        'Turn UV lamp OFF. Turn Blower and Fluorescent light ON 15 minutes before starting work.'
      ],
      operation: [
        'Wipe down all interior surfaces with 70% ethanol from back to front.',
        'Disinfect all bottles, tip boxes, and pipettes before placing inside.',
        'Arrange workflow: Clean items on left, active work in center, biohazard discard on right.',
        'Do not block front intake grille with arms or paper towels.',
        'Move arms slowly in straight perpendicular motions to avoid disrupting air curtain.'
      ],
      shutdown: [
        'Surface disinfect all items before removal; wipe down stainless tray with 70% ethanol.',
        'Let blower run for 5 minutes to purge remaining aerosols.',
        'Pull sash fully closed and turn on UV lamp for 20 minutes if required by SOP.'
      ]
    },
    criticalSafetyRules: [
      'NEVER use open Bunsen burner flames inside a Class II BSC (heat disrupts laminar flow and can burn HEPA filter). Use micro-incinerators instead.',
      'NEVER work when sash height alarm is beeping.',
      'NEVER look at or expose skin to active UV-C radiation.'
    ],
    calibrationSteps: [
      'Annual NSF/ANSI 49 Certification: Inflow velocity (min 100 fpm), Downflow velocity uniformity (55-65 fpm).',
      'PAO/Emery aerosol photometer leak challenge across HEPA filters.'
    ],
    routineMaintenance: [
      'Daily: 70% ethanol surface decontamination.',
      'Monthly: Lift stainless work tray and clean lower drain trough.',
      'Annually: HEPA filter recertification.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Frequent cross-contamination of cell cultures / agar plates',
        underlyingCause: 'Front air intake grilles blocked by lab notebooks/arms, or rapid jerky arm movements breaking laminar air curtain.',
        fixAndPrevention: 'Keep front grille completely clear; work 4 inches inside sash; use slow deliberate arm motions.'
      },
      {
        errorSymptom: 'Magnehelic pressure gauge reading >2.5 inches water gauge',
        underlyingCause: 'HEPA filter is loaded and clogged with dust particulates, reducing airflow velocity below safe thresholds.',
        fixAndPrevention: 'Requires authorized service technician for chemical decontamination and HEPA filter replacement.'
      }
    ]
  },

  {
    id: 'uv-vis-spectrophotometer',
    name: 'UV-Visible Spectrophotometer',
    tagline: 'Measures optical density (OD600) and biomolecule concentration via Beer-Lambert light absorbance.',
    aliases: ['Colorimeter', 'Optical Density Reader', 'NanoDrop Spectrophotometer'],
    level: 'MSc',
    category: 'Analytical',
    iconType: 'TrendingUp',
    principle: 'Measures light absorbance through a sample relative to a solvent blank. Governed by Beer-Lambert Law: A = ε·c·l. Uses Tungsten lamp for visible range (340-1000 nm, OD600 for bacterial turbidity) and Deuterium lamp for ultraviolet range (190-340 nm, A260 for DNA/RNA, A280 for proteins).',
    partsUsed: [
      { name: 'Dual Light Sources (Tungsten-Halogen + Deuterium Lamp)', function: 'Emits continuous spectrum across Visible and UV wavelengths.' },
      { name: 'Monochromator & Diffraction Grating', function: 'Splits broad light into narrow monochromatic wavelength bands (e.g. exactly 600.0 nm).' },
      { name: 'Sample Cuvette Compartment', function: 'Holds 1 cm optical pathlength quartz or disposable polystyrene cuvettes.' },
      { name: 'Photodiode / Photomultiplier Tube (PMT) Detector', function: 'Quantifies transmitted light intensity (I) and converts to digital absorbance units (Abs).' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Turn ON spectrophotometer 20 minutes prior to use for lamp thermal stabilization.',
        'Inspect cuvettes: use quartz for UV (<340 nm), optical glass/plastic for Visible range.'
      ],
      operation: [
        'Set desired wavelength (e.g. 600 nm for bacterial growth kinetics).',
        'Fill blank cuvette with uninoculated sterile broth; wipe optical faces with Kimwipe.',
        'Insert blank in cuvette holder; press "AUTO ZERO / BLANK" (0.000 Abs).',
        'Vortex bacterial sample lightly, load sample cuvette, insert in same orientation, close lid, and read Abs.'
      ],
      shutdown: [
        'Remove cuvettes immediately; clean quartz cuvettes with dH2O and 70% ethanol.',
        'Turn OFF lamp switches.'
      ]
    },
    criticalSafetyRules: [
      'NEVER use standard plastic or glass cuvettes in UV range (<340 nm) — glass absorbs UV light; use quartz only.',
      'Always close sample compartment lid during measurement (stray light causes huge errors).'
    ],
    calibrationSteps: [
      'Wavelength accuracy check using certified Holmium Oxide glass filter (peaks at 279.3 nm, 360.8 nm, 536.4 nm).',
      'Photometric linearity verified with Potassium Dichromate standards.'
    ],
    routineMaintenance: [
      'Track lamp running hours; replace Deuterium/Tungsten lamps every 2000 operating hours.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Absorbance reading drifts downwards while taking measurement',
        underlyingCause: 'Bacterial cells are precipitating / settling to the bottom of the cuvette below the light beam.',
        fixAndPrevention: 'Invert/mix sample immediately before loading into cuvette compartment.'
      },
      {
        errorSymptom: 'Absorbance reads >2.0 - 3.0 Abs (Detector Saturation / Non-linear)',
        underlyingCause: 'Cell density is too high (>10^9 cells/mL), exceeding linear dynamic range of Beer-Lambert Law.',
        fixAndPrevention: 'Dilute sample 1:2, 1:5, or 1:10 with blank media, re-read, and multiply result by dilution factor.'
      }
    ]
  },

  {
    id: 'orbital-shaking-incubator',
    name: 'Orbital Shaking Incubator (Shaker)',
    tagline: 'Controlled temperature and circular orbital agitation (50-300 RPM) for aerobic broth cultivation.',
    aliases: ['Environmental Shaker', 'Broth Culture Shaker'],
    level: 'MSc',
    category: 'Incubation & Mixing',
    iconType: 'RotateCcw',
    principle: 'Combines precise temperature regulation (20°C-70°C) with circular orbital motion (19mm or 25mm orbit diameter) at 50-350 RPM. Agitation breaks surface liquid tension, maximizing oxygen transfer rate (OTR) and preventing anaerobic cell settling in bacterial cultures.',
    partsUsed: [
      { name: 'Orbital Drive Mechanism & Counterbalanced Motor', function: 'Generates smooth, vibration-free circular orbital shaking without walking across floor.' },
      { name: 'Universal Clamp Platform', function: 'Holds interchangeable spring clamps for 100mL, 250mL, 500mL, 1L, and 2L Erlenmeyer flasks.' },
      { name: 'Digital Speed & Temperature Microprocessor Controller', function: 'Sets and monitors RPM and temperature with auto-stop door sensor.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Ensure flask clamps are securely screwed to shaker table.',
        'Verify liquid volume in flasks does not exceed 20-25% of total flask capacity (e.g. 50mL liquid in 250mL flask) to ensure aeration.'
      ],
      operation: [
        'Secure culture flasks into spring clamps; balance load symmetrically.',
        'Close hood/lid. Set temperature (e.g. 37°C) and RPM (e.g. 180-200 RPM).',
        'Start shaking; verify smooth rotation.'
      ],
      shutdown: [
        'Stop shaking before opening lid.',
        'Unclamp flasks and inspect for optical density.'
      ]
    },
    criticalSafetyRules: [
      'NEVER fill culture flasks more than 1/4 full — prevents media sloshing into foam plugs/vent caps.',
      'Always balance flask distribution symmetrically on shaking platform.'
    ],
    calibrationSteps: [
      'Digital optical tachometer RPM calibration.',
      'Temperature uniformity mapping.'
    ],
    routineMaintenance: [
      'Monthly: Check drive belt tension and clamp screws.',
      'Disinfect spills inside tray immediately.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Bacteria enter premature stationary phase / low biomass yield',
        underlyingCause: 'Culture flasks were filled >50% volume or shaking RPM was too low (<100 RPM), causing oxygen starvation.',
        fixAndPrevention: 'Keep broth volume at 15-20% of flask volume and shake at 180-220 RPM for aerobic E. coli cultures.'
      }
    ]
  },

  {
    id: 'refrigerated-centrifuge',
    name: 'High-Speed Refrigerated Centrifuge & Microfuge',
    tagline: 'High centrifugal force (up to 20,000 x g) with temperature control (4°C) for harvesting cells, DNA, and proteins.',
    aliases: ['Benchtop Cooling Centrifuge', 'Microcentrifuge'],
    level: 'MSc',
    category: 'Centrifugation',
    iconType: 'Orbit',
    principle: 'Spins rotor at high angular velocity to create high Relative Centrifugal Force (RCF = 1.118 x 10^-5 x r x RPM^2) separating particles by density. Active compressor refrigeration maintains 4°C to prevent thermal denaturation of delicate enzymes, nucleic acids, and cell membranes.',
    partsUsed: [
      { name: 'Fixed-Angle & Swing-Bucket Rotors', function: 'Houses 1.5mL microfuge tubes, 15mL, or 50mL Falcon tubes.' },
      { name: 'Hermetic Refrigeration Compressor', function: 'Cools armored bowl down to -10°C to +40°C.' },
      { name: 'Electronic Motorized Safety Lid Lock', function: 'Prevents opening lid while rotor is in motion.' },
      { name: 'Imbalance Sensor & Cutoff Switch', function: 'Instantly stops motor if weight distribution is asymmetrical.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Pre-cool centrifuge to 4°C if handling plasmid DNA or proteins.',
        'WEIGH AND BALANCE opposing tubes on an analytical balance to within ±0.01 grams.'
      ],
      operation: [
        'Place balanced tubes in diametrically opposite rotor slots.',
        'Screw aerosol-tight rotor safety lid tightly onto rotor.',
        'Close centrifuge lid. Set speed in RCF (g-force) or RPM, time, and temperature.',
        'Press START; monitor until speed ramps up smoothly.'
      ],
      shutdown: [
        'Wait for complete stop and audible unlock beep before opening lid.',
        'Carefully remove tubes without disturbing the compacted pellet.'
      ]
    },
    criticalSafetyRules: [
      'CRITICAL: NEVER run an unbalanced rotor. An unbalanced spin at 15,000 RPM can explode rotor and destroy drive spindle.',
      'Always use rotor safety lid to prevent aerosol escape in case of tube breakage.'
    ],
    calibrationSteps: [
      'Optical tachometer RPM validation and temperature probe calibration.'
    ],
    routineMaintenance: [
      'Daily: Wipe condensation from bowl and leave lid open after defrosting to dry.',
      'Monthly: Lubricate rotor spindle with silicone lubricant.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'Imbalance Error / Loud rattling noise and emergency motor shutdown',
        underlyingCause: 'Opposing tubes were filled with unequal liquid volumes or rotor slots were loaded asymmetrically.',
        fixAndPrevention: 'Always balance opposing tubes on a scale to within ±0.01 g before loading.'
      },
      {
        errorSymptom: 'Pellet is smeared, loose, or aspirates back into liquid during decanting',
        underlyingCause: 'Braking profile was set to rapid decel instead of gentle coast, disrupting fragile cell pellets.',
        fixAndPrevention: 'Use moderate deceleration brake settings for fragile spheroplasts or plasmid pellets.'
      }
    ]
  },

  // ==========================================
  // PHD & RESEARCH LEVEL MOLECULAR & INDUSTRIAL MACHINERY
  // ==========================================
  {
    id: 'pcr-thermocycler',
    name: 'Automated Gradient PCR Thermocycler',
    tagline: 'Precision Peltier-driven thermal cycler for DNA amplification, primer optimization, and 16S rRNA barcoding.',
    aliases: ['DNA Thermal Cycler', 'PCR Machine'],
    level: 'PhD',
    category: 'Molecular & Electrophoresis',
    iconType: 'Cpu',
    principle: 'Utilizes solid-state Peltier thermoelectric heating/cooling elements to cycle DNA reactions through Denaturation (95°C), Primer Annealing (50-65°C), and Taq Polymerase Extension (72°C) at ramp rates up to 4-5°C/second. Features a heated lid (105°C) to prevent sample condensation on tube caps.',
    partsUsed: [
      { name: 'Peltier Thermoelectric Block (96-well 0.2mL)', function: 'Rapid thermal cycling across sample tubes with sub-degree temperature gradient capability.' },
      { name: 'Heated Top Lid (105°C)', function: 'Keeps tube tops hotter than reaction volume, eliminating evaporation and condensation without mineral oil overlays.' },
      { name: 'Touchscreen Firmware & Program Memory', function: 'Stores multi-step touch-down, gradient, and reverse transcription profiles.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Check that 0.2 mL thin-wall PCR tubes or 96-well plate are sealed tightly with optical caps/foil.',
        'Ensure reaction volumes are between 10 µL and 50 µL.'
      ],
      operation: [
        'Place tubes symmetrically across block.',
        'Close and clamp heated lid.',
        'Select PCR profile (e.g. 16S rRNA: 95°C 5m -> [95°C 30s, 54°C 45s, 72°C 90s x 30 cycles] -> 72°C 10m -> 4°C hold).',
        'Press START; verify heated lid reaches 105°C before block starts cycling.'
      ],
      shutdown: [
        'Retrieve tubes and store PCR amplicons at 4°C or -20°C for gel electrophoresis.'
      ]
    },
    criticalSafetyRules: [
      'Heated lid reaches 105°C — avoid touching internal block surface when opened.',
      'Only use certified thin-wall PCR tubes rated for high thermal transfer.'
    ],
    calibrationSteps: [
      'Annual temperature verification system (TVS) calibration probe matrix across all 96 wells.'
    ],
    routineMaintenance: [
      'Keep well block clean of dust and spilled oil/dye using 70% isopropanol swabs.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'No PCR product / zero amplicon bands on agarose gel',
        underlyingCause: 'Heated lid was left loose causing complete reaction evaporation, or annealing temperature was set too high above primer Tm.',
        fixAndPrevention: 'Clamp heated lid firmly; verify primer Tm and set annealing temperature to Tm - 3°C to 5°C.'
      },
      {
        errorSymptom: 'Multiple non-specific bands and primer-dimers on gel',
        underlyingCause: 'Annealing temperature too low or PCR assembled at room temperature without Hot-Start enzyme.',
        fixAndPrevention: 'Assemble Master Mix on ice; increase annealing temperature by 2°C-4°C or run gradient PCR.'
      }
    ]
  },

  {
    id: 'stirred-tank-bioreactor',
    name: 'Stirred-Tank Benchtop Bioreactor / Fermenter (3L - 10L)',
    tagline: 'Automated fermentation vessel with online closed-loop regulation of Dissolved Oxygen (DO), pH, temperature, and feeding.',
    aliases: ['Microbial Fermenter', 'Bioprocess Reactor'],
    level: 'PhD',
    category: 'Fermentation',
    iconType: 'FlaskRound',
    principle: 'Provides closed-loop automated cultivation of high-density microbial biomass and recombinant proteins. Controls temperature via water jacket/heating blanket, pH via automated peristaltic acid/base pumps, dissolved oxygen (DO) via cascade impeller agitation (200-1000 RPM) and sparged sterile airflow (vvm), and foam levels via conductivity probe antifoam dosing.',
    partsUsed: [
      { name: 'Borosilicate Glass Vessel with Stainless Headplate', function: 'Pressure-rated autoclavable vessel housing multiple sensor and addition ports.' },
      { name: 'Rushton Turbine & Marine Impellers', function: 'Rushton impellers provide high radial shear for gas dispersion; marine impellers provide axial blending.' },
      { name: 'Polarographic / Optical Dissolved Oxygen (DO) Sensor', function: 'Monitors percentage of dissolved O2 in media in real time.' },
      { name: 'Autoclavable Gel-Filled pH Electrode', function: 'Monitors broth pH for automatic acid/base titration.' },
      { name: 'Sparger Ring & 0.2µm PTFE Inlet Gas Filter', function: 'Sparses sterile compressed air/oxygen microbubbles into the impeller zone.' },
      { name: 'Peristaltic Addition Pumps (Acid, Base, Antifoam, Nutrient Feed)', function: 'Micro-doses reagents based on programmable feedback logic.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Calibrate pH probe (pH 4.0 and 7.0 buffers) and polarographic DO probe before autoclaving.',
        'Autoclave vessel with media at 121°C for 20 minutes with vent filters protected in aluminum foil.'
      ],
      operation: [
        'Mount on controller; connect heating jacket, motor drive, and aeration lines.',
        'Perform 2-point 100% DO calibration after aerating and stirring at 37°C for 30 mins.',
        'Aseptically inoculate seed culture (5-10% v/v) through septum port.',
        'Enable cascade DO control (minimum 30% DO by ramping RPM from 300 to 900).'
      ],
      shutdown: [
        'Harvest fermentation broth for downstream centrifuge/biomass estimation.',
        'Immediately clean vessel, probes, and headplate with warm water and detergent.'
      ]
    },
    criticalSafetyRules: [
      'Ensure exhaust gas filter is not blocked (blocked exhaust creates dangerous vessel over-pressure).',
      'Never run agitator motor while vessel is dry.'
    ],
    calibrationSteps: [
      '2-point pH probe calibration (pH 4.0 & 7.0).',
      '2-point DO probe calibration (0% with N2 sparge or sulfite, 100% with air sparge at process temp/RPM).'
    ],
    routineMaintenance: [
      'Inspect mechanical impeller shaft seals and silicone O-rings before every run; replace yearly.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'DO drops to 0% and biomass growth stalls prematurely',
        underlyingCause: 'Oxygen transfer rate (OTR) is inadequate for high cell density respiration; agitation speed reached max limit.',
        fixAndPrevention: 'Enrich sparged gas stream with pure oxygen (O2 enrichment) or increase vessel backpressure.'
      },
      {
        errorSymptom: 'Broth foam overflows into exhaust filter, wetting filter and stalling run',
        underlyingCause: 'Severe foaming during exponential phase with inactive antifoam sensor or empty antifoam reservoir.',
        fixAndPrevention: 'Check antifoam probe sensitivity; ensure peristaltic pump is primed with sterile silicone antifoam.'
      }
    ]
  },

  {
    id: 'gel-electrophoresis-doc',
    name: 'Agarose Submarine Gel Electrophoresis & UV Gel Doc System',
    tagline: 'Horizontal electrophoresis apparatus and UV transilluminator camera system for sizing DNA/RNA fragments.',
    aliases: ['Gel Tank & Power Pack', 'UV Gel Documentation System'],
    level: 'PhD',
    category: 'Molecular & Electrophoresis',
    iconType: 'Camera',
    principle: 'Negatively charged phosphate backbones of DNA molecules migrate toward the positive anode (+) through a porous agarose matrix under constant electric field (typically 5-8 V/cm). Smaller DNA fragments migrate faster than larger ones. DNA stained with intercalating fluorescent dyes (GelRed or Ethidium Bromide) fluoresces bright orange/green under 302 nm UV or 470 nm Blue LED excitation.',
    partsUsed: [
      { name: 'Horizontal Buffer Tank & Platinum Electrodes', function: 'Holds 1X TAE/TBE running buffer and corrosion-resistant platinum wire electrodes.' },
      { name: 'UV-Transparent Gel Casting Tray & Well Combs', function: 'Casts 0.8% - 2.0% agarose gels with defined sample loading wells.' },
      { name: 'Regulated DC Power Supply (0-300V, 0-500mA)', function: 'Delivers constant voltage or constant current for electrophoretic separation.' },
      { name: 'UV/Blue Light Transilluminator & CCD Camera Darkroom', function: 'Captures high-resolution 16-bit fluorescent gel band images with molecular weight analysis software.' }
    ],
    standardOperatingProcedure: {
      preCheck: [
        'Cast agarose gel in 1X TAE buffer; add 1:10,000 GelRed/EtBr when cooled to 55°C.',
        'Submerge solidified gel in tank with 1X TAE covering surface by 2-3 mm.'
      ],
      operation: [
        'Load 5 µL DNA Ladder in Lane 1; load DNA samples mixed with 6X loading dye in subsequent wells.',
        'Connect lid: Black lead to Negative (-), Red lead to Positive (+).',
        'Set voltage to 90V - 100V constant; run for 45-60 minutes until dye front reaches 75% of gel length.',
        'Transfer gel to Gel Doc imaging darkroom; capture UV fluorescent image.'
      ],
      shutdown: [
        'Turn OFF power supply before touching lid or removing leads.',
        'Discard gel in dedicated solid chemical waste bin.'
      ]
    },
    criticalSafetyRules: [
      'HIGH VOLTAGE HAZARD: Never open gel tank lid or insert hands while power supply is running.',
      'WEAR UV EYE PROTECTION: 302 nm UV light causes severe photokeratitis and skin burns.',
      'Treat Ethidium Bromide as a potent mutagen; use nitrile gloves and dispose in dedicated hazardous waste.'
    ],
    calibrationSteps: [
      'Power supply voltage and current validation with digital multimeter.'
    ],
    routineMaintenance: [
      'Rinse tank with deionized water after every run to prevent buffer salt corrosion.'
    ],
    causesOfErrorsAndFalseResults: [
      {
        errorSymptom: 'DNA bands migrated backwards out of the top of the gel into buffer',
        underlyingCause: 'Electrode leads were connected in reverse (Red to negative, Black to positive). DNA runs toward RED (+).',
        fixAndPrevention: 'Always remember: "Run to Red" (DNA is negative and migrates toward the positive red anode).'
      },
      {
        errorSymptom: 'DNA bands are distorted, wavy, or smile across gel lanes',
        underlyingCause: 'Gel was run at excessive voltage (>120V), overheating buffer and causing uneven thermal mobility.',
        fixAndPrevention: 'Run at 5-8 V/cm of distance between electrodes (typically 80-100V for a standard 10cm gel).'
      }
    ]
  }
];
