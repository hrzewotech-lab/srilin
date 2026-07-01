import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Award } from 'lucide-react';
import api from '../api/axios';

/* ── Fallback shown when API returns nothing (sandbox / graceful degradation) ── */
const fallbackCertificates = [
  { _id: 'fc-1', name: 'AS9100D',              subtitle: 'Aerospace Quality Management',   image: { url: null } },
  { _id: 'fc-2', name: 'ISO 9001:2015',         subtitle: 'Quality Management System',       image: { url: null } },
  { _id: 'fc-3', name: 'ANSI ESD S20.20 2021',  subtitle: 'Electrostatic Discharge Control', image: { url: null } },
  { _id: 'fc-4', name: 'IEC 61340 5.1',         subtitle: 'ESD Protection Specification',    image: { url: null } },
];

export default function CertificateCarousel() {
  const [certificates, setCertificates] = useState([]);
  const [activeIndex, setActiveIndex]   = useState(0);
  const [isPaused, setIsPaused]         = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadCertificates = async () => {
      try {
        const response = await api.get('/certificates');
        if (isMounted) {
          const loaded = (response.data.certificates || []).filter((c) => c.image?.url);
          setCertificates(loaded.length ? loaded : fallbackCertificates);
        }
      } catch {
        if (isMounted) setCertificates(fallbackCertificates);
      }
    };
    loadCertificates();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (certificates.length < 2 || isPaused) return undefined;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % certificates.length);
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [activeIndex, certificates.length, isPaused]);

  if (!certificates.length) return null;

  const showPrevious = () => setActiveIndex((c) => (c - 1 + certificates.length) % certificates.length);
  const showNext     = () => setActiveIndex((c) => (c + 1) % certificates.length);

  const cert = certificates[activeIndex];

  return (
    <section
      className="relative bg-[#0F172A] py-16 md:py-24 overflow-hidden"
      aria-label="Quality certifications"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(0,241,254,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,241,254,0.03) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(0,241,254,0.06) 0%,transparent 70%)', filter: 'blur(40px)' }} />
      {/* Ghost section label */}
      <span className="absolute -top-4 right-0 select-none pointer-events-none font-['JetBrains_Mono'] font-bold text-white opacity-[0.025]"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>08</span>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00f1fe' }}>Quality Certifications</span>
              <span className="flex-1 h-px max-w-[60px]" style={{ background: 'rgba(0,241,254,0.2)' }} />
            </div>
            <h2 className="font-['JetBrains_Mono'] font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', maxWidth: 480 }}>
              Recognized standards behind dependable manufacturing.
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 440 }}>
              Certifications that support our commitment to consistent quality and production discipline.
            </p>
          </div>

          {/* Cert count badge */}
          <div className="shrink-0 border border-white/10 bg-white/5 px-5 py-4 flex items-center gap-3 self-start sm:self-auto">
            <Award size={20} style={{ color: '#00f1fe' }} />
            <div>
              <strong className="block font-['JetBrains_Mono'] text-white font-bold text-lg leading-none">
                {certificates.length}
              </strong>
              <span className="text-xs mt-0.5 block" style={{ color: 'rgba(255,255,255,0.45)' }}>Active certifications</span>
            </div>
          </div>
        </div>

        {/* Main carousel area */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-stretch">

          {/* Certificate card */}
          <div className="flex-1 relative" aria-live="polite">
            <div
              key={cert._id || activeIndex}
              className="border border-white/10 bg-white/5 overflow-hidden"
              style={{ animation: 'certFadeIn 0.5s ease both', minHeight: 300 }}
            >
              {cert.image?.url ? (
                /* Has image — show it */
                <div className="relative h-56 sm:h-72 lg:h-80 bg-[#0a1121]">
                  <img
                    src={cert.image.url}
                    alt={cert.name}
                    className="w-full h-full object-contain p-6"
                    style={{ filter: 'drop-shadow(0 0 24px rgba(0,241,254,0.08))' }}
                  />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top,rgba(15,23,42,0.6) 0%,transparent 50%)' }} />
                </div>
              ) : (
                /* No image — show premium cert card */
                <div className="relative flex flex-col items-center justify-center px-8 py-14 sm:py-20 text-center"
                  style={{ background: 'linear-gradient(135deg,rgba(0,241,254,0.04) 0%,rgba(0,105,111,0.06) 100%)' }}>
                  {/* Decorative border corners */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t border-l" style={{ borderColor: 'rgba(0,241,254,0.3)' }} />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r" style={{ borderColor: 'rgba(0,241,254,0.3)' }} />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l" style={{ borderColor: 'rgba(0,241,254,0.3)' }} />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r" style={{ borderColor: 'rgba(0,241,254,0.3)' }} />

                  <div className="inline-flex h-16 w-16 items-center justify-center border border-[#00f1fe]/30 bg-[#00f1fe]/5 mb-5">
                    <ShieldCheck size={32} style={{ color: '#00f1fe' }} />
                  </div>
                  <strong className="font-['JetBrains_Mono'] font-bold text-white block leading-tight"
                    style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2rem)' }}>
                    {cert.name}
                  </strong>
                  {cert.subtitle && (
                    <span className="mt-2 block text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{cert.subtitle}</span>
                  )}
                  <div className="mt-5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider font-['JetBrains_Mono']"
                    style={{ color: '#00f1fe', border: '1px solid rgba(0,241,254,0.25)', background: 'rgba(0,241,254,0.06)' }}>
                    Certified
                  </div>
                </div>
              )}

              {/* Bottom label bar (always shown) */}
              <div className="flex items-center gap-3 px-5 py-4 border-t border-white/10">
                <ShieldCheck size={15} style={{ color: '#00f1fe', flexShrink: 0 }} />
                <span className="font-['JetBrains_Mono'] font-semibold text-white text-sm leading-snug">{cert.name}</span>
                <span className="ml-auto font-['JetBrains_Mono'] text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Right panel — cert list / thumbnails */}
          <div className="lg:w-56 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {certificates.map((c, index) => (
              <button
                key={c._id || index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show certificate ${index + 1}: ${c.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className="flex-shrink-0 lg:flex-shrink text-left flex items-center gap-3 px-4 py-3 border transition-all duration-200"
                style={{
                  background: index === activeIndex ? 'rgba(0,241,254,0.08)' : 'rgba(255,255,255,0.03)',
                  borderColor: index === activeIndex ? 'rgba(0,241,254,0.4)' : 'rgba(255,255,255,0.08)',
                  minWidth: 160,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors"
                  style={{ background: index === activeIndex ? '#00f1fe' : 'rgba(255,255,255,0.2)' }} />
                <span className="font-['JetBrains_Mono'] text-xs leading-snug font-medium"
                  style={{ color: index === activeIndex ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-px bg-white/5">
          <div key={`cert-progress-${activeIndex}`} className="h-full"
            style={{
              background: '#00f1fe',
              animation: isPaused ? 'none' : 'certProgress 4.5s linear forwards',
            }} />
        </div>

        {/* Navigation */}
        {certificates.length > 1 && (
          <div className="flex items-center gap-4 mt-5">
            <button type="button" onClick={showPrevious} aria-label="Previous certificate"
              className="inline-flex items-center justify-center w-9 h-9 border border-white/15 text-white hover:border-[#00f1fe] hover:text-[#00f1fe] transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2" aria-label="Choose a certificate">
              {certificates.map((c, index) => (
                <button key={c._id || index} type="button" onClick={() => setActiveIndex(index)}
                  aria-label={`Certificate ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined}
                  style={{
                    width: index === activeIndex ? 24 : 7,
                    height: 4,
                    background: index === activeIndex ? '#00f1fe' : 'rgba(255,255,255,0.2)',
                    borderRadius: 2,
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }} />
              ))}
            </div>
            <button type="button" onClick={showNext} aria-label="Next certificate"
              className="inline-flex items-center justify-center w-9 h-9 border border-white/15 text-white hover:border-[#00f1fe] hover:text-[#00f1fe] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes certFadeIn   { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes certProgress { from { width:0%; } to { width:100%; } }
      `}</style>
    </section>
  );
}
