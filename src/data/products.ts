import { Product } from '../types';

import radoCentrixImg from '../assets/images/rado_centrix_watch_1792341460674.jpg';
import ladiesRimImg from '../assets/images/ladies_rim_watch_1792341462027.jpg';
import ladiesPairImg from '../assets/images/ladies_watches_pair_1792341461654.jpg';
import ladiesMovingDialImg from '../assets/images/ladies_moving_dial_1792341462737.jpg';
import superSundayPairImg from '../assets/images/super_sunday_pair_1792341462850.jpg';
import bestwinMagneticImg from '../assets/images/bestwin_magnetic_watch_1792341464438.jpg';
import tissotPrxImg from '../assets/images/tissot_prx_watch_1792341464522.jpg';
import huskySkeletonImg from '../assets/images/husky_skeleton_watch_1792341465468.jpg';
import packThreeWatchesImg from '../assets/images/pack_three_watches_1792342435683.jpg';
import bestwinArabicGoldImg from '../assets/images/bestwin_arabic_gold_1792342436601.jpg';
import spetsonMeshChronoImg from '../assets/images/spetson_mesh_chrono_1792431980651.jpg';
import waterproofSportsDigitalImg from '../assets/images/waterproof_sports_digital_1792431981106.jpg';
import cartierPresidentSkeletonImg from '../assets/images/cartier_president_skeleton_1792431982317.jpg';
import kezziGelflowDuoImg from '../assets/images/kezzi_gelflow_duo_1792431983930.jpg';
import curatedTrioBundleImg from '../assets/images/curated_trio_bundle_1792431984487.jpg';
import rolexGoldSkeletonImg from '../assets/images/rolex_gold_skeleton_1792431985436.jpg';
import heritageAviatorTrioImg from '../assets/images/heritage_aviator_trio_1792431988274.jpg';
import ladiesIcedOutRimImg from '../assets/images/iced_out_rim_1792431986680.jpg';

export {
  radoCentrixImg,
  ladiesRimImg,
  ladiesPairImg,
  ladiesMovingDialImg,
  superSundayPairImg,
  bestwinMagneticImg,
  tissotPrxImg,
  huskySkeletonImg,
  packThreeWatchesImg,
  bestwinArabicGoldImg,
  spetsonMeshChronoImg,
  waterproofSportsDigitalImg,
  cartierPresidentSkeletonImg,
  kezziGelflowDuoImg,
  curatedTrioBundleImg,
  rolexGoldSkeletonImg,
  heritageAviatorTrioImg,
  ladiesIcedOutRimImg,
};

