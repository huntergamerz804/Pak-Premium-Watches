import { Product } from '../types';

import heroWatchImg from '../assets/images/hero_watch_mechanical_1790709805640.jpg';
import nocturneBlackImg from '../assets/images/watch_nocturne_black_1790709818113.jpg';
import meridianSteelImg from '../assets/images/watch_meridian_steel_1790709830297.jpg';
import regentRoseGoldImg from '../assets/images/watch_regent_rose_gold_1790709840514.jpg';
import macroMovementImg from '../assets/images/macro_movement_gears_1790709851996.jpg';

export { heroWatchImg, nocturneBlackImg, meridianSteelImg, regentRoseGoldImg, macroMovementImg };

export const PRODUCTS: Product[] = [
  {
    id: 'auren-nocturne',
    name: 'Pak-Premium Nocturne',
    subtitle: 'Open-Worked Skeleton Calibre',
    category: 'Tourbillon & Skeleton',
    price: 4850,
    caseSize: '42 mm',
    caseMaterial: 'Matte DLC 904L Austenitic Steel',
    movement: 'Mechanical Manual-Wind',
    calibre: 'Calibre AR-08 Skeleton',
    powerReserve: '68 Hours',
    waterResistance: '100 m / 10 ATM',
    crystal: 'Anti-Reflective Double Curved Sapphire',
    strap: 'Hand-Stitched Matte Black Alligator',
    warranty: '5-Year International Atelier Warranty',
    limitedEdition: 'Limited Edition of 250 Pieces',
    badge: 'Limited Run',
    description: 'An avant-garde exploration of mechanical transparency. The Nocturne exposes the complete gear train, balance wheel, and hand-beveled bridges under dual sapphire crystals, treated with proprietary anti-reflective coatings.',
    features: [
      'Entirely open-worked architectural bridges finished by hand',
      'Matte black Diamond-Like Carbon (DLC) hardened case surface',
      '21,600 vph (3 Hz) high-stability escapement with Glucydur balance',
      'Micro-blasted anthracite mainplate with hand-chamfered edges'
    ],
    specs: [
      { label: 'Calibre Reference', value: 'In-House Calibre AR-08' },
      { label: 'Diameter', value: '42.0 mm' },
      { label: 'Case Thickness', value: '10.8 mm' },
      { label: 'Frequency', value: '21,600 vibrations / hour (3 Hz)' },
      { label: 'Jewels', value: '27 Synthetic Rubies' },
      { label: 'Power Reserve', value: '68 Hours' },
      { label: 'Water Resistance', value: '10 bar (~100 metres)' },
      { label: 'Clasp', value: 'DLC Deployant Double-Folding Buckle' }
    ],
    primaryImage: nocturneBlackImg,
    galleryImages: [nocturneBlackImg, macroMovementImg, heroWatchImg]
  },
  {
    id: 'auren-meridian',
    name: 'Pak-Premium Meridian',
    subtitle: 'High-Beat Precision Chronometre',
    category: 'Classic Chronometre',
    price: 3450,
    caseSize: '40 mm',
    caseMaterial: 'Hand-Brushed 904L Stainless Steel',
    movement: 'Automatic Self-Winding',
    calibre: 'Calibre AR-03 Automatic',
    powerReserve: '56 Hours',
    waterResistance: '100 m / 10 ATM',
    crystal: 'Domed Box Sapphire with Inner AR',
    strap: 'French Slate Calfskin with Quick-Release',
    warranty: '5-Year International Atelier Warranty',
    badge: 'Chronometer',
    description: 'The quintessential modern dress chronometer. Crafted with a solid sterling silver hand-guilloché dial, flame-blued hands, and a chronometer-grade oscillating weight engraved with the Pak-Premium coat of arms.',
    features: [
      'Solid 925 sterling silver dial with hand-turned guilloché pattern',
      'Heat-blued leaf hands tempered to 290°C for permanent deep cobalt tone',
      'COSC-tested chronometer regulation (-2/+4 seconds per day)',
      'Tungsten heavy rotor with circular Geneva stripes decoration'
    ],
    specs: [
      { label: 'Calibre Reference', value: 'In-House Calibre AR-03' },
      { label: 'Diameter', value: '40.0 mm' },
      { label: 'Case Thickness', value: '9.6 mm' },
      { label: 'Frequency', value: '28,800 vibrations / hour (4 Hz)' },
      { label: 'Jewels', value: '31 Synthetic Rubies' },
      { label: 'Power Reserve', value: '56 Hours' },
      { label: 'Water Resistance', value: '10 bar (~100 metres)' },
      { label: 'Clasp', value: 'Engraved 904L Pin Buckle' }
    ],
    primaryImage: meridianSteelImg,
    galleryImages: [meridianSteelImg, macroMovementImg, heroWatchImg]
  },
  {
    id: 'auren-regent',
    name: 'Pak-Premium Regent',
    subtitle: 'Imperial Perpetual Reserve',
    category: 'Precious Metals',
    price: 6200,
    caseSize: '41 mm',
    caseMaterial: 'Solid 18k Sedna Rose Gold (750/1000)',
    movement: 'Automatic Mechanical with Power Indicator',
    calibre: 'Calibre AR-05 Perpetual Reserve',
    powerReserve: '72 Hours',
    waterResistance: '50 m / 5 ATM',
    crystal: 'High-Purity Scratch-Proof Sapphire',
    strap: 'Espresso Brown Louisiana Alligator Leather',
    warranty: '5-Year International Atelier Warranty',
    badge: 'Atelier Gold',
    description: 'Sculpted in solid 18k rose gold with an anthracite sunburst dial, faceted gold hour markers, and hand-polished bevelled lugs. A masterwork of quiet horological authority and balanced proportions.',
    features: [
      'Solid 18k Rose gold case with hand-polished and brushed flanks',
      'Anthracite sunburst dial with 18k gold applied Roman numerals',
      'Twin-barrel architecture providing an unyielding 72-hour reserve',
      'Exhibition sapphire caseback revealing 21k solid gold oscillating weight'
    ],
    specs: [
      { label: 'Calibre Reference', value: 'In-House Calibre AR-05' },
      { label: 'Diameter', value: '41.0 mm' },
      { label: 'Case Thickness', value: '10.2 mm' },
      { label: 'Frequency', value: '28,800 vibrations / hour (4 Hz)' },
      { label: 'Jewels', value: '33 Synthetic Rubies' },
      { label: 'Power Reserve', value: '72 Hours' },
      { label: 'Water Resistance', value: '5 bar (~50 metres)' },
      { label: 'Clasp', value: '18k Rose Gold Deployant Buckle' }
    ],
    primaryImage: regentRoseGoldImg,
    galleryImages: [regentRoseGoldImg, macroMovementImg, nocturneBlackImg]
  },
  {
    id: 'auren-sovereign',
    name: 'Pak-Premium Sovereign Tourbillon',
    subtitle: 'Celestial Escapement Masterpiece',
    category: 'Tourbillon & Skeleton',
    price: 5600,
    caseSize: '43 mm',
    caseMaterial: 'Brushed 904L Steel with 18k Gold Details',
    movement: 'Manual-Wind Flying Tourbillon',
    calibre: 'Calibre AR-12 Flying Tourbillon',
    powerReserve: '72 Hours',
    waterResistance: '100 m / 10 ATM',
    crystal: 'Cambered Sapphire Crystal with Dual AR Coatings',
    strap: 'Artisanal Black Alligator with Gold Contrast Stitching',
    warranty: '5-Year International Atelier Warranty',
    limitedEdition: 'Atelier Edition of 100',
    badge: 'Tourbillon',
    description: 'The crowning achievement of Pak-Premium watchmaking. A visible 60-second flying tourbillon carriage hovers serenely at 6 o’clock against an obsidian dial, hand-regulated to five positions across variable temperatures.',
    features: [
      '60-second flying tourbillon titanium carriage weighing just 0.28 grams',
      'Obsidian black lacquered dial with polished gold chapter ring',
      'Variable-inertia balance wheel with gold timing screws',
      'Individually numbered case engraving from 001/100'
    ],
    specs: [
      { label: 'Calibre Reference', value: 'In-House Calibre AR-12' },
      { label: 'Diameter', value: '43.0 mm' },
      { label: 'Case Thickness', value: '11.4 mm' },
      { label: 'Frequency', value: '21,600 vibrations / hour (3 Hz)' },
      { label: 'Jewels', value: '29 Synthetic Rubies' },
      { label: 'Power Reserve', value: '72 Hours' },
      { label: 'Water Resistance', value: '10 bar (~100 metres)' },
      { label: 'Clasp', value: 'Dual-Release Steel & Gold Deployant' }
    ],
    primaryImage: heroWatchImg,
    galleryImages: [heroWatchImg, macroMovementImg, nocturneBlackImg]
  },
  {
    id: 'auren-elan',
    name: 'Pak-Premium Élan Chronograph',
    subtitle: 'Flyback Column-Wheel Instrument',
    category: 'Sport & Chronograph',
    price: 4150,
    caseSize: '41.5 mm',
    caseMaterial: 'Grade 5 Titanium & Matte Ceramic',
    movement: 'Automatic Flyback Chronograph',
    calibre: 'Calibre AR-09 Flyback',
    powerReserve: '60 Hours',
    waterResistance: '100 m / 10 ATM',
    crystal: 'Beveled Box Sapphire Crystal',
    strap: 'Perforated Racing Calfskin with Titanium Buckle',
    warranty: '5-Year International Atelier Warranty',
    badge: 'Flyback',
    description: 'A pure driver’s timing instrument. Built around a silky column-wheel mechanism with horizontal clutch and instantaneous flyback reset, housed in ultralight satin Grade 5 titanium.',
    features: [
      'Integrated column-wheel chronograph with instant reset flyback mechanism',
      'Matte black high-tech ceramic bezel with laser-engraved tachymeter scale',
      'Satin-brushed Grade 5 titanium offering exceptional lightness and strength',
      'Super-LumiNova Grade X1 accents on chronograph hands and sub-dials'
    ],
    specs: [
      { label: 'Calibre Reference', value: 'In-House Calibre AR-09' },
      { label: 'Diameter', value: '41.5 mm' },
      { label: 'Case Thickness', value: '12.1 mm' },
      { label: 'Frequency', value: '28,800 vibrations / hour (4 Hz)' },
      { label: 'Jewels', value: '35 Synthetic Rubies' },
      { label: 'Power Reserve', value: '60 Hours' },
      { label: 'Water Resistance', value: '10 bar (~100 metres)' },
      { label: 'Clasp', value: 'Grade 5 Titanium Safety Buckle' }
    ],
    primaryImage: nocturneBlackImg,
    galleryImages: [nocturneBlackImg, macroMovementImg, meridianSteelImg]
  },
  {
    id: 'auren-atlas',
    name: 'Pak-Premium Atlas Steel',
    subtitle: 'Integrated Architecture Sports Watch',
    category: 'Integrated Sports',
    price: 3800,
    caseSize: '39 mm',
    caseMaterial: 'Satin-Finished 904L Austenitic Steel',
    movement: 'Automatic Ultra-Slim Calibre',
    calibre: 'Calibre AR-04 Slim',
    powerReserve: '70 Hours',
    waterResistance: '150 m / 15 ATM',
    crystal: 'Flat Sapphire with Anti-Reflective Coating',
    strap: 'Integrated Tapering H-Link 904L Steel Bracelet',
    warranty: '5-Year International Atelier Warranty',
    badge: '150M Depth',
    description: 'Architectural geometry meeting everyday versatility. Features an ultra-slim 9.4mm profile, integrated steel bracelet that tapers seamlessly to the wrist, and 150-meter water resistance.',
    features: [
      'Ultra-thin 9.4mm profile with integrated ergonomic case-to-bracelet flow',
      'Screw-down crown with double gasket system for 150m water security',
      'Dial with geometric tapisserie pattern in galvanic deep rhodium',
      'Concealed butterfly clasp with micro-adjustment system'
    ],
    specs: [
      { label: 'Calibre Reference', value: 'In-House Calibre AR-04' },
      { label: 'Diameter', value: '39.0 mm' },
      { label: 'Case Thickness', value: '9.4 mm' },
      { label: 'Frequency', value: '28,800 vibrations / hour (4 Hz)' },
      { label: 'Jewels', value: '28 Synthetic Rubies' },
      { label: 'Power Reserve', value: '70 Hours' },
      { label: 'Water Resistance', value: '15 bar (~150 metres)' },
      { label: 'Clasp', value: 'Integrated Butterfly Clasp' }
    ],
    primaryImage: meridianSteelImg,
    galleryImages: [meridianSteelImg, macroMovementImg, regentRoseGoldImg]
  }
];
