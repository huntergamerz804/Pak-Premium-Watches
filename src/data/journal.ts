import { JournalArticle, Testimonial } from '../types';
import macroMovementImg from '../assets/images/macro_movement_gears_1790709851996.jpg';
import heroWatchImg from '../assets/images/hero_watch_mechanical_1790709805640.jpg';
import regentRoseGoldImg from '../assets/images/watch_regent_rose_gold_1790709840514.jpg';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'inside-mechanical-movement',
    title: 'Inside the Architecture of a Flying Tourbillon',
    category: 'Horological Anatomy',
    readTime: '6 min read',
    date: 'Autumn 2026',
    excerpt: 'How our master watchmakers counter gravitational inertia through a 0.28-gram titanium cage rotating once every sixty seconds.',
    image: macroMovementImg,
    content: [
      'In high mechanical watchmaking, gravity is both the adversary and the muse. When a timepiece rests vertically in a pocket or on a dresser, gravitational pull drags upon the balance spring, causing subtle variations in isochronism.',
      'Pak-Premium’s Calibre AR-12 Flying Tourbillon counters this effect by suspending the entire regulating organ—balance wheel, hairspring, and pallet fork—inside a lightweight cage of Grade 5 titanium that completes a full 360-degree rotation every sixty seconds.',
      'Without an upper supporting bridge, the carriage appears to float unsupported in space, demanding clearance tolerances measured in thousandths of a millimeter. Every bevelled spoke is polished under a 40x microscope by hand.'
    ]
  },
  {
    id: 'proportions-matter-watch-design',
    title: 'Proportions, Tension, and Case Architecture',
    category: 'Design Philosophy',
    readTime: '4 min read',
    date: 'Late Summer 2026',
    excerpt: 'Why the relationship between lug curvature, bezel beveling, and dial depth determines whether a timepiece sits as a second skin.',
    image: heroWatchImg,
    content: [
      'A millimeter on paper is an eternity on the wrist. True luxury horology is not defined by size, but by the mathematical harmony between case thickness, lug-to-lug span, and dial aperture.',
      'When designing the Pak-Premium Nocturne, our team modeled eighty-two iterations of the lug taper before arriving at the subtle downward camber that ensures balance across wrists from 16 to 20 centimeters in circumference.',
      'The result is a presence that feels substantial yet weightless—a quiet physical dialogue between forged metallurgy and human anatomy.'
    ]
  },
  {
    id: 'craft-behind-hand-finished-dial',
    title: 'The Solitary Art of Hand-Beveling (Anglage)',
    category: 'Atelier Metiers',
    readTime: '5 min read',
    date: 'Summer 2026',
    excerpt: 'Exploring the microscopic art of Anglage Main: transforming raw machine-cut bridges into glistening prisms of light using gentian wood.',
    image: regentRoseGoldImg,
    content: [
      'Long after CNC mills have cut the raw brass and German silver bridges of a Pak-Premium movement, the true soul of the watch is bestowed by the finisher’s hand.',
      'Using diamond files followed by progressively finer pegs of dried gentian wood coated with diamond paste, the watchmaker shapes a precise 45-degree chamfer along every edge. The surface must be completely flat, devoid of ripples, and polished to a flawless specular mirror finish.',
      'Over thirty hours of solitary bench work are invested into a single movement before it is deemed worthy of the Pak-Premium hallmark.'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'The architectural depth of the Nocturne skeleton dial is staggering in natural light. It has that rare quality of feeling like an heirloom made today for the next century.',
    author: 'Julian V.',
    city: 'Zurich, Switzerland',
    watchModel: 'Pak-Premium Nocturne (No. 042/250)',
    year: 'Acquired 2026'
  },
  {
    id: 't-2',
    quote: 'I have collected independent horology for thirty years. The finishing on the hand-bevelled bridges and the tactile crispness of the crown action rival watches three times the price.',
    author: 'Marcus E.',
    city: 'London, Mayfair',
    watchModel: 'Pak-Premium Sovereign Flying Tourbillon',
    year: 'Acquired 2026'
  },
  {
    id: 't-3',
    quote: 'The Meridian Chronometre is the purest everyday luxury watch I own. Its flame-blued hands against the silver guilloché dial catch the light with quiet, undeniable distinction.',
    author: 'Elena K.',
    city: 'Vienna, Austria',
    watchModel: 'Pak-Premium Meridian Chronometre',
    year: 'Acquired 2026'
  }
];