export const PRODUCTS: Product[] = [
  {
    id: 'three-in-one-deal',
    name: 'Three-in-One Luxury Deal (Trio Collection)',
    subtitle: '',
    category: 'Deal',
    price: 999,
    caseSize: '34 mm · 40 mm · 42 mm',
    caseMaterial: 'PVD Stealth Black, Diamond Pavé Gold & Polished Rose Gold',
    movement: 'Triple Precision Quartz Movements',
    calibre: 'Tri-Calibre Japanese Quartz',
    powerReserve: '2-Year Battery Each',
    waterResistance: 'Daily Splash Resistance',
    crystal: 'Hardened Scratch-Proof Mineral Glass',
    strap: 'Black Leather, Champagne Nude Leather & Black Crocodile Leather',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Exclusive Trio Offer · Limited Deals Available',
    badge: 'Front Deal',
    description: 'The definitive all-in-one luxury horology trio. This master bundle includes three complete, distinct timepieces: 1) A stealth midnight black multi-dial chronograph on smooth black leather, 2) An elegant gold dress watch featuring a brilliant diamond-cut pavé bezel with clean white dial on champagne nude leather, and 3) A refined rose gold heritage watch featuring classical Roman numeral indices and an auxiliary sub-dial on black leather.',
    features: [
      'Three complete timepieces included in one value package',
      'Watch 1: Stealth midnight black multi-dial chronograph on black leather',
      'Watch 2: Shimmering diamond pavé halo dress watch with champagne leather strap',
      'Watch 3: Rose gold Roman numeral heritage classic with sub-seconds dial',
      'Exclusive limited quantity deal - priority reservation'
    ],
    specs: [
      { label: 'Bundle Contents', value: '3 Distinct Timepieces' },
      { label: 'Watch 1', value: 'Stealth Black Chrono Multi-Dial' },
      { label: 'Watch 2', value: 'Diamond Pavé Bezel & Nude Strap' },
      { label: 'Watch 3', value: 'Rose Gold Roman Dial & Sub-Seconds' },
      { label: 'Package Offer', value: 'All 3 Timepieces In Just Rs 999' }
    ],
    primaryImage: packThreeWatchesImg,
    galleryImages: [packThreeWatchesImg]
  },
  {
    id: 'rado-centrix',
    name: 'Rado Centrix Model',
    subtitle: '',
    category: 'Men',
    price: 2499,
    caseSize: '38 mm',
    caseMaterial: 'Silver Stainless Steel & Black High-Tech Ceramic',
    movement: 'High-Precision Quartz',
    calibre: 'Centrix Precision Movement',
    powerReserve: '3-Year Battery',
    waterResistance: '30 m / 3 ATM',
    crystal: 'Scratch-Proof Sapphire Glass',
    strap: 'High-Tech Ceramic & Stainless Steel Link Bracelet',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Premium Quality Edition',
    badge: 'Popular',
    description: 'Premium quality Rado Centrix style timepiece featuring an outclass silver and high-tech black ceramic combo, minimalist black dial with diamond hour markers, push-button safety lock, and date display.',
    features: [
      'Push button lock fold-over clasp',
      'Outclass silver and black ceramic combination',
      'Date display aperture at 3 o’clock',
      'Diamond hour markers on midnight black dial'
    ],
    specs: [
      { label: 'Model Edition', value: 'Rado Centrix Model' },
      { label: 'Lock Type', value: 'Push Button Safety Lock' },
      { label: 'Dial Layout', value: 'Date Display & Diamond Accents' },
      { label: 'Finish', value: 'Outclass Silver Black Combo' }
    ],
    primaryImage: radoCentrixImg,
    galleryImages: [radoCentrixImg]
  },
  {
    id: 'ladies-rim-watch',
    name: 'Ladies Rim Watch',
    subtitle: '',
    category: 'Women',
    price: 599,
    caseSize: '34 mm',
    caseMaterial: 'Rose Gold-Tone Alloy with Faceted Diamond-Cut Rim',
    movement: 'Japanese Machine Quartz',
    calibre: 'Japanese Precision Quartz',
    powerReserve: '2-Year Battery',
    waterResistance: 'Splash Resistant',
    crystal: 'Faceted Diamond-Cut Rim Glass',
    strap: 'Rich Purple Textured Crocodile-Embossed Leather',
    warranty: '6-Month Service Warranty',
    limitedEdition: 'Loot Piece Deal · Just 1 Piece',
    badge: 'Loot Deal',
    description: 'Eye-catching purple ladies timepiece featuring an enchanting rotating moving dial, Japanese machine quartz movement, faceted diamond-cut glass rim, and rich purple crocodile pattern leather strap.',
    features: [
      'Hypnotic rotating moving dial mechanism',
      'Durable Japanese machine movement',
      'Diamond-cut faceted crystal rim',
      'Loot piece special pricing - just 1 piece available'
    ],
    specs: [
      { label: 'Dial Feature', value: 'Rotating / Moving Dial' },
      { label: 'Mechanism', value: 'Japanese Machine Engine' },
      { label: 'Rim Glass', value: 'Faceted Diamond-Cut Rim' },
      { label: 'Quantity', value: 'Just 1 Piece' }
    ],
    primaryImage: ladiesRimImg,
    galleryImages: [ladiesRimImg]
  },
  {
    id: 'pack-of-2-ladies',
    name: 'Pack of 2 Ladies Collection',
    subtitle: '',
    category: 'Deal',
    price: 999,
    caseSize: '32 mm & 34 mm',
    caseMaterial: 'Gold Crystal Pavé & Royal Purple Alloy',
    movement: 'Quartz Dual Engines',
    calibre: 'Dual Quartz Movements',
    powerReserve: '2-Year Battery',
    waterResistance: 'Daily Splash Resistance',
    crystal: 'Faceted Glass & Mineral Crystal',
    strap: 'Gold Crystal Leaf Bracelet + Purple Magnetic Mesh Strap',
    warranty: '6-Month Warranty',
    limitedEdition: 'Only One Deal Available',
    badge: 'Pack of 2',
    description: 'Special 2-in-1 women’s watch bundle containing one radiant gold crystal-studded floral bracelet watch and one deep royal purple starry sky watch with purple magnetic mesh band.',
    features: [
      'Two complete timepieces included in one bundle',
      'Watch 1: Gold leaf crystal pavé bracelet with floral patterned dial',
      'Watch 2: Starry night galaxy dial with purple magnetic mesh strap',
      'Come First Get First exclusive promotion'
    ],
    specs: [
      { label: 'Package Contents', value: '2 Ladies Timepieces' },
      { label: 'Strap 1', value: 'Gold Crystal Pavé Leaf Bracelet' },
      { label: 'Strap 2', value: 'Purple Magnetic Milanese Mesh' },
      { label: 'Availability', value: 'Only One Deal Available' }
    ],
    primaryImage: ladiesPairImg,
    galleryImages: [ladiesPairImg]
  },
  {
    id: 'ladies-model-moving-dial',
    name: 'Ladies Model (Moving Dial)',
    subtitle: '',
    category: 'Women',
    price: 699,
    caseSize: '35 mm',
    caseMaterial: 'Rose Gold-Tone with Pavé Crystal Halo',
    movement: 'Precision Quartz',
    calibre: 'Rotating Moving Dial Quartz',
    powerReserve: '2-Year Battery',
    waterResistance: 'Splash Resistant',
    crystal: 'Hardened Scratch-Resistant Mineral',
    strap: 'Rich Brown Textured Crocodile Leather Strap',
    warranty: '6-Month Warranty',
    limitedEdition: 'Only 1 Piece Available',
    badge: 'Moving Dial',
    description: 'Luxurious women’s dress watch showcasing a spinning ornamental fan motif dial encrusted with micro crystals, rose gold pavé bezel, and dark brown crocodile pattern leather strap.',
    features: [
      'Rotating moving dial with shimmering crystal fan motif',
      'Rose gold bezel set with fine sparkling pavé crystals',
      'Classic brown alligator embossed leather band',
      'Come First Get First limited piece'
    ],
    specs: [
      { label: 'Dial Feature', value: 'Moving / Spinning Fan Dial' },
      { label: 'Bezel Accent', value: 'Pavé Crystal Halo' },
      { label: 'Strap Style', value: 'Brown Crocodile Pattern' },
      { label: 'Quantity', value: 'Only 1 Piece' }
    ],
    primaryImage: ladiesMovingDialImg,
    galleryImages: [ladiesMovingDialImg]
  },
  {
    id: 'super-sunday-offer',
    name: 'Super Sunday Offer (Pack of 2)',
    subtitle: '',
    category: 'Deal',
    price: 1499,
    caseSize: '40 mm (Chain) & 44 mm (Sports)',
    caseMaterial: 'Two-Tone Stainless Steel & Matte Black Polycarbonate',
    movement: 'Dual Quartz Precision Movements',
    calibre: 'Tevise & Sports Quartz Calibres',
    powerReserve: '2-Year Battery',
    waterResistance: '30 m / 3 ATM',
    crystal: 'Hardened Scratch-Proof Mineral Glass',
    strap: 'Two-Tone Steel Chain + Black Silicone Sports Strap',
    warranty: '6-Month Warranty',
    limitedEdition: 'Super Sunday Limited Deal · Just 1 Deal',
    badge: 'Super Sunday (Pack of 2)',
    description: 'The ultimate two-watch Sunday bundle: one refined Tevise two-tone gold and silver steel chain dress watch with a white textured dial, paired with a bold matte black tonneau racing sports watch.',
    features: [
      'Both watches included in the package for Rs 1499',
      'Watch 1: Tevise two-tone chain dress model with white dial',
      'Watch 2: Matte black racing tonneau sports model with silicone strap',
      'Just 1 deal available on offer'
    ],
    specs: [
      { label: 'Deal Contents', value: '2 Complete Watches' },
      { label: 'Watch 1', value: 'Two-Tone Chain Dress Model' },
      { label: 'Watch 2', value: 'Sports Tonneau Model' },
      { label: 'Offer', value: 'Both In Just Rs 1499' }
    ],
    primaryImage: superSundayPairImg,
    galleryImages: [superSundayPairImg]
  },
  {
    id: 'bestwin-magnetic',
    name: 'Bestwin Magnetic Models',
    subtitle: '',
    category: 'Men',
    price: 1299,
    caseSize: '42 mm',
    caseMaterial: 'Gold-Tone Octagonal Bezel & Stainless Case',
    movement: 'Multi-Eye Quartz Movement',
    calibre: 'Bestwin Multi-Function Quartz',
    powerReserve: '2-Year Battery',
    waterResistance: '30 m / 3 ATM',
    crystal: 'Anti-Glare Hardened Mineral',
    strap: 'Dual-Material Saddle Brown Leather with Stitching',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Restock Batch · Limited Pieces on Demand',
    badge: 'Restock',
    description: 'Restock edition of the popular Bestwin model featuring an iconic octagonal gold-accented bezel, dual-material brown leather strap, multi-subdial layout, and date display.',
    features: [
      'Octagonal bezel geometry with industrial luxury aesthetic',
      'Comfortable dual-material stitched leather strap',
      'Date display aperture at 3 o’clock',
      'Outclass multi-dial watchface with Arabic numeral indices'
    ],
    specs: [
      { label: 'Case Shape', value: 'Octagonal Luxury Geometry' },
      { label: 'Strap', value: 'Dual Material Stitched Leather' },
      { label: 'Date Display', value: 'Yes (Date Window)' },
      { label: 'Availability', value: 'Limited Pieces on Demand' }
    ],
    primaryImage: bestwinMagneticImg,
    galleryImages: [bestwinMagneticImg]
  },
  {
    id: 'tissot-prx-strap',
    name: 'Tissot PRX Strap Edition',
    subtitle: '',
    category: 'Men',
    price: 1999,
    caseSize: '40 mm',
    caseMaterial: 'Brushed Stainless Steel with Gold Fluted Bezel',
    movement: 'Precision Quartz Movement',
    calibre: 'PRX Precision Calibre',
    powerReserve: '3-Year Battery',
    waterResistance: '50 m / 5 ATM',
    crystal: 'Sapphire Coated Scratch-Resistant Glass',
    strap: 'Navy Blue Alligator Embossed Leather Strap',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Just 1 Piece Available',
    badge: 'Swiss Style',
    description: 'Classic horology meeting modern flair. The Tissot PRX Strap Edition pairs an integrated brushed stainless steel tonneau case and polished gold fluted bezel with an oceanic blue waffle tapisserie dial, date window, and navy alligator strap.',
    features: [
      'Royal blue tapisserie waffle patterned dial',
      'Polished gold-tone fluted bezel with date window at 3 o’clock',
      'Master lock security clasp',
      'Navy blue alligator embossed leather strap'
    ],
    specs: [
      { label: 'Dial Style', value: 'Blue Beauty Tapisserie Waffle' },
      { label: 'Bezel', value: 'Polished Gold Fluted Bezel' },
      { label: 'Lock Type', value: 'Master Lock Security Clasp' },
      { label: 'Edition', value: 'Just 1 Piece' }
    ],
    primaryImage: tissotPrxImg,
    galleryImages: [tissotPrxImg]
  },
  {
    id: 'husky-chain-edition',
    name: 'Husky Brand Chain Edition',
    subtitle: '',
    category: 'Men',
    price: 2499,
    caseSize: '42 mm',
    caseMaterial: 'Heavy Solid Stainless Steel Build',
    movement: 'Automatic Mechanical Skeleton Engine',
    calibre: 'Skeleton Automatic Movement',
    powerReserve: '42-Hour Reserve & Self-Winding',
    waterResistance: '50 m / 5 ATM',
    crystal: 'Double Curved Scratch-Resistant Glass',
    strap: 'Solid Stainless Steel Link Bracelet with Master Lock',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Just 1 Piece Exclusive',
    badge: 'Skeleton Engine',
    description: 'The Husky Brand Chain Edition features an open-worked transparent skeleton dial showing mechanical gear trains, sweeping red second hand, exhibition back pendulum rotor, and heavy stainless steel master lock bracelet.',
    features: [
      'Open-worked mechanical skeleton dial with exposed gears',
      'Exhibition see-through back pendulum rotor caseback',
      'Integrated date display calendar complication',
      'Solid stainless steel link chain with master lock fold clasp'
    ],
    specs: [
      { label: 'Dial', value: 'Skeleton Open-Worked Dial' },
      { label: 'Movement Feature', value: 'Back Pendulum Rotor' },
      { label: 'Clasp', value: 'Master Lock Deployant Clasp' },
      { label: 'Edition', value: 'Just 1 Piece' }
    ],
    primaryImage: huskySkeletonImg,
    galleryImages: [huskySkeletonImg]
  },
  {
    id: 'bestwin-arabic-gold',
    name: 'Bestwin Arabic Dial Gold Edition',
    subtitle: '',
    category: 'Men',
    price: 1399,
    caseSize: '41 mm',
    caseMaterial: 'Brushed & Polished Gold-Tone Octagonal Alloy',
    movement: 'Japanese Precision Quartz',
    calibre: 'Bestwin Arabic Calibre Engine',
    powerReserve: '3-Year Battery',
    waterResistance: '30 m / 3 ATM',
    crystal: 'Hardened Scratch-Resistant Mineral Glass',
    strap: 'Saddle Brown Textured Genuine Leather with Contrast Stitching',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Middle Eastern Heritage Edition · Limited Stock',
    badge: 'Arabic Dial',
    description: 'Exquisite architectural royal timekeeper inspired by Middle Eastern haute horlogerie. Features a sculpted octagonal brushed gold bezel with beveled edges, a pristine pearl-white dial with gilded Eastern Arabic numerals (١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ١٠ ١١ ١٢), quick-set calendar date window, and a hand-crafted saddle brown genuine textured leather strap with cream contrast stitching.',
    features: [
      'Gilded Eastern Arabic numerals on pristine pearl-white dial',
      'Sculpted octagonal gold-tone bezel with brushed and mirror-polished facets',
      'Date calendar display window at 12 o’clock',
      'Premium saddle brown textured leather strap with hand-stitched detailing'
    ],
    specs: [
      { label: 'Dial Feature', value: 'Eastern Arabic Numerals (١-١٢)' },
      { label: 'Bezel Shape', value: 'Octagonal Architectural Gold Bezel' },
      { label: 'Calendar', value: 'Date Window at 12 O’Clock' },
      { label: 'Strap Finish', value: 'Saddle Brown Leather with Stitching' }
    ],
    primaryImage: bestwinArabicGoldImg,
    galleryImages: [bestwinArabicGoldImg]
  },
  {
    id: 'spetson-mesh-chrono',
    name: 'Spetson Outclass Chain Chronograph Model',
    subtitle: '',
    category: 'Men',
    price: 999,
    caseSize: '41 mm',
    caseMaterial: 'PVD Stealth Black Stainless Steel',
    movement: 'Precision Chronograph Quartz',
    calibre: 'Spetson Multi-Chrono Calibre',
    powerReserve: '3-Year Battery',
    waterResistance: '30 m / 3 ATM',
    crystal: 'Hardened Scratch-Resistant Mineral Glass',
    strap: 'Black Stainless Steel Milanese Mesh Chain with Safety Hook Buckle',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Outclass Chain Edition · 1 Piece Only',
    badge: 'Hot Pick',
    description: 'Premium quality stealth black chronograph model featuring a pitch-black dial with three functional sub-dials, tachymeter bezel scale, dual pushers, date aperture, and an outclass black stainless steel Milanese mesh chain bracelet.',
    features: [
      'Outclass black Milanese mesh chain bracelet',
      'Three functional chronograph subdials with tachymeter scale',
      'Dual chronograph actuation pushers with knurled crown',
      'Date display window with white baton indices'
    ],
    specs: [
      { label: 'Case & Chain', value: 'PVD Stealth Black Steel' },
      { label: 'Movement', value: 'Multi-Subdial Chronograph' },
      { label: 'Strap Type', value: 'Milanese Mesh Chain' },
      { label: 'Special Rate', value: 'Rs 999' }
    ],
    primaryImage: spetsonMeshChronoImg,
    galleryImages: [spetsonMeshChronoImg]
  },
  {
    id: 'waterproof-sports-digital',
    name: '100% Water Proof Tactical Sports Digital Model',
    subtitle: '',
    category: 'Men',
    price: 999,
    caseSize: '45 mm',
    caseMaterial: 'High-Impact Shock-Resistant Polycarbonate & Steel Back',
    movement: 'Digital LCD Multi-Function Engine',
    calibre: 'Tactical Hydro-Digital Engine',
    powerReserve: 'Lithium CR2025 Long-Life Battery',
    waterResistance: '100% Waterproof / 50 m',
    crystal: 'Shatter-Resistant Acrylic Lens',
    strap: 'Ergonomic Heavy-Duty Ribbed Silicone with Dual-Pin Buckle',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Tactical Hydro Series · 1 Piece Only',
    badge: 'Waterproof',
    description: '100% water proof rugged tactical sports timepiece designed for extreme durability. High-visibility backlit digital display with multi-function split stopwatch, countdown timer, dual alarm, calendar display, and reinforced water-sealed casing.',
    features: [
      '100% waterproof hermetic seal with heavy splash and submersion resistance',
      'High-contrast digital LCD with calendar, day and 24-hr readout',
      'Precision split-second chronograph and alarm functions',
      'Rugged textured shock-absorbing silicone strap'
    ],
    specs: [
      { label: 'Waterproof Rating', value: '100% Water Proof' },
      { label: 'Display', value: 'Digital Multi-Function LCD' },
      { label: 'Build', value: 'Shock-Resistant Polymer' },
      { label: 'Special Rate', value: 'Sirf Rs 999' }
    ],
    primaryImage: waterproofSportsDigitalImg,
    galleryImages: [waterproofSportsDigitalImg]
  },
  {
    id: 'cartier-president-skeleton',
    name: 'Cartier President Model Skeleton Edition',
    subtitle: '',
    category: 'Men',
    price: 2499,
    caseSize: '42 mm',
    caseMaterial: 'Solid 316L Stainless Steel Tonneau Cushion Case',
    movement: 'Automatic Self-Winding Mechanical Skeleton',
    calibre: 'President Open-Worked Horological Calibre',
    powerReserve: '42 Hours',
    waterResistance: '50 m / 5 ATM',
    crystal: 'Double-Sided Curved Sapphire Crystal Glass',
    strap: 'Solid Multi-Link Brushed & Polished Stainless Steel with Master Lock',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'President Series · 1 Piece Only',
    badge: 'Trending',
    description: 'Most trending Cartier President inspired open-worked masterpiece. Double-sided sapphire crystal revealing intricate golden mechanics, red central hands, diamond-cut crystal hour accents, synthetic blue spinel cabochon crown, and solid steel link bracelet with master deployant lock.',
    features: [
      'Double-sided transparent glass exhibition case and dial',
      'Fully open-worked skeleton dial with visible golden escapement',
      'Master lock deployant clasp on solid steel bracelet',
      'Signature cushion tonneau case with blue cabochon crown'
    ],
    specs: [
      { label: 'Case Style', value: 'Cushion Tonneau President Shape' },
      { label: 'Dial Anatomy', value: 'Double-Sided Skeleton Dial' },
      { label: 'Lock Type', value: 'Deployant Master Lock' },
      { label: 'Special Rate', value: 'Sirf Rs 2,499' }
    ],
    primaryImage: cartierPresidentSkeletonImg,
    galleryImages: [cartierPresidentSkeletonImg]
  },
  {
    id: 'kezzi-gelflow-duo',
    name: 'Kezzi Brand Gel Flow Star Dust Duo (Pack of 2)',
    subtitle: '',
    category: 'Deal',
    price: 999,
    caseSize: '32 mm & 32 mm',
    caseMaterial: 'Polished Rose Gold-Tone Alloy',
    movement: 'Dual Japanese Precision Quartz Movements',
    calibre: 'Kezzi Twin Calibre',
    powerReserve: '2-Year Battery Each',
    waterResistance: 'Splash Resistant',
    crystal: 'Domed Mineral Glass',
    strap: 'Mustard Tan & Chocolate Brown Leather Straps',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Twin Set Edition · 1 Set Only',
    badge: 'Pack of 2',
    description: 'Enchanting two-piece ladies collection by Kezzi Brand. Features soft ombre sunset-pink and sky-blue dials containing suspended floating holographic star dust that gently dances with wrist movement. One paired with mustard tan leather, the other with chocolate brown leather.',
    features: [
      'Pack of 2 complete ladies watches included in one deal',
      'Floating holographic star dust floating inside ombre dials',
      'Two distinct leather strap colorways: Mustard Tan & Chocolate Brown',
      'Polished rose gold-tone slim profile cases'
    ],
    specs: [
      { label: 'Bundle Contents', value: '2 Ladies Timepieces' },
      { label: 'Dial Feature', value: 'Floating Gel Star Dust Effect' },
      { label: 'Colors', value: 'Mustard & Chocolate Brown Straps' },
      { label: 'Bundle Price', value: 'Deal Sirf Rs 999' }
    ],
    primaryImage: kezziGelflowDuoImg,
    galleryImages: [kezziGelflowDuoImg]
  },
  {
    id: 'curated-trio-bundle',
    name: 'Curated Urban Trio Collection (Pack of 3)',
    subtitle: '',
    category: 'Deal',
    price: 999,
    caseSize: '40 mm · 38 mm · 40 mm',
    caseMaterial: 'Brushed Stainless Steel & Polished Alloy',
    movement: 'Triple Precision Quartz Movements',
    calibre: 'Tri-Quartz Multi-Edition Engine',
    powerReserve: '2-Year Battery Each',
    waterResistance: 'Daily Splash Proof',
    crystal: 'Hardened Mineral Glass',
    strap: 'Black Croc Leather, Forest Green Leather & Royal Blue Silicone',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Trio Deal · 1 Deal Only',
    badge: 'Pack of 3',
    description: 'Outstanding three-watch package deal featuring three distinct styles: 1) A stealth black multi-dial chronograph on textured black leather, 2) A minimalist white dial watch with forest green leather strap and Eastern calligraphy indices, and 3) A deep royal blue dial sport watch on navy blue silicone strap.',
    features: [
      'Complete bundle of three distinct watches for everyday and formal wear',
      'Watch 1: Stealth black chronograph on textured leather',
      'Watch 2: White dial minimalist on forest green leather strap',
      'Watch 3: Royal blue dial sport watch on navy silicone strap'
    ],
    specs: [
      { label: 'Bundle Quantity', value: 'Pack of 3 Full Watches' },
      { label: 'Straps Included', value: 'Black Leather, Green Leather, Blue Silicone' },
      { label: 'Selection', value: 'Come First Get First Allocation' },
      { label: 'Bundle Rate', value: 'Sirf Rs 999' }
    ],
    primaryImage: curatedTrioBundleImg,
    galleryImages: [curatedTrioBundleImg]
  },
  {
    id: 'rolex-gold-skeleton',
    name: 'Rolex Auto Edition Gold Skeleton',
    subtitle: '',
    category: 'Men',
    price: 2499,
    caseSize: '41 mm',
    caseMaterial: '18k Yellow Gold-Plated Heavy Solid Stainless Steel',
    movement: 'Automatic Self-Winding Movement',
    calibre: 'Golden Automatic Rotor Engine',
    powerReserve: '40 Hours',
    waterResistance: '50 m / 5 ATM',
    crystal: 'Hardened Sapphire Glass Front & Exhibition Back Glass',
    strap: 'Solid Gold Stainless Steel Link Bracelet with Concealed Butterfly Lock',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Luxury Statement Edition · 1 Piece Only',
    badge: 'Automatic',
    description: 'A statement of class and horological opulence. Features an 18k yellow gold heavy solid build, open-worked mechanical skeleton dial revealing the heartbeat of the automatic self-winding movement, transparent exhibition back glass, fluted bezel, and concealed butterfly lock.',
    features: [
      'Fully automatic self-winding mechanical movement with visible rotor',
      'Exhibition skeleton dial and transparent caseback glass',
      'Heavy solid build with 18k gold-plated Jubilee style bracelet',
      'Concealed butterfly lock with safety deployment'
    ],
    specs: [
      { label: 'Movement', value: 'Fully Automatic Self-Winding' },
      { label: 'Dial & Caseback', value: 'Front Skeleton + Exhibition Back Glass' },
      { label: 'Clasp', value: 'Butterfly Deployment Lock' },
      { label: 'Set Price', value: 'Rs 2,499' }
    ],
    primaryImage: rolexGoldSkeletonImg,
    galleryImages: [rolexGoldSkeletonImg]
  },
  {
    id: 'heritage-aviator-trio',
    name: 'Moroccan Mandala & Aviator Trio (Pack of 3)',
    subtitle: '',
    category: 'Deal',
    price: 999,
    caseSize: '41 mm · 38 mm · 42 mm',
    caseMaterial: 'PVD Black, Polished Gold & Matte Black Alloy',
    movement: 'Triple Independent Japanese Quartz Movements',
    calibre: 'Trio Heritage Quartz Engine',
    powerReserve: '2-Year Battery Each',
    waterResistance: 'Daily Splash Proof',
    crystal: 'Hardened Mineral Crystal',
    strap: 'Stitched Black Leather, Nude Cream Leather & Black Leather',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Exclusive Trio · Only One Deal Available',
    badge: 'Pack of 3',
    description: 'One-of-a-kind three-timepiece bundle: 1) A deep navy blue multi-subdial watch with rose gold indices on black stitched leather, 2) An artistic royal gold watch with an intricate blue and gold geometric mosaic mandala dial on nude cream leather, 3) A Diniho sport aviator watch with black countdown bezel on black leather.',
    features: [
      'Three curated collectible timepieces in a single package',
      'Watch 1: Navy blue multi-dial chronometer style on black leather',
      'Watch 2: Gold case with Moroccan geometric mosaic mandala dial on cream leather',
      'Watch 3: Diniho sport watch with calibrated bezel and white dial'
    ],
    specs: [
      { label: 'Bundle Allocation', value: 'Only One Deal Available' },
      { label: 'Count', value: 'Pack of 3 Complete Watches' },
      { label: 'Delivery', value: 'Free Delivery with $300 Upfront Shipping' },
      { label: 'Price', value: 'Sirf Rs 999' }
    ],
    primaryImage: heritageAviatorTrioImg,
    galleryImages: [heritageAviatorTrioImg]
  },
  {
    id: 'ladies-iced-out-rim',
    name: 'Ladies Iced Out Rim Rotating Watch',
    subtitle: '',
    category: 'Women',
    price: 1699,
    caseSize: '36 mm',
    caseMaterial: 'Midnight Black PVD Alloy Encrusted with Shimmering Crystals',
    movement: 'Japanese Precision Quartz with Kinetic Rotating Mechanism',
    calibre: 'Iced-Out Kinetic Rim Movement',
    powerReserve: '3-Year Battery',
    waterResistance: '30 m / 3 ATM',
    crystal: 'Faceted Diamond-Cut Scratch-Resistant Glass',
    strap: 'Heavy Pavé Crystal-Encrusted Chain Bracelet with Butterfly Lock',
    warranty: '1-Year Atelier Warranty',
    limitedEdition: 'Iced Out Series · 1 Piece Only',
    badge: 'Iced Out',
    description: 'Dazzling high-glamour ladies iced out timepiece in all-black sparkling crystal pavé. Features a kinetic spinning rotating turbine rim bezel, butterfly lock, heavy crystal-encrusted chain bracelet, and faceted diamond-cut crystal glass.',
    features: [
      'Full pavé sparkling crystal diamond encrusting across bezel and bracelet',
      'Kinetic rotating turbine inner dial mechanism that spins freely',
      'Concealed double butterfly safety clasp',
      'Heavy luxury link chain bracelet build'
    ],
    specs: [
      { label: 'Bezel Feature', value: 'Kinetic Rotating Turbine Bazzel' },
      { label: 'Finish', value: 'Full Iced Out Pavé Crystal Black' },
      { label: 'Lock Type', value: 'Butterfly Lock' },
      { label: 'Special Rate', value: 'Sirf Rs 1,699' }
    ],
    primaryImage: ladiesIcedOutRimImg,
    galleryImages: [ladiesIcedOutRimImg]
  }
];
