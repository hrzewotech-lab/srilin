import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, HelpCircle, Mail, Sparkles } from 'lucide-react';
import api from '../api/axios';

/* ════════════════════════════════════════════════════════════════
   ANIMATION UTILITIES
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
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function AnimatedNumber({ value }) {
  const ref     = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    started.current = false;
    const el = ref.current;
    if (!el) return;
    if (!/^\d/.test(String(value))) { setDisplay(value); return; }
    const num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setDisplay(value); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true; obs.unobserve(el);
        let t0 = null;
        const tick = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 1800, 1);
          setDisplay(String(Math.floor((1 - (1 - p) ** 3) * num)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{display}</span>;
}

/* ── Single FAQ accordion row ────────────────────────────────── */
function FaqItem({ faq, openId, setOpenId, index, showCategory = false }) {
  if (!faq) return null;
  const isOpen = openId === faq._id;
  return (
    <Reveal delay={index * 40}>
      <article
        id={`faq-${faq._id || index}`}
        className="group bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#c29f5d] transition-colors duration-300"
      >
        <button
          type="button"
          className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left"
          onClick={() => setOpenId(isOpen ? null : faq._id)}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${faq._id || index}`}
        >
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 flex items-center justify-center bg-[#eceef0] shrink-0 mt-0.5">
              <Sparkles size={15} className="text-[#9a7a3e]" />
            </span>
            <div>
              <h3 className="font-['JetBrains_Mono'] font-semibold text-sm md:text-base text-[#0F172A] leading-snug">
                {faq.question || 'Untitled question'}
              </h3>
              {showCategory && faq.category && faq.category !== 'General' && (
                <span className="inline-block mt-1 text-[11px] font-['JetBrains_Mono'] font-semibold text-[#9a7a3e] uppercase tracking-wide">
                  {faq.category}
                </span>
              )}
            </div>
          </div>
          <ChevronRight
            size={17}
            className={`shrink-0 text-[#9a7a3e] transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          />
        </button>

        <div
          id={`faq-panel-${faq._id || index}`}
          className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-4 md:px-5 pb-4 md:pb-5 pl-14 md:pl-[3.75rem]">
            <p className="text-sm md:text-base text-[#44474d] leading-relaxed border-l-2 border-[#c29f5d] pl-4">
              {faq.answer || 'No answer provided.'}
            </p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function FaqsPage() {
  const [faqs, setFaqs]             = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [openId, setOpenId]         = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const heroText              = 'Frequently Asked Questions';
  const [typedHero, heroDone] = useTypewriter(heroText, 40);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const [faqRes, catRes] = await Promise.all([
          api.get('/faqs'),
          api.get('/faqs/categories'),
        ]);
        const list = Array.isArray(faqRes?.data?.faqs)
          ? faqRes.data.faqs.filter((item) => item && item.isActive !== false)
          : [];
        const cats = catRes?.data?.categories || [];
        if (isMounted) {
          setFaqs(list);
          setCategories(cats.filter((c) => list.some((f) => f.category === c)));
          setOpenId(list[0]?._id || null);
        }
      } catch (err) {
        if (isMounted) setError(err?.response?.data?.message || 'Unable to load FAQs right now.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  /* Desktop: filtered list based on sidebar selection */
  const desktopFaqs = useMemo(() => {
    if (activeCategory === 'All') return faqs;
    return faqs.filter((f) => f.category === activeCategory);
  }, [faqs, activeCategory]);

  /* Mobile: group all faqs by category */
  const mobileGroups = useMemo(() => {
    const groups = [];
    // Push categories in order
    for (const cat of categories) {
      const items = faqs.filter((f) => f.category === cat);
      if (items.length) groups.push({ cat, items });
    }
    // Uncategorised / General fallback
    const uncategorised = faqs.filter(
      (f) => !f.category || f.category === 'General' || !categories.includes(f.category)
    );
    if (uncategorised.length) groups.push({ cat: 'General', items: uncategorised });
    return groups;
  }, [faqs, categories]);

  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative h-[42vh] sm:h-[46vh] md:h-[50vh] min-h-[340px] flex items-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <img
            src="/image.png"
            alt="Electronics support and knowledge center"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/70 to-[#0F172A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl" style={{ animation: 'fqHeroIn 0.8s cubic-bezier(0.16,1,0.3,1) both' }}>
            <span className="inline-block px-3 py-1 bg-[#c29f5d] text-[#0F172A] text-xs font-bold uppercase tracking-widest mb-3 md:mb-4"
              style={{ animation: 'fqHeroIn 0.6s 0.05s ease both' }}>
              Support Center
            </span>

            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-5xl text-white leading-tight mb-3 md:mb-5"
              style={{ minHeight: '1.3em' }}>
              {(() => {
                const plain = 'Frequently Asked ';
                if (typedHero.length <= plain.length) {
                  return (
                    <>
                      {typedHero}
                      {!heroDone && <span style={{ display: 'inline-block', width: 3, height: '0.85em', background: '#f0c27b', marginLeft: 4, verticalAlign: 'middle', animation: 'fqCursorBlink 0.75s step-end infinite' }} />}
                    </>
                  );
                }
                return (
                  <>
                    {plain}
                    <span className="text-[#f0c27b]">{typedHero.slice(plain.length)}</span>
                    {!heroDone && <span style={{ display: 'inline-block', width: 3, height: '0.85em', background: '#f0c27b', marginLeft: 4, verticalAlign: 'middle', animation: 'fqCursorBlink 0.75s step-end infinite' }} />}
                  </>
                );
              })()}
            </h1>

            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-5 md:mb-8 max-w-lg"
              style={{ opacity: heroDone ? 1 : 0, transform: heroDone ? 'none' : 'translateY(8px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
              Find clear answers about our work, capabilities, processes, and how we support
              customers across electronics manufacturing.
            </p>

            <div className="inline-flex items-center gap-2 bg-white text-[#0F172A] px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-['JetBrains_Mono'] font-bold"
              style={{ opacity: heroDone ? 1 : 0, transition: 'opacity 0.5s 0.2s ease' }}>
              <HelpCircle size={14} />
              {loading ? 'Loading…' : <><AnimatedNumber value={String(faqs.length)} /> active FAQs</>}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#c29f5d]/60 via-[#c29f5d]/10 to-transparent" />
      </section>

      {/* ══ MAIN CONTENT ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16 lg:py-20">

        {loading ? (
          <Reveal>
            <div className="bg-white border border-[#E2E8F0] p-8 text-center text-[#44474d]">Loading FAQs…</div>
          </Reveal>
        ) : error ? (
          <Reveal>
            <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] p-6 text-center">{error}</div>
          </Reveal>
        ) : !faqs.length ? (
          <Reveal>
            <div className="bg-white border border-[#E2E8F0] p-8 text-center text-[#44474d]">No FAQs available yet.</div>
          </Reveal>
        ) : (
          <>
            {/* ══════════════════════════════════════════════════════
                MOBILE LAYOUT  (< lg)
                Category as heading, questions stacked below each
                ══════════════════════════════════════════════════════ */}
            <div className="lg:hidden space-y-10">
              {mobileGroups.map(({ cat, items }) => (
                <Reveal key={cat}>
                  <section>
                    {/* Category heading */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="h-0.5 w-6 bg-[#c29f5d]" />
                      <h2 className="font-['JetBrains_Mono'] font-bold text-sm uppercase tracking-widest text-[#9a7a3e]">
                        {cat}
                      </h2>
                      <span className="ml-auto text-xs font-['JetBrains_Mono'] font-bold bg-[#eceef0] text-[#64748b] px-2 py-0.5 rounded-full">
                        {items.length}
                      </span>
                    </div>

                    {/* Questions under this category */}
                    <div className="space-y-3">
                      {items.map((faq, idx) => (
                        <FaqItem
                          key={faq._id || idx}
                          faq={faq}
                          openId={openId}
                          setOpenId={setOpenId}
                          index={idx}
                        />
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}

              {/* Mobile CTA */}
              <Reveal>
                <div className="p-5 bg-[#0F172A] text-white">
                  <h4 className="font-['JetBrains_Mono'] font-semibold text-base mb-2">Still have questions?</h4>
                  <p className="text-xs text-white/70 mb-4">
                    Our engineering team is available to help with specific technical queries.
                  </p>
                  <Link
                    to="/contact-us"
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#f0c27b] text-[#f0c27b] text-xs font-['JetBrains_Mono'] font-semibold hover:bg-[#f0c27b] hover:text-[#0F172A] transition-all"
                  >
                    <Mail size={14} /> Contact Engineering
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ══════════════════════════════════════════════════════
                DESKTOP LAYOUT  (≥ lg)
                Sticky sidebar + filtered accordion panel
                ══════════════════════════════════════════════════════ */}
            <div className="hidden lg:flex gap-10 items-start">

              {/* ── Sidebar ─────────────────────────────────────── */}
              <aside className="w-64 xl:w-72 shrink-0 sticky top-28 self-start">
                <h3 className="font-['JetBrains_Mono'] text-xs text-[#334155] uppercase tracking-widest mb-3">
                  Browse by Category
                </h3>

                <div className="flex flex-col gap-0.5">
                  {/* All */}
                  <button
                    type="button"
                    onClick={() => { setActiveCategory('All'); setOpenId(faqs[0]?._id || null); }}
                    className={`group flex items-center justify-between gap-2 px-4 py-3 border-l-4 w-full font-['JetBrains_Mono'] text-xs transition-all text-left ${
                      activeCategory === 'All'
                        ? 'bg-white border-[#9a7a3e] text-[#9a7a3e]'
                        : 'bg-transparent border-transparent text-[#334155] hover:border-[#9a7a3e]/40 hover:bg-[#eceef0]'
                    }`}
                  >
                    <span>All FAQs</span>
                    <span className="shrink-0 text-[10px] font-bold bg-[#eceef0] text-[#64748b] px-1.5 py-0.5 rounded-full">
                      {faqs.length}
                    </span>
                  </button>

                  {/* Category items */}
                  {categories.map((cat) => {
                    const count = faqs.filter((f) => f.category === cat).length;
                    if (!count) return null;
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat);
                          setOpenId(faqs.find((f) => f.category === cat)?._id || null);
                        }}
                        className={`group flex items-center justify-between gap-2 px-4 py-3 border-l-4 w-full font-['JetBrains_Mono'] text-xs transition-all text-left ${
                          isActive
                            ? 'bg-white border-[#9a7a3e] text-[#9a7a3e]'
                            : 'bg-transparent border-transparent text-[#334155] hover:border-[#9a7a3e]/40 hover:bg-[#eceef0]'
                        }`}
                      >
                        <span className="leading-snug">{cat}</span>
                        <span className="shrink-0 text-[10px] font-bold bg-[#eceef0] text-[#64748b] px-1.5 py-0.5 rounded-full">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="mt-8 p-5 bg-[#0F172A] text-white">
                  <h4 className="font-['JetBrains_Mono'] font-semibold text-base mb-2">Still have questions?</h4>
                  <p className="text-xs text-white/70 mb-4">
                    Our engineering team is available to help with specific technical queries.
                  </p>
                  <Link
                    to="/contact-us"
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#f0c27b] text-[#f0c27b] text-xs font-['JetBrains_Mono'] font-semibold hover:bg-[#f0c27b] hover:text-[#0F172A] transition-all"
                  >
                    <Mail size={14} /> Contact Engineering
                  </Link>
                </div>
              </aside>

              {/* ── FAQ Panel ───────────────────────────────────── */}
              <div className="flex-1 min-w-0">
                {/* Section heading when filtered */}
                {activeCategory !== 'All' && (
                  <Reveal>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E2E8F0]">
                      <span className="h-0.5 w-6 bg-[#c29f5d]" />
                      <h2 className="font-['JetBrains_Mono'] font-bold text-sm uppercase tracking-widest text-[#9a7a3e]">
                        {activeCategory}
                      </h2>
                      <span className="ml-2 text-xs text-[#64748b]">
                        — {desktopFaqs.length} question{desktopFaqs.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </Reveal>
                )}

                {desktopFaqs.length === 0 ? (
                  <Reveal>
                    <div className="bg-white border border-[#E2E8F0] p-8 text-center text-[#44474d]">
                      No FAQs in this category yet.
                    </div>
                  </Reveal>
                ) : (
                  <div className="flex flex-col gap-4">
                    {desktopFaqs.map((faq, index) => (
                      <FaqItem
                        key={faq._id || index}
                        faq={faq}
                        openId={openId}
                        setOpenId={setOpenId}
                        index={index}
                        showCategory={activeCategory === 'All'}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fqHeroIn      { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fqCursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}