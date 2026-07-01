import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, HelpCircle, Mail, Sparkles } from 'lucide-react';
import api from '../api/axios';

/* ════════════════════════════════════════════════════════════════
   ANIMATION UTILITIES  (same system as HomePage / ServicesPage / ProductsPage / ContactPage / InfrastructureMachineryPage / DesignEngineeringPage)
   ════════════════════════════════════════════════════════════════ */

function useTypewriter(text, speed = 40) {
  const [typed, setTyped] = useState('');
  const [done, setDone]   = useState(false);
  useEffect(() => {
    setTyped(''); setDone(false);
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++; setTyped(text.slice(0, i));
      if (i >= text.length) { setDone(true); clearInterval(id); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return [typed, done];
}

function Reveal({ children, delay = 0, y = 26, className = '', style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function AnimatedNumber({ value, className = '', style = {} }) {
  const ref     = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!/^\d/.test(String(value))) { setDisplay(value); return; }
    const raw      = String(value).replace(/[^0-9.]/g, '');
    const num      = parseFloat(raw);
    if (isNaN(num)) { setDisplay(value); return; }
    const suffix     = String(value).replace(/^[\d,. ]+/, '');
    const hasComma   = String(value).includes(',');
    const hasDecimal = String(value).replace(suffix, '').includes('.');
    const decimals   = hasDecimal ? (String(value).replace(suffix,'').split('.')[1]?.length ?? 1) : 0;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true; obs.unobserve(el);
        let t0 = null;
        const dur = 1800;
        const tick = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / dur, 1);
          const eased = 1 - (1 - p) ** 3;
          const cur = eased * num;
          const fmt = hasDecimal ? cur.toFixed(decimals) : hasComma ? Math.floor(cur).toLocaleString() : Math.floor(cur).toString();
          setDisplay(fmt + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref} className={className} style={style}>{display}</span>;
}

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;

  const heroText              = 'Frequently Asked Questions';
  const [typedHero, heroDone] = useTypewriter(heroText, 40);

  useEffect(() => {
    let isMounted = true;

    const loadFaqs = async () => {
      try {
        setLoading(true);
        const response = await api.get('/faqs');
        const rawList = response?.data?.faqs;
        const list = Array.isArray(rawList)
          ? rawList.filter((item) => item && item.isActive !== false)
          : [];

        if (isMounted) {
          setFaqs(list);
          setOpenId(list.length ? list[0]._id : null);
          setCurrentPage(1);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError?.response?.data?.message || 'Unable to load FAQs right now.'
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(faqs.length / itemsPerPage));

  const currentFaqs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return faqs.slice(start, start + itemsPerPage);
  }, [faqs, currentPage]);

  useEffect(() => {
    if (!currentFaqs.some((faq) => faq?._id === openId)) {
      setOpenId(currentFaqs[0]?._id || null);
    }
  }, [currentFaqs, openId]);

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
    const nextFaq = faqs[(nextPage - 1) * itemsPerPage];
    setOpenId(nextFaq?._id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">
      {/* HERO */}
      <section className="relative h-[42vh] sm:h-[46vh] md:h-[50vh] min-h-[340px] flex items-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <img
            src="/image.png"
            alt="Electronics support and knowledge center"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/70 to-[#0F172A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        </div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div
            className="max-w-2xl"
            style={{ animation: 'fqHeroIn 0.8s cubic-bezier(0.16,1,0.3,1) both' }}
          >
            <span
              className="inline-block px-3 py-1 bg-[#166b7f] text-[#0F172A] text-xs font-bold uppercase tracking-widest mb-3 md:mb-4"
              style={{ animation: 'fqHeroIn 0.6s 0.05s ease both' }}
            >
              Support Center
            </span>

            {/* Typewriter heading — "Frequently Asked " plain, "Questions" cyan */}
            <h1
              className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-5xl text-white leading-tight mb-3 md:mb-5"
              style={{ minHeight: '1.3em' }}
            >
              {(() => {
                const plain = 'Frequently Asked ';
                if (typedHero.length <= plain.length) {
                  return (
                    <>
                      {typedHero}
                      {!heroDone && <span style={{ display: 'inline-block', width: 3, height: '0.85em', background: '#00dbe7', marginLeft: 4, verticalAlign: 'middle', animation: 'fqCursorBlink 0.75s step-end infinite' }} />}
                    </>
                  );
                }
                return (
                  <>
                    {plain}
                    <span className="text-[#00dbe7]">{typedHero.slice(plain.length)}</span>
                    {!heroDone && <span style={{ display: 'inline-block', width: 3, height: '0.85em', background: '#00dbe7', marginLeft: 4, verticalAlign: 'middle', animation: 'fqCursorBlink 0.75s step-end infinite' }} />}
                  </>
                );
              })()}
            </h1>

            <p
              className="text-white/80 text-sm sm:text-base md:text-lg mb-5 md:mb-8 max-w-lg"
              style={{ opacity: heroDone ? 1 : 0, transform: heroDone ? 'none' : 'translateY(8px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
            >
              Find clear answers about our work, capabilities, processes, and how we support
              customers across electronics manufacturing.
            </p>
            <div
              className="inline-flex items-center gap-2 bg-white text-[#0F172A] px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-['JetBrains_Mono'] font-bold"
              style={{ opacity: heroDone ? 1 : 0, transition: 'opacity 0.5s 0.15s ease' }}
            >
              <HelpCircle size={14} />
              {loading ? 'Loading…' : <><AnimatedNumber value={String(faqs.length)} /> active FAQs</>}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#166b7f]/60 via-[#166b7f]/10 to-transparent" />
      </section>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16 lg:py-20">
        {loading ? (
          <div className="bg-white border border-[#E2E8F0] p-8 md:p-10 text-center text-[#44474d]">
            Loading FAQs…
          </div>
        ) : error ? (
          <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] p-6 text-center">
            {error}
          </div>
        ) : !faqs.length ? (
          <div className="bg-white border border-[#E2E8F0] p-8 md:p-10 text-center text-[#44474d]">
            No FAQs available yet.
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:gap-10">
            {/* FAQ Cards */}
            <div className="w-full">
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {currentFaqs.map((faq, index) => {
                  if (!faq) return null;
                  const key = faq._id || `faq-${index}`;
                  const isOpen = openId === faq._id;

                  return (
                    <Reveal key={key} delay={index * 60}>
                      <article
                        id={`faq-${faq._id || index}`}
                        className="group bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#166b7f] transition-colors duration-300"
                      >
                        <button
                          type="button"
                          className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left"
                          onClick={() => setOpenId(isOpen ? null : faq._id)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${faq._id || index}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-10 h-10 flex items-center justify-center bg-[#eceef0] text-[#0F172A] shrink-0">
                              <Sparkles size={16} className="text-[#00696f]" />
                            </span>
                            <div>
                              <h3 className="font-['JetBrains_Mono'] font-semibold text-base md:text-lg text-[#0F172A] leading-snug">
                                {faq.question || 'Untitled question'}
                              </h3>
                              <p className="text-xs md:text-sm text-[#64748b] mt-1">
                                Click to {isOpen ? 'collapse' : 'expand'} answer
                              </p>
                            </div>
                          </div>

                          <ChevronRight
                            size={18}
                            className={`shrink-0 text-[#00696f] transition-transform duration-300 ${
                              isOpen ? 'rotate-90' : ''
                            }`}
                          />
                        </button>

                        <div
                          id={`faq-panel-${faq._id || index}`}
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="px-4 md:px-5 pb-4 md:pb-5 pl-16 md:pl-[4.75rem]">
                            <p className="text-sm md:text-base text-[#44474d] leading-relaxed border-l-2 border-[#166b7f] pl-4">
                              {faq.answer || 'No answer provided.'}
                            </p>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>

              {/* PAGINATION */}
              {faqs.length > itemsPerPage && (
                <Reveal delay={120}>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#E2E8F0] px-4 py-4 md:px-5">
                    <p className="text-sm text-[#64748b]">
                      Showing {(currentPage - 1) * itemsPerPage + 1}–
                      {Math.min(currentPage * itemsPerPage, faqs.length)} of {faqs.length}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-[#E2E8F0] bg-[#f7f9fb] text-[#0F172A] disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#166b7f] transition-colors"
                      >
                        <ChevronLeft size={16} />
                        Prev
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => goToPage(page)}
                            className={`min-w-10 h-10 px-3 text-sm border transition-colors ${
                              currentPage === page
                                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#166b7f]'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-[#E2E8F0] bg-[#f7f9fb] text-[#0F172A] disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#166b7f] transition-colors"
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fqHeroIn     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fqCursorBlink{ 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}