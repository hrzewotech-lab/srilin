import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import api from '../api/axios';

/* ─── Fallback slides ─────────────────────────────────────── */
const fallbackSlides = [
  {
    _id: 'fallback-hero-1',
    title: 'Precision Electronics Manufacturing',
    description: 'Certified electronics design and manufacturing support for prototype, SMT assembly, testing, and box build programs.',
    image: { url: '/header1.webp' },
    tag: 'AS9100D Certified EMS',
  },
  {
    _id: 'fallback-hero-2',
    title: 'High-Reliability EMS for Demanding Products',
    description: 'Aerospace-aware quality systems, ESD controls, and disciplined inspection workflows from Hyderabad.',
    image: { url: '/header2-2.webp' },
    tag: 'ISO 9001:2015 Certified',
  },
  {
    _id: 'fallback-hero-3',
    title: 'From Embedded Design to Final Integration',
    description: 'A practical one-stop manufacturing partner for teams scaling complex electronic products with confidence.',
    image: { url: '/header3-2.webp' },
    tag: 'ANSI ESD S20.20 2021',
  },
];

const heroStats = [
  { value: '98%',     label: 'On-time delivery' },
  { value: '75+',     label: 'Global customers' },
  { value: '12 days', label: 'Prototype cycle' },
];

export default function HeroCarousel() {
  /* ── original state & data fetching — unchanged ── */
  const [slides, setSlides]         = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const res          = await api.get('/hero');
        const activeSlides = (res.data.slides || []).filter((slide) => slide.image?.url);
        setSlides(activeSlides.length ? activeSlides : fallbackSlides);
      } catch (error) {
        console.error('Failed to load hero slides', error);
        setSlides(fallbackSlides);
      }
    };
    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length < 2 || isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length, isPaused]);

  const activeSlide = slides[activeIndex] || slides[0];
  const slideLabel  = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;

  return (
    <section
      aria-label="Featured images"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="relative w-full overflow-hidden font-mono"
      style={{ aspectRatio: '16 / 9', minHeight: 480, maxHeight: '90vh', width: '100%' }}
    >
      {/* ── Slide images ── */}
      <div aria-live="polite">
        {slides.map((slide, index) => (
          <img
            key={slide._id || index}
            src={slide.image?.url}
            alt={slide.title || `Featured image ${index + 1}`}
            loading="lazy"
            decoding="async"
            aria-hidden={index !== activeIndex}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              zIndex: index === activeIndex ? 1 : 0,
              filter: 'brightness(0.38)',
              transform: index === activeIndex ? 'scale(1.04)' : 'scale(1)',
              objectPosition: 'center center',
            }}
          />
        ))}
      </div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2,
        background: 'linear-gradient(110deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.60) 50%, rgba(15,23,42,0.20) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2, height: 220,
        background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.4) 60%, transparent 100%)' }} />

      {/* ── Tech grid ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3,
        backgroundImage: 'linear-gradient(rgba(22,107,127,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(22,107,127,0.025) 1px,transparent 1px)',
        backgroundSize: '64px 64px' }} />

      {/* ── Slide content ── */}
      <div className="relative flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pb-20 sm:pb-24" style={{ zIndex: 10 }}>
        <div key={activeSlide?._id || activeIndex} style={{ animation: 'heroSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) both', maxWidth: 660 }}>

          {/* Cert badge */}
          <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{ color: '#166b7f', border: '1px solid rgba(22,107,127,0.35)', background: 'rgba(22,107,127,0.1)' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#166b7f', animation: 'pulse 2s ease infinite' }} />
            <ShieldCheck size={11} />
            {activeSlide?.tag || 'AS9100D Certified EMS'}
          </span>

          {/* Title */}
          <h1 className="text-white font-bold leading-[1.1] mb-5 font-['JetBrains_Mono']"
            style={{ fontFamily: 'Courier New, Courier, monospace', fontSize: 'clamp(1.8rem, 5.5vw, 3.75rem)', textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}>
            {activeSlide?.title || 'Precision Electronics Manufacturing'}
          </h1>

          {/* Description */}
          <p className="leading-relaxed mb-8" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', color: 'rgba(203,213,225,0.85)', maxWidth: 520 }}>
            {activeSlide?.description || ''}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href="/contact-us"
              className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 transition-all duration-200 hover:opacity-90 hover:gap-3"
              style={{ background: '#166b7f', color: '#F8FAFC' }}>
              Start a Project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 text-white transition-colors hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.22)' }}>
              Explore Services
            </a>
          </div>
        </div>
      </div>

      {/* ── Right side stats panel (xl screens only) ── */}
      <div className="hidden xl:flex flex-col gap-2 absolute right-10 bottom-20" style={{ zIndex: 10 }}>
        {heroStats.map(({ value, label }) => (
          <div key={label} className="flex items-center gap-4 px-5 py-3 border border-white/10"
            style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)' }}>
            <strong className="font-['JetBrains_Mono'] font-bold text-xl text-white leading-none">{value}</strong>
            <span className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ zIndex: 10, background: 'rgba(255,255,255,0.08)' }}>
        <div key={`progress-${activeIndex}`} className="h-full"
          style={{ background: '#166b7f', animation: isPaused ? 'none' : 'progressFill 5s linear forwards' }} />
      </div>

      {/* ── Slide counter ── */}
      {slides.length > 0 && (
        <div className="absolute right-4 sm:right-10 bottom-8 font-['JetBrains_Mono'] text-xs"
          style={{ zIndex: 10, color: 'rgba(255,255,255,0.4)' }}>
          {slideLabel}
        </div>
      )}

      {/* ── Prev / Next buttons ── */}
      {slides.length > 1 && (
        <>
          <button type="button" onClick={() => setActiveIndex((p) => (p - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 border border-white/20 text-white hover:border-[#166b7f] hover:text-[#166b7f] transition-all duration-200"
            style={{ zIndex: 10 }}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" onClick={() => setActiveIndex((p) => (p + 1) % slides.length)}
            aria-label="Next slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 border border-white/20 text-white hover:border-[#166b7f] hover:text-[#166b7f] transition-all duration-200"
            style={{ zIndex: 10 }}>
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* ── Dot indicators ── */}
      {slides.length > 1 && (
        <div className="absolute left-4 sm:left-12 bottom-6 flex gap-2 items-center" style={{ zIndex: 10 }}
          aria-label="Choose a slide">
          {slides.map((slide, index) => (
            <button key={slide._id || index} type="button" onClick={() => setActiveIndex(index)}
              aria-label={`Show slide ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined}
              style={{
                width: index === activeIndex ? 32 : 8,
                height: 4,
                background: index === activeIndex ? '#166b7f' : 'rgba(255,255,255,0.25)',
                borderRadius: 2,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              }} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes heroSlideUp  { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes progressFill { from { width:0%; } to { width:100%; } }
      `}</style>
    </section>
  );
}
