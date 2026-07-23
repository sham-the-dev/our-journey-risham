import { useState, useEffect, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { 
  Heart, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  RotateCcw, 
  Music,
  Smile,
  Globe
} from 'lucide-react'
import { playPageTurnSound, playClickSound } from './audioHelpers'

// Import romantic piano BGM (Erik Satie's Gymnopedie No 1 downloaded locally)
import bgmAudio from './assets/bgm.mp3'

// Import all WebP sketch images
import img1 from './assets/webp-images/image-1-rs-puram.webp'
import img2 from './assets/webp-images/image-2-first-bike-ride.webp'
import img3 from './assets/webp-images/image-3-night-ride-mirror-selfies.webp'
import img4 from './assets/webp-images/image-4-first-time-race-course-meet.webp'
import img5 from './assets/webp-images/image-5-first-time-chat-shop-date.webp'
import img6 from './assets/webp-images/image-6-first-park-date.webp'
import img7 from './assets/webp-images/image-7-2nd-time-park-and-serious-talk-first-time-hand-hold.webp'
import img8 from './assets/webp-images/image-8-morning-ride-periods-pain.webp'
import img9 from './assets/webp-images/image-9-night-time-bike-ride.webp'
import img10 from './assets/webp-images/image-10-gandhipuram-date.webp'
import img11 from './assets/webp-images/image-11-first-time-both-muttai-bhel.webp'
import img12 from './assets/webp-images/image-12-i-love-kovai-date.webp'

// Washi tape patterns list for beautiful random designs (loving lavender/teal/peach tones)
const washiTapes = [
  "tape-lavender-glitter",
  "tape-peach-stripes",
  "tape-mint-grid",
  "tape-violet-leaf",
  "tape-teal-dots"
];

// Slides data with full English and Tamil localization
const slides = [
  {
    id: 1,
    image: img1,
    location: { en: "RS Puram", ta: "ஆர்.எஸ்.புரம்" },
    title: { en: "Where it all began... RS Puram", ta: "தொடங்கிய இடம்... ஆர்.எஸ்.புரம்" },
    date: { en: "The First Meet", ta: "முதல் சந்திப்பு" },
    description: {
      en: "Our story started in the bustling streets of RS Puram. Walking around, sharing shy smiles, and finding our rhythm in the heart of Coimbatore. It was just the beginning of something beautiful.",
      ta: "நம் காதல் கதை ஆர்.எஸ்.புரத்தின் பரபரப்பான தெருக்களில் தொடங்கியது. கூச்ச சுபாவமுள்ள புன்னகைகள், கோவை இதயப்பகுதியில் நாம் ஒன்றிணைந்த தருணம். ஒரு அழகான பயணத்தின் ஆரம்பம்."
    },
    doodle: "heart",
    x: 50, y: 30
  },
  {
    id: 2,
    image: img2,
    location: { en: "Sungam Bus Stop", ta: "சுங்கம் பேருந்து நிறுத்தம்" },
    title: { en: "Our First Ride Together", ta: "நமது முதல் பைக் பயணம்" },
    date: { en: "Office Ride & Sungam", ta: "அலுவலகப் பயணம் & சுங்கம்" },
    description: {
      en: "The first time I asked you to join me on my bike to head to the office together. That sweet, nervous excitement of riding side-by-side, followed by me dropping you off at the Sungam bus stop later that day. A simple journey that marked the beginning of our daily shared moments.",
      ta: "அலுவலகத்திற்கு ஒன்றாகச் செல்ல எனது வண்டியில் உன்னை வரும்படி நான் முதன்முதலாகக் கேட்ட தருணம். அந்தப் பதற்றமும் மகிழ்ச்சியும் நிறைந்த பயணம், அன்றைய தினமே உன்னை நான் சுங்கம் பேருந்து நிறுத்தத்தில் இறக்கிவிட்டது. நம் தினசரி வாழ்க்கையை அழகாக்கிய ஒரு எளிய பயணம்."
    },
    doodle: "bike",
    x: 130, y: 20
  },
  {
    id: 3,
    image: img3,
    location: { en: "Gandhipuram Bus Stop", ta: "காந்திபுரம் பேருந்து நிறுத்தம்" },
    title: { en: "Gandhipuram Drop-offs & Mirror Selfies", ta: "காந்திபுரம் பயணங்கள் & செல்ஃபிகள்" },
    date: { en: "Road of Little Moments", ta: "சின்னஞ்சிறு நினைவுகள் நிறைந்த சாலை" },
    description: {
      en: "After dropping you off at the Gandhipuram bus stop, we stopped for random mirror selfies in front of shop windows. The road itself felt like it was carrying all of our sweet, little moments together, capturing the pure joy of being side-by-side.",
      ta: "உன்னை நான் காந்திபுரம் பேருந்து நிறுத்தத்தில் இறக்கிவிட்ட பிறகு, கடை வாசல்களில் நின்று நாம் எடுத்த ரேண்டம் கண்ணாடி செல்ஃபிகள். நாம் பயணித்த அந்தச் சாலை நம்முடைய சின்னஞ்சிறு அழகான நினைவுகளை எல்லாம் சுமந்து செல்வது போல் இருந்தது, நமது அருகாமையின் தூய மகிழ்ச்சியைப் பதிவு செய்தது."
    },
    doodle: "camera",
    x: 210, y: 40
  },
  {
    id: 4,
    image: img4,
    location: { en: "Race Course", ta: "ரேஸ் கோர்ஸ்" },
    title: { en: "Meeting at Race Course", ta: "ரேஸ் கோர்ஸ் சந்திப்பு" },
    date: { en: "A Quiet Walk", ta: "ஒரு அமைதியான உலா" },
    description: {
      en: "A quiet stroll under the canopy of trees at Coimbatore Race Course. Finding a corner to talk, laughing at silly jokes, and feeling the comfort of your presence.",
      ta: "கோவை ரேஸ் கோர்ஸ் மர நிழல்களின் கீழ் ஒரு அமைதியான உலா. பேசுவதற்கு ஒரு நல்ல இடம், நமது சின்னஞ்சிறு சிரிப்புகள், உனது அருகில் இருக்கும் போது கிடைத்த அந்த நிம்மதி."
    },
    doodle: "tree",
    x: 290, y: 15
  },
  {
    id: 5,
    image: img5,
    location: { en: "Race Course Eateries", ta: "சாட் கடை" },
    title: { en: "Our First Chat Shop Date", ta: "முதல் சாட் கடை சந்திப்பு" },
    date: { en: "Spicy & Sweet", ta: "காரமும் இனிப்பும்" },
    description: {
      en: "Sharing spicy plates of chat, fighting over the last pani puri, and realizing that food tastes so much better when shared with you. The spice of life indeed!",
      ta: "காரசாரமான சாட் தட்டுகளைப் பகிர்ந்து கொண்டு, கடைசி பானி பூரிக்காக சண்டையிட்டு, உணவு உன்னுடன் பகிரும் போது இன்னும் சுவையாக மாறுவதை உணர்ந்த தருணம்."
    },
    doodle: "food",
    x: 370, y: 35
  },
  {
    id: 6,
    image: img6,
    location: { en: "V O C Park", ta: "வி.ஓ.சி பூங்கா" },
    title: { en: "First Park Date", ta: "முதல் பூங்கா சந்திப்பு" },
    date: { en: "Slowing Down Time", ta: "நின்றுகொண்ட நேரம்" },
    description: {
      en: "Sitting on a wooden bench, surrounded by green lawns and the quiet rustle of leaves. The world slowed down, and for a few hours, it was just you and me.",
      ta: "பச்சை புல்வெளிகள் மற்றும் இலைகளின் சலசலப்புக்கு மத்தியில் ஒரு மர பெஞ்சில் அமர்ந்திருந்தோம். உலகம் தற்காலிகமாக நின்று போனது, சில மணிநேரங்கள் நமக்கு மட்டுமே சொந்தமானது."
    },
    doodle: "flower",
    x: 450, y: 20
  },
  {
    id: 7,
    image: img7,
    location: { en: "V O C Park Bench", ta: "பூங்கா மரப்பலகை" },
    title: { en: "Hands Intertwined", ta: "விரல்கள் பிணைந்த தருணம்" },
    date: { en: "A Deeper Connection", ta: "ஆழமான பிணைப்பு" },
    description: {
      en: "Our second park visit brought serious talks, deeper understanding, and that unforgettable moment—our fingers tracing, finding their fit, and holding hands for the first time.",
      ta: "நமது இரண்டாவது பூங்கா சந்திப்பு ஆழமான உரையாடல்களையும், பரஸ்பர புரிதலையும் தந்தது. மறக்க முடியாத அந்த நொடி—நம் விரல்கள் மெதுவாக ஒன்றிணைந்து முதல்முறையாக கைகோர்த்த தருணம்."
    },
    doodle: "hand",
    x: 530, y: 30
  },
  {
    id: 8,
    image: img8,
    location: { en: "Morning Ride", ta: "காலை சவாரி" },
    title: { en: "Care & Comfort", ta: "அன்பும் அரவணைப்பும்" },
    date: { en: "Through Thick & Thin", ta: "இன்பத்திலும் துன்பத்திலும்" },
    description: {
      en: "A gentle morning ride when you weren't feeling your best. Holding you close, trying to soothe your pain, and realizing that loving you means being there in every high and low.",
      ta: "உனக்கு உடல்நிலை சரியில்லாத ஒரு காலைப் பொழுதில் ஒரு மென்மையான பைக் பயணம். உன்னை அரவணைத்து, உன் வலியைப் போக்க முயன்ற போது, காதலின் உண்மையான அர்த்தத்தை உணர்ந்தேன்."
    },
    doodle: "bandaid",
    x: 610, y: 15
  },
  {
    id: 9,
    image: img9,
    location: { en: "Bypass Road", ta: "பைபாஸ் சாலை" },
    title: { en: "Under the Starlit Sky", ta: "விண்மீன்கள் நிறைந்த வானின் கீழ்" },
    date: { en: "Midnight Cruising", ta: "நள்ளிரவுப் பயணம்" },
    description: {
      en: "Cruising down the city roads at night under the cool breeze, your arms wrapped around me. Nothing else mattered but the road ahead and the warmth of your embrace.",
      ta: "குளிர்ந்த காற்றில் நள்ளிரவு நேரத்தில் உனது கைகள் என்னை இறுக்கமாக அணைக்க கோவை பைபாஸ் சாலையில் பயணித்தது. நாம் செல்லும் பாதையும் உன் உடலின் வெப்பமும் மட்டுமே அப்போது எனக்குத் தேவைப்பட்டது."
    },
    doodle: "bike",
    x: 690, y: 40
  },
  {
    id: 10,
    image: img10,
    location: { en: "Gandhipuram", ta: "காந்திபுரம்" },
    title: { en: "The Rush of Gandhipuram", ta: "காந்திபுரத்தின் பரப்பரப்பு" },
    date: { en: "City Lights", ta: "நகர விளக்குகள்" },
    description: {
      en: "Navigating the busy crowds and vibrant shops of Gandhipuram. No matter how chaotic the city got, being with you made everything feel perfectly peaceful.",
      ta: "காந்திபுரத்தின் கூட்ட நெரிசலிலும் துடிப்பான கடைகளிலும் நாம் உலா வந்தது. நகரம் எவ்வளவு பரபரப்பாக இருந்தாலும், உன்னுடன் இருக்கும் போது எல்லாமே அமைதியாகத் தோன்றியது."
    },
    doodle: "coffee",
    x: 770, y: 25
  },
  {
    id: 11,
    image: img11,
    location: { en: "Gandhipuram Food Stall", ta: "முட்டை பேல் கடை" },
    title: { en: "Discovering Muttai Bhel Together", ta: "முட்டை பேல் ருசித்தது" },
    date: { en: "Coimbatore Delicacy", ta: "கோவை ஸ்பெஷல்" },
    description: {
      en: "Trying out the famous local Muttai Bhel for the first time. Messy, delicious, and full of laughter. Another culinary memory added to our collection!",
      ta: "முதன்முறையாக கோவையின் பிரபல முட்டை பேலை ருசித்த தருணம். சிந்திக்கொண்டே, சிரித்துக்கொண்டே சாப்பிட்ட அந்த உணவு, நம் நினைவுகளில் என்றும் சுவையான ஒன்றாக இருக்கும்."
    },
    doodle: "food",
    x: 850, y: 35
  },
  {
    id: 12,
    image: img12,
    location: { en: "Kovai Selfie Spot", ta: "செல்ஃபி ஸ்பாட்" },
    title: { en: "Our Kovai Love Story", ta: "நமது கோவை காதல் கதை" },
    date: { en: "I Love Kovai", ta: "ஐ லவ் கோவை" },
    description: {
      en: "Standing in front of the 'I Love Kovai' sign. It’s not just a city; it's the place where we fell in love, where we rode, walked, laughed, and built our own little world.",
      ta: "'ஐ லவ் கோவை' பலகைக்கு முன்னால் நின்ற தருணம். இது வெறும் நகரம் மட்டுமல்ல; நாம் காதலித்த, சிரித்த, பயணித்த, மற்றும் நமக்கென்று ஒரு சிறிய உலகத்தை உருவாக்கிய புண்ணிய தலம்."
    },
    doodle: "sparkle",
    x: 930, y: 20
  }
];

// Custom Doodle Component to render cute hand-drawn inline SVGs (Deep Violet stroke)
const Doodle = ({ type }) => {
  const strokeColor = "#4a044e";
  
  switch (type) {
    case "heart":
      return (
        <svg className="doodle" width="60" height="60" viewBox="0 0 24 24" style={{ top: '8%', right: '8%' }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3,3" />
        </svg>
      );
    case "bike":
      return (
        <svg className="doodle" width="70" height="70" viewBox="0 0 24 24" style={{ top: '15%', right: '6%' }}>
          <circle cx="5" cy="18" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="19" cy="18" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M19 18v-5l-4-4H9L5.5 14M9 9l2 9M12 18h7M15 13H9" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3,2" />
        </svg>
      );
    case "camera":
      return (
        <svg className="doodle" width="60" height="60" viewBox="0 0 24 24" style={{ top: '10%', right: '10%' }}>
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="12" cy="13" r="4" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );
    case "tree":
      return (
        <svg className="doodle" width="60" height="70" viewBox="0 0 24 24" style={{ top: '12%', right: '8%' }}>
          <path d="M12 2L3 9h3v10h12V9h3L12 2z" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4,2" />
        </svg>
      );
    case "food":
      return (
        <svg className="doodle" width="60" height="60" viewBox="0 0 24 24" style={{ top: '6%', right: '8%' }}>
          <ellipse cx="12" cy="15" rx="9" ry="5" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M7 12c0-3 2-5 5-5s5 2 5 5" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2,2" />
        </svg>
      );
    case "flower":
      return (
        <svg className="doodle" width="65" height="65" viewBox="0 0 24 24" style={{ top: '10%', right: '8%' }}>
          <circle cx="12" cy="12" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="12" cy="6" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="12" cy="18" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="6" cy="12" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="18" cy="12" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );
    case "hand":
      return (
        <svg className="doodle" width="70" height="60" viewBox="0 0 24 24" style={{ top: '15%', right: '8%' }}>
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5M14 10V5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5M10 11V7a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7M6 14v-2a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6c0 3.3 2.7 6 6 6h4c3 0 6-3 6-6v-3" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3,3" />
        </svg>
      );
    case "bandaid":
      return (
        <svg className="doodle" width="60" height="60" viewBox="0 0 24 24" style={{ top: '8%', right: '10%' }}>
          <rect x="2" y="9" width="20" height="6" rx="2" transform="rotate(45 12 12)" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <rect x="2" y="9" width="20" height="6" rx="2" transform="rotate(-45 12 12)" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3,2" />
        </svg>
      );
    case "coffee":
      return (
        <svg className="doodle" width="60" height="60" viewBox="0 0 24 24" style={{ top: '14%', right: '10%' }}>
          <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M6 2v2M10 2v2M14 2v2" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );
    case "sparkle":
      return (
        <svg className="doodle" width="60" height="60" viewBox="0 0 24 24" style={{ top: '10%', right: '10%' }}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3,3" />
        </svg>
      );
    default:
      return null;
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState(0) // 0: Cover, 1-24: Journey, 25: Envelope, 26: Cake
  const [isPlaying, setIsPlaying] = useState(false)
  const [enableHearts, setEnableHearts] = useState(true)
  const [floatingHearts, setFloatingHearts] = useState([])
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [candles, setCandles] = useState([true, true, true]) // true = lit, false = blown
  const [lang, setLang] = useState('en') // 'en' for English, 'ta' for Tamil
  
  // Preloader State
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Screen Width State for dynamic pagination
  const [isMobile, setIsMobile] = useState(false)

  // Lightbox overlay state for fullscreen images
  const [lightboxImage, setLightboxImage] = useState(null)

  // Ref for audio element
  const audioRef = useRef(null)

  // Touch Swipe State
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  // Track window resizing for single-page vs double-page layouts
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setCurrentPage((prev) => {
          // If we are on page 26 (mobile last page), align it to 25 (desktop last spread)
          if (prev >= 26) return 25
          // Ensure it's an odd page on desktop (except Cover page 0)
          if (prev > 0 && prev % 2 === 0) {
            return prev - 1
          }
          return prev
        })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Asset Preloading Engine
  useEffect(() => {
    const assets = [
      img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12
    ]
    let loadedCount = 0
    const totalAssets = assets.length

    const incrementProgress = () => {
      loadedCount++
      const percent = Math.round((loadedCount / totalAssets) * 100)
      setLoadingProgress(percent)
      if (loadedCount >= totalAssets) {
        setTimeout(() => {
          setIsLoading(false)
        }, 800)
      }
    }

    assets.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = incrementProgress
      img.onerror = incrementProgress
    })
  }, [])

  // Floating Particles Generator (watercolor stars, maple leaves, cherry blossoms, sparkles, bubbles)
  useEffect(() => {
    if (!enableHearts) {
      setFloatingHearts([])
      return
    }

    const interval = setInterval(() => {
      const types = ['star', 'leaf', 'flower', 'sparkle', 'bubble']
      const type = types[Math.floor(Math.random() * types.length)]
      
      const newParticle = {
        id: Date.now() + Math.random(),
        type: type,
        left: Math.random() * 100,
        scale: 0.5 + Math.random() * 0.9,
        duration: 8 + Math.random() * 7,
        delay: Math.random() * 2,
        rotation: Math.random() * 360,
        swayDuration: 4 + Math.random() * 4
      }

      setFloatingHearts((prev) => [...prev.slice(-35), newParticle])
    }, 450)

    return () => clearInterval(interval)
  }, [enableHearts])

  // Handle BGM Play/Pause state changes
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.warn("Autoplay block by browser:", err)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const startJourney = () => {
    playClickSound()
    setCurrentPage(1)
    setIsPlaying(true)
    playPageTurnSound()
  }

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const isMobileView = window.innerWidth < 1024
      const step = isMobileView ? 1 : 2
      let target = prev + step

      // Align target for desktop to be odd so spreads stay aligned (Page 1/2, 3/4, etc.)
      if (!isMobileView && target > 0 && target % 2 === 0) {
        target = target - 1
      }

      if (prev === 0) target = 1
      
      const maxPage = isMobileView ? 26 : 25
      if (target > maxPage) return maxPage

      playClickSound()
      playPageTurnSound()
      return target
    })
  }, [])

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => {
      const isMobileView = window.innerWidth < 1024
      const step = isMobileView ? 1 : 2
      let target = prev - step

      // Align target for desktop to be odd so spreads stay aligned
      if (!isMobileView && target > 0 && target % 2 === 0) {
        target = target - 1
      }

      if (prev === 1 || prev === 2) target = 0 // Go back to Cover
      if (target < 0) return 0

      playClickSound()
      playPageTurnSound()
      return target
    })
  }, [])

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextPage()
      } else if (e.key === 'ArrowLeft') {
        prevPage()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextPage, prevPage])

  const toggleMusic = () => {
    playClickSound()
    setIsPlaying(!isPlaying)
  }

  const toggleHearts = () => {
    playClickSound()
    setEnableHearts(!enableHearts)
  }

  // Swipe detection handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextPage()
    } else if (isRightSwipe) {
      prevPage()
    }
  }

  // Blow out candle action
  const blowCandle = (index) => {
    if (!candles[index]) return
    playClickSound()
    
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}

    const newCandles = [...candles]
    newCandles[index] = false
    setCandles(newCandles)

    triggerSparkle(index)

    if (newCandles.every(c => c === false)) {
      triggerBirthdayCelebration()
    }
  }

  const relightCandles = () => {
    playClickSound()
    setCandles([true, true, true])
  }

  const triggerSparkle = (index) => {
    const parent = document.getElementById(`candle-${index}`)
    if (!parent) return

    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div')
      sparkle.className = 'sparkle'
      const x = (Math.random() - 0.5) * 40
      const y = -15 - Math.random() * 20
      sparkle.style.setProperty('--x', `${x}px`)
      sparkle.style.setProperty('--y', `${y}px`)
      sparkle.style.left = '3px'
      sparkle.style.top = '-10px'
      sparkle.style.width = '6px'
      sparkle.style.height = '6px'
      parent.appendChild(sparkle)
      setTimeout(() => sparkle.remove(), 800)
    }
  }

  const triggerBirthdayCelebration = () => {
    const duration = 5 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#a855f7', '#701a75', '#f3e8ff', '#fae8ff', '#8b5cf6', '#d946ef']
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#a855f7', '#701a75', '#f3e8ff', '#fae8ff', '#8b5cf6', '#d946ef']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  const isJourneyPage = currentPage >= 1 && currentPage <= 24
  
  // Calculate active slide index (0 to 11) dynamically based on layout mode
  const activeSlideIndex = isJourneyPage 
    ? (isMobile ? Math.floor((currentPage - 1) / 2) : Math.ceil(currentPage / 2) - 1)
    : null
  
  const activeSlide = isJourneyPage ? slides[activeSlideIndex] : null

  // Custom tape styles based on page index (sunset/gold/teal tones)
  const leftWashi = isJourneyPage ? washiTapes[(currentPage * 2) % washiTapes.length] : "";
  const rightWashi = isJourneyPage ? washiTapes[(currentPage * 2 + 1) % washiTapes.length] : "";

  // Render Preloader if assets are downloading
  if (isLoading) {
    return (
      <div className="preloader-container">
        <div className="preloader-card">
          <div className="preloader-watercolor-splash"></div>
          <div className="preloader-heart-wrapper">
            <svg width="60" height="54" viewBox="0 0 24 22" fill="#701a75" className="preloader-heart">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="preloader-title">Unfolding Our Memories...</h2>
          <p className="preloader-subtitle">நமது நினைவுகள் திறக்கிறது...</p>
          <div className="preloader-bar-bg">
            <div className="preloader-bar-fill" style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <span className="preloader-percentage">{loadingProgress}%</span>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`desk-container ${lang === 'ta' ? 'lang-ta' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Audio element for BGM */}
      <audio 
        ref={audioRef} 
        src={bgmAudio} 
        loop 
        style={{ display: 'none' }} 
      />

      {/* Floating particles container */}
      <div className="floating-hearts-container">
        {floatingHearts.map((p) => {
          let content = null
          if (p.type === 'star') {
            content = <svg width="18" height="18" viewBox="0 0 24 24" fill="#a855f7"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          } else if (p.type === 'leaf') {
            content = <svg width="18" height="18" viewBox="0 0 24 24" fill="#14b8a6"><path d="M12 2C11.5 5 9 7.5 6 8.5C5.5 11.5 7 14 10 14.5V20c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-5.5c3-.5 4.5-3 4-6C15 7.5 12.5 5 12 2z"/></svg>
          } else if (p.type === 'flower') {
            content = <svg width="16" height="16" viewBox="0 0 24 24" fill="#f472b6"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/></svg>
          } else if (p.type === 'sparkle') {
            content = <svg width="18" height="18" viewBox="0 0 24 24" fill="#d946ef"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" stroke="#d946ef" strokeWidth="2"/></svg>
          } else {
            content = <svg width="12" height="12" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="rgba(139, 92, 246, 0.15)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1.5"/></svg>
          }
          return (
            <div
              key={p.id}
              className={`heart-particle particle-${p.type}`}
              style={{
                left: `${p.left}%`,
                transform: `scale(${p.scale}) rotate(${p.rotation}deg)`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                '--sway-duration': `${p.swayDuration}s`
              }}
            >
              {content}
            </div>
          )
        })}
      </div>

      {/* Control panel toolbar */}
      <div className="control-toolbar">
        {/* Language Switch Toggle */}
        <button 
          onClick={() => { playClickSound(); setLang(lang === 'en' ? 'ta' : 'en'); }} 
          className="toolbar-btn active"
          style={{ border: '1px solid rgba(112, 26, 117, 0.25)' }}
          title={lang === 'en' ? "Switch to Tamil" : "ஆங்கிலத்திற்கு மாற்றவும்"}
        >
          <Globe size={18} style={{ marginRight: 4 }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
            {lang === 'en' ? 'தமிழ்' : 'EN'}
          </span>
        </button>

        {/* BGM Toggle */}
        <button 
          onClick={toggleMusic} 
          className={`toolbar-btn ${isPlaying ? 'active' : ''}`}
          title={lang === 'en' ? (isPlaying ? "Mute BGM" : "Play BGM") : (isPlaying ? "இசையை நிறுத்து" : "இசையை இயக்கு")}
        >
          {isPlaying ? (
            <Volume2 className="vinyl-spinner" size={18} />
          ) : (
            <VolumeX size={18} />
          )}
          <Music size={12} style={{ marginLeft: 2 }} />
        </button>

        {/* Particles Toggle */}
        <button 
          onClick={toggleHearts} 
          className={`toolbar-btn ${enableHearts ? 'active' : ''}`}
          title={lang === 'en' ? (enableHearts ? "Disable Drift Effects" : "Enable Drift Effects") : (enableHearts ? "விளைவுகளை அணை" : "விளைவுகளை இயக்கு")}
        >
          <Sparkles size={18} fill={enableHearts ? "#d946ef" : "none"} color={enableHearts ? "#701a75" : "currentColor"} />
        </button>
      </div>

      <div className="scrapbook-wrapper">
        
        {/* Navigation Arrows for pages */}
        {currentPage > 0 && (
          <button onClick={prevPage} className="nav-arrow nav-arrow-left" aria-label="Previous Page">
            <ArrowLeft size={44} strokeWidth={1.5} />
          </button>
        )}
        
        {currentPage < (isMobile ? 26 : 25) && currentPage > 0 && (
          <button onClick={nextPage} className="nav-arrow nav-arrow-right pulse-arrow" aria-label="Next Page">
            <ArrowRight size={44} strokeWidth={1.5} />
          </button>
        )}

        {/* 1. Cover Page */}
        {currentPage === 0 && (
          <div className="book-cover">
            <div className="cover-embossing"></div>
            <Sparkles size={40} fill="#d946ef" stroke="none" style={{ marginBottom: 15 }} />
            <h1 className="cover-title">
              {lang === 'en' ? 'Our Story' : 'நமது கதை'}
            </h1>
            <p className="cover-subtitle">
              {lang === 'en' ? 'The Sketchbook of Us' : 'நமது பயணச் சுவடுகள்'}
            </p>
            <p className="cover-description-text">
              {lang === 'en' 
                ? `"Every corner of Kovai holds a sketch of us, a memory of laughter, and a story of how we grew closer."`
                : `"கோவையின் ஒவ்வொரு மூலையும் நமது ஒரு ஓவியத்தை, சிரிப்பை, நாம் எவ்வாறு இணைந்தோம் என்ற கதையைத் தாங்கி நிற்கிறது."`
              }
            </p>
            <button onClick={startJourney} className="cute-btn">
              <BookOpen size={20} />
              {lang === 'en' ? 'Open Our Story' : 'நமது கதையைத் திறக்கவும்'}
            </button>
          </div>
        )}

        {/* 2. Journey Scrapbook Pages */}
        {isJourneyPage && (
          <div key={`page-${currentPage}`} className="book page-anim-enter-active">
            
            {/* Spiral bound notebook spine rings (only on desktop double-page view) */}
            {!isMobile && (
              <div className="spiral-spine">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="spiral-ring"></div>
                ))}
              </div>
            )}

            {/* DYNAMIC RENDERING: Mobile single-page vs Desktop double-page */}
            {isMobile ? (
              currentPage % 2 !== 0 ? (
                /* Mobile View: Polaroid page only */
                <div className="page left-page mobile-single">
                  <div className="coffee-stain" style={{ top: '8%', left: '8%' }}></div>
                  <div 
                    className="polaroid-frame" 
                    style={{ transform: `rotate(${(currentPage % 2 === 0 ? -1 : 1) * 1.5}deg)` }}
                  >
                    <div className={`tape tape-top-left ${leftWashi}`}></div>
                    <div className={`tape tape-top-right ${rightWashi}`}></div>
                    <div 
                      className="polaroid-image-container"
                      onClick={() => {
                        playClickSound()
                        setLightboxImage(activeSlide.image)
                      }}
                      style={{ cursor: 'zoom-in' }}
                    >
                      <img 
                        src={activeSlide.image} 
                        alt={activeSlide.title[lang]} 
                        className="polaroid-image"
                        loading="eager"
                      />
                    </div>
                    <p className="polaroid-caption">{activeSlide.date[lang]}</p>
                  </div>
                  <div className="book-footer">
                    <span className="page-number">Page {currentPage}</span>
                    <span className="page-number">{activeSlide.location[lang]}</span>
                  </div>
                </div>
              ) : (
                /* Mobile View: Diary text & Map page only */
                <div className="page right-page mobile-single">
                  <Doodle type={activeSlide.doodle} />
                  <div className="journal-content-wrapper">
                    <h2 className="journal-title">{activeSlide.title[lang]}</h2>
                    <div className="note-lined">
                      <p className="journal-text">{activeSlide.description[lang]}</p>
                    </div>
                  </div>

                  <div className="journey-map-container">
                    <div className="journey-map-title">
                      <div className="journey-map-title-left">
                        <Smile size={16} stroke="#701a75" />
                        <span>{lang === 'en' ? 'Places We Travelled in Kovai' : 'கோவையில் நாம் பயணித்த இடங்கள்'}</span>
                      </div>
                      <span className="active-stop-badge">
                        {activeSlide.location[lang]}
                      </span>
                    </div>
                    <svg className="journey-svg" viewBox="0 0 1000 60">
                      <path className="map-line" d="M 50 30 C 90 20, 90 20, 130 20 C 170 20, 170 40, 210 40 C 250 40, 250 15, 290 15 C 330 15, 330 35, 370 35 C 410 35, 410 20, 450 20 C 490 20, 490 30, 530 30 C 570 30, 570 15, 610 15 C 650 15, 650 40, 690 40 C 730 40, 730 25, 770 25 C 810 25, 810 35, 850 35 C 890 35, 890 20, 930 20" />
                      <path 
                        className="map-line-progress" 
                        d="M 50 30 C 90 20, 90 20, 130 20 C 170 20, 170 40, 210 40 C 250 40, 250 15, 290 15 C 330 15, 330 35, 370 35 C 410 35, 410 20, 450 20 C 490 20, 490 30, 530 30 C 570 30, 570 15, 610 15 C 650 15, 650 40, 690 40 C 730 40, 730 25, 770 25 C 810 25, 810 35, 850 35 C 890 35, 890 20, 930 20" 
                        strokeDasharray="1000"
                        strokeDashoffset={1000 - (activeSlideIndex / 11) * 880}
                      />
                      {slides.map((s, idx) => (
                        <g key={s.id}>
                          <circle 
                            cx={s.x} 
                            cy={s.y} 
                            r="5" 
                            className={`map-dot ${idx === activeSlideIndex ? 'active' : idx < activeSlideIndex ? 'completed' : ''}`}
                            onClick={() => {
                              playClickSound()
                              setCurrentPage(idx * 2 + 2) // Go to notes page of that slide
                            }}
                          />
                          {(idx === 0 || idx === 11) && (
                            <text x={s.x} y={s.y - 12} className="map-text">{s.location[lang]}</text>
                          )}
                        </g>
                      ))}
                      <g className="map-rider" transform={`translate(${activeSlide.x - 7}, ${activeSlide.y - 8})`}>
                        <Heart size={14} fill="#d946ef" stroke="#701a75" strokeWidth={1} />
                      </g>
                    </svg>
                  </div>
                  <div className="book-footer">
                    <span className="page-number">Page {currentPage}</span>
                    <span className="page-number">{lang === 'en' ? 'Story Notes' : 'பயணக் குறிப்பு'}</span>
                  </div>
                </div>
              )
            ) : (
              /* Desktop View: Left (image) + Right (text/map) side-by-side */
              <>
                <div className="page left-page">
                  <div className="coffee-stain" style={{ top: '12%', left: '10%' }}></div>
                  <div className="coffee-stain" style={{ bottom: '15%', right: '8%', width: '90px', height: '90px' }}></div>
                  
                  <div 
                    className="polaroid-frame" 
                    style={{ transform: `rotate(${(currentPage % 2 === 0 ? -1 : 1) * (1.5 + (currentPage % 3))}deg)` }}
                  >
                    <div className={`tape tape-top-left ${leftWashi}`}></div>
                    <div className={`tape tape-top-right ${rightWashi}`}></div>
                    <div 
                      className="polaroid-image-container"
                      onClick={() => {
                        playClickSound()
                        setLightboxImage(activeSlide.image)
                      }}
                      style={{ cursor: 'zoom-in' }}
                    >
                      <img 
                        src={activeSlide.image} 
                        alt={activeSlide.title[lang]} 
                        className="polaroid-image"
                        loading="eager"
                      />
                    </div>
                    <p className="polaroid-caption">{activeSlide.date[lang]}</p>
                  </div>
                </div>

                <div className="page right-page">
                  <Doodle type={activeSlide.doodle} />
                  
                  <div className="journal-content-wrapper">
                    <h2 className="journal-title">{activeSlide.title[lang]}</h2>
                    <div className="note-lined">
                      <p className="journal-text">{activeSlide.description[lang]}</p>
                    </div>
                  </div>

                  <div className="journey-map-container">
                    <div className="journey-map-title">
                      <div className="journey-map-title-left">
                        <Smile size={16} stroke="#701a75" />
                        <span>{lang === 'en' ? 'Places We Travelled in Kovai' : 'கோவையில் நாம் பயணித்த இடங்கள்'}</span>
                      </div>
                      <span className="active-stop-badge">
                        {activeSlide.location[lang]}
                      </span>
                    </div>
                    <svg className="journey-svg" viewBox="0 0 1000 60">
                      <path className="map-line" d="M 50 30 C 90 20, 90 20, 130 20 C 170 20, 170 40, 210 40 C 250 40, 250 15, 290 15 C 330 15, 330 35, 370 35 C 410 35, 410 20, 450 20 C 490 20, 490 30, 530 30 C 570 30, 570 15, 610 15 C 650 15, 650 40, 690 40 C 730 40, 730 25, 770 25 C 810 25, 810 35, 850 35 C 890 35, 890 20, 930 20" />
                      <path 
                        className="map-line-progress" 
                        d="M 50 30 C 90 20, 90 20, 130 20 C 170 20, 170 40, 210 40 C 250 40, 250 15, 290 15 C 330 15, 330 35, 370 35 C 410 35, 410 20, 450 20 C 490 20, 490 30, 530 30 C 570 30, 570 15, 610 15 C 650 15, 650 40, 690 40 C 730 40, 730 25, 770 25 C 810 25, 810 35, 850 35 C 890 35, 890 20, 930 20" 
                        strokeDasharray="1000"
                        strokeDashoffset={1000 - (activeSlideIndex / 11) * 880}
                      />
                      {slides.map((s, idx) => (
                        <g key={s.id}>
                          <circle 
                            cx={s.x} 
                            cy={s.y} 
                            r="5" 
                            className={`map-dot ${idx === activeSlideIndex ? 'active' : idx < activeSlideIndex ? 'completed' : ''}`}
                            onClick={() => {
                              playClickSound()
                              setCurrentPage(idx * 2 + 1)
                            }}
                          />
                          {(idx === 0 || idx === 11) && (
                            <text x={s.x} y={s.y - 12} className="map-text">{s.location[lang]}</text>
                          )}
                        </g>
                      ))}
                      <g className="map-rider" transform={`translate(${activeSlide.x - 7}, ${activeSlide.y - 8})`}>
                        <Heart size={14} fill="#d946ef" stroke="#701a75" strokeWidth={1} />
                      </g>
                    </svg>
                  </div>

                  <div className="book-footer">
                    <span className="page-number">Page {currentPage}</span>
                    <span className="page-number">Page {currentPage + 1}</span>
                  </div>
                </div>
              </>
            )}

          </div>
        )}

        {/* 3. Birthday Envelope Wish Page */}
        {currentPage === 25 && (
          <div className="book page-anim-enter-active">
            {!isMobile && (
              <div className="spiral-spine">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="spiral-ring"></div>
                ))}
              </div>
            )}

            {isMobile ? (
              /* Mobile View: Envelope only */
              <div className="page left-page mobile-single" style={{ justifyContent: 'center' }}>
                <div className="coffee-stain" style={{ top: '15%', left: '10%' }}></div>
                <h2 className="journal-title" style={{ textAlign: 'center', marginBottom: 20 }}>
                  {lang === 'en' ? 'A Special Note for You' : 'உனக்காக ஒரு உன்னத கடிதம்'}
                </h2>
                
                <div 
                  className={`envelope-container ${isEnvelopeOpen ? 'open' : ''}`}
                  onClick={() => {
                    playClickSound()
                    setIsEnvelopeOpen(!isEnvelopeOpen)
                  }}
                >
                  <div className={`envelope ${isEnvelopeOpen ? 'open' : ''}`}>
                    <div className="envelope-flap"></div>
                    <div className="envelope-right-flap"></div>
                    <div className="heart-seal">
                      <Sparkles size={20} fill="#701a75" color="none" />
                    </div>
                    <div className="letter">
                      <h3 className="letter-title">
                        {lang === 'en' ? 'Dear Person,' : 'என் அன்பானவளுக்கு,'}
                      </h3>
                      <p className="letter-body" style={{ whiteSpace: 'pre-line' }}>
                        {lang === 'en' 
                          ? `Happy Birthday! 🎂✨
                          
                          Looking back at our sketches and the roads we travelled, from RS Puram to the Kovai sign, I cherish every single kilometer we rode together.
                          
                          You bring so much joy into my life. I hope this birthday brings you all the happiness, laughter, and sweets you deserve. Here's to more rides, more dates, and more memories in Kovai! 💕
                          
                          With Love, Always.`
                          : `இனிய பிறந்தநாள் நல்வாழ்த்துகள்! 🎂✨

                          நம் வரைபடங்களையும் நாம் பயணித்த கோவைச் சாலைகளையும் திரும்பிப் பார்க்கையில், ஆர்.எஸ்.புரம் முதல் கோவை பலகை வரை நாம் இணைந்து பயணித்த ஒவ்வொரு கிலோமீட்டரையும் நான் பொக்கிஷமாக நினைக்கிறேன்.

                          என் வாழ்க்கையில் இவ்வளவு மகிழ்ச்சியைக் கொண்டு வந்ததற்கு நன்றி. இந்த பிறந்தநாள் உனக்கு எல்லா மகிழ்ச்சியையும், சிரிப்பையும், இனிப்புகளையும் தரட்டும். இன்னும் பல பயணங்கள், பல தேதிகள், பல அழகான கோவை நினைவுகளுக்கு! 💕

                          என்றும் உன்னன்புடன்.`
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="book-footer">
                  <span className="page-number">Page 25</span>
                  <span className="page-number">{lang === 'en' ? 'Tap Envelope' : 'கடிதத்தை தட்டவும்'}</span>
                </div>
              </div>
            ) : (
              /* Desktop View: Envelope & Cake side-by-side */
              <>
                <div className="page left-page">
                  <div className="coffee-stain" style={{ top: '15%', left: '10%' }}></div>
                  <h2 className="journal-title" style={{ textAlign: 'center', marginBottom: 20 }}>
                    {lang === 'en' ? 'A Special Note for You' : 'உனக்காக ஒரு உன்னத கடிதம்'}
                  </h2>
                  
                  <div 
                    className={`envelope-container ${isEnvelopeOpen ? 'open' : ''}`}
                    onClick={() => {
                      playClickSound()
                      setIsEnvelopeOpen(!isEnvelopeOpen)
                    }}
                  >
                    <div className={`envelope ${isEnvelopeOpen ? 'open' : ''}`}>
                      <div className="envelope-flap"></div>
                      <div className="envelope-right-flap"></div>
                      <div className="heart-seal">
                        <Sparkles size={20} fill="#701a75" color="none" />
                      </div>
                      <div className="letter">
                        <h3 className="letter-title">
                          {lang === 'en' ? 'Dear Person,' : 'என் அன்பானவளுக்கு,'}
                        </h3>
                        <p className="letter-body" style={{ whiteSpace: 'pre-line' }}>
                          {lang === 'en' 
                            ? `Happy Birthday! 🎂✨
                            
                            Looking back at our sketches and the roads we travelled, from RS Puram to the Kovai sign, I cherish every single kilometer we rode together.
                            
                            You bring so much joy into my life. I hope this birthday brings you all the happiness, laughter, and sweets you deserve. Here's to more rides, more dates, and more memories in Kovai! 💕
                            
                            With Love, Always.`
                            : `இனிய பிறந்தநாள் நல்வாழ்த்துகள்! 🎂✨

                            நம் வரைபடங்களையும் நாம் பயணித்த கோவைச் சாலைகளையும் திரும்பிப் பார்க்கையில், ஆர்.எஸ்.புரம் முதல் கோவை பலகை வரை நாம் இணைந்து பயணித்த ஒவ்வொரு கிலோமீட்டரையும் நான் பொக்கிஷமாக நினைக்கிறேன்.

                            என் வாழ்க்கையில் இவ்வளவு மகிழ்ச்சியைக் கொண்டு வந்ததற்கு நன்றி. இந்த பிறந்தநாள் உனக்கு எல்லா மகிழ்ச்சியையும், சிரிப்பையும், இனிப்புகளையும் தரட்டும். இன்னும் பல பயணங்கள், பல தேதிகள், பல அழகான கோவை நினைவுகளுக்கு! 💕

                            என்றும் உன்னன்புடன்.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="page right-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div className="coffee-stain" style={{ bottom: '10%', right: '10%' }}></div>
                  <h2 className="journal-title" style={{ textAlign: 'center' }}>
                    {lang === 'en' ? 'Make a Wish!' : 'ஒரு ஆசையை நினைத்துக் கொள்!'}
                  </h2>
                  <p className="cake-instructions">
                    {candles.every(c => c === false) 
                      ? (lang === 'en' ? "Yay! Happy Birthday! 🎉✨" : "ஹேப்பி பர்த்டே! 🎉✨")
                      : (lang === 'en' ? "Click the candle flames to blow them out and celebrate!" : "மெழுகுவர்த்தி தீபங்களை அணைத்துக் கொண்டாட கிளிக் செய்யவும்!")
                    }
                  </p>

                  <div className="birthday-cake-container">
                    <div className="cake">
                      <div className="frosting"></div>
                      <div className="candles-group">
                        {candles.map((lit, idx) => (
                          <div 
                            key={idx} 
                            id={`candle-${idx}`}
                            className={`candle ${lit ? 'lit' : 'extinguished'}`}
                            onClick={() => blowCandle(idx)}
                          >
                            <div className="candle-wick"></div>
                            <div className="candle-flame"></div>
                            <div className="smoke"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {candles.every(c => c === false) && (
                      <button onClick={relightCandles} className="cute-btn" style={{ marginTop: 35 }}>
                        <RotateCcw size={16} />
                        {lang === 'en' ? 'Relight Candles' : 'மீண்டும் ஏற்றுக 🕯️'}
                      </button>
                    )}
                  </div>
                  <div className="book-footer" style={{ marginTop: 'auto', width: '100%' }}>
                    <span className="page-number">Page 25</span>
                    <span className="page-number">Page 26</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* 4. Birthday Cake Wish Page (Only shown on mobile single slide) */}
        {currentPage === 26 && isMobile && (
          <div className="book page-anim-enter-active">
            <div className="page right-page mobile-single" style={{ justifyContent: 'center' }}>
              <div className="coffee-stain" style={{ bottom: '10%', right: '10%' }}></div>
              
              <h2 className="journal-title" style={{ textAlign: 'center' }}>
                {lang === 'en' ? 'Make a Wish!' : 'ஒரு ஆசையை நினைத்துக் கொள்!'}
              </h2>
              
              <p className="cake-instructions mobile-cake-instructions">
                {candles.every(c => c === false) 
                  ? (lang === 'en' ? "Yay! Happy Birthday! 🎉✨" : "ஹேப்பி பர்த்டே! 🎉✨")
                  : (lang === 'en' ? "Click the candle flames to blow them out and celebrate!" : "மெழுகுவர்த்தி தீபங்களை அணைத்துக் கொண்டாட கிளிக் செய்யவும்!")
                }
              </p>

              <div className="birthday-cake-container">
                <div className="cake">
                  <div className="frosting"></div>
                  <div className="candles-group">
                    {candles.map((lit, idx) => (
                      <div 
                        key={idx} 
                        id={`candle-${idx}`}
                        className={`candle ${lit ? 'lit' : 'extinguished'}`}
                        onClick={() => blowCandle(idx)}
                      >
                        <div className="candle-wick"></div>
                        <div className="candle-flame"></div>
                        <div className="smoke"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {candles.every(c => c === false) && (
                  <button onClick={relightCandles} className="cute-btn" style={{ marginTop: 25 }}>
                    <RotateCcw size={16} />
                    {lang === 'en' ? 'Relight Candles' : 'மீண்டும் ஏற்றுக 🕯️'}
                  </button>
                )}
              </div>

              <div className="book-footer" style={{ width: '100%', marginTop: '1rem' }}>
                <span className="page-number">Page 26</span>
                <span className="page-number" style={{ textAlign: 'right' }}>{lang === 'en' ? 'Make a Wish' : 'ஒரு ஆசையை நினைக்கவும்'}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Swipe guides */}
      {currentPage > 0 && currentPage < (isMobile ? 26 : 25) && (
        <div className="nav-instructions">
          <span>
            {lang === 'en' 
              ? 'Swipe or use Arrow Keys to turn pages' 
              : 'பக்கங்களை திருப்ப ஸ்வைப் செய்யவும் அல்லது அம்பு விசைகளைப் பயன்படுத்தவும்'
            }
          </span>
        </div>
      )}

      {/* Lightbox full screen modal overlay */}
      {lightboxImage && (
        <div 
          className="lightbox-overlay"
          onClick={() => {
            playClickSound()
            setLightboxImage(null)
          }}
        >
          <button 
            className="lightbox-close-btn"
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
              setLightboxImage(null)
            }}
            aria-label="Close Fullscreen"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img 
            src={lightboxImage} 
            alt="Fullscreen memory sketch" 
            className="lightbox-image" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default App
