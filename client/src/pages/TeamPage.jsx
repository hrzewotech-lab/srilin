import { useEffect, useMemo, useRef, useState } from 'react';
import { Award, BriefcaseBusiness, CheckCircle2, Factory, ShieldCheck, Users, X } from 'lucide-react';
import api from '../api/axios';

/* ════════════════════════════════════════════════════════════════
   ANIMATION UTILITIES  (same system as HomePage / AboutPage / ServicesPage)
   ════════════════════════════════════════════════════════════════ */

/** Types out text one character at a time. Returns [displayedText, isDone]. */
function useTypewriter(text, speed = 40) {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setTyped('');
    setDone(false);
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) { setDone(true); clearInterval(id); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return [typed, done];
}

/** Scroll-reveal wrapper — fades + slides up on entering viewport. */
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Counts a numeric string up from zero when scrolled into view. */
function AnimatedNumber({ value, className = '', style = {} }) {
  const ref = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!/^\d/.test(String(value))) { setDisplay(value); return; }
    if (String(value).includes('/')) { setDisplay(value); return; }

    const raw = String(value).replace(/[^0-9.]/g, '');
    const num = parseFloat(raw);
    if (isNaN(num)) { setDisplay(value); return; }

    const suffix = String(value).replace(/^[\d,. ]+/, '');
    const hasComma = String(value).includes(',');
    const hasDecimal = String(value).replace(suffix, '').includes('.');
    const decimals = hasDecimal ? (String(value).replace(suffix, '').split('.')[1]?.length ?? 1) : 0;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        obs.unobserve(el);
        let t0 = null;
        const dur = 1800;
        const tick = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / dur, 1);
          const eased = 1 - (1 - p) ** 3;
          const cur = eased * num;
          const fmt = hasDecimal ? cur.toFixed(decimals)
            : hasComma ? Math.floor(cur).toLocaleString()
            : Math.floor(cur).toString();
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

/** Full-detail popup shown when a member card is clicked. */
function MemberModal({ member, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ animation: 'modalOverlayIn 0.25s ease both' }}
    >
      <div className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={member.name}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl"
        style={{ animation: 'modalPanelIn 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0F172A] shadow-md hover:bg-[#ecfeff] hover:text-[#0F766E] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="h-56 sm:h-64 w-full overflow-hidden bg-[#eceef0]">
          <div className="flex h-full w-full items-center justify-center p-3 sm:p-4">
            <img src={member.image?.url} alt={member.name} className="h-full w-full object-contain" />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {member.designation ? (
            <p className="text-xs uppercase tracking-[0.26em] text-[#94A3B8] mb-2">
              {member.designation}
            </p>
          ) : null}
          <h2 className="font-['JetBrains_Mono'] text-2xl sm:text-3xl text-[#0F172A] mb-4">
            {member.name}
          </h2>
          {member.message ? (
            <p className="text-[#475569] leading-relaxed mb-5 whitespace-pre-line">
              {member.message}
            </p>
          ) : null}
          {member.honors?.length ? (
            <div className="pt-4 border-t border-[#E2E8F0]">
              <p className="text-xs uppercase tracking-[0.26em] text-[#94A3B8] mb-3">Honors</p>
              <ul className="grid gap-2 text-sm text-[#475569]">
                {member.honors.map((honor) => (
                  <li key={honor} className="flex items-start gap-2">
                    <Award size={16} className="text-[#0F766E] mt-0.5 shrink-0" aria-hidden="true" />
                    {honor}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const leadershipPillars = [
  {
    icon: Factory,
    title: 'Manufacturing Focus',
    text: 'Production-aware decisions shaped around repeatable electronics builds.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Discipline',
    text: 'Inspection, validation, and documentation kept visible across delivery.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Customer Ownership',
    text: 'Clear communication from requirement review through execution.',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadTeam = async () => {
      try {
        const response = await api.get('/team');
        if (isMounted) {
          setMembers(
            (response.data.members || []).filter(
              (member) => member.isActive !== false && member.image?.url
            )
          );
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError?.response?.data?.message || 'Unable to load the team right now.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  const { chairman, remainingFeatured, leadershipMembers } = useMemo(() => {
    const orderOne = members.find((member) => Number(member.order) === 1);
    const fallbackFeatured = members.filter((member) => member.isFeatured);
    const defaultChairman = fallbackFeatured.length ? fallbackFeatured[0] : members[0];
    const chair = orderOne || defaultChairman;
    const remaining = members.filter(
      (member) => member.isFeatured && member._id !== chair?._id
    );
    const leadership = members.filter((member) => member._id !== chair?._id);

    return {
      chairman: chair,
      remainingFeatured: remaining,
      leadershipMembers: leadership,
    };
  }, [members]);

  const stats = useMemo(
    () => ({
      total: members.length,
      active: members.filter((member) => member.isActive).length,
      featured: members.filter((member) => member.isFeatured).length,
    }),
    [members]
  );

  /* Typewriter for the hero h1 — plain text only (no JSX span inside) */
  const heroText = 'Leadership That Builds Trust';
  const [typedHero, heroDone] = useTypewriter(heroText, 45);

  return (
    <section className="bg-[#f7f9fb] font-['Inter']">
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#0F172A] min-h-[340px] sm:min-h-[380px] md:min-h-[420px] flex items-center">
        <img
          src="/about-us2.png"
          alt="SriLin team and manufacturing leadership"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F172A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-0">
          <div
            className="max-w-2xl border-l-2 border-[#c29f5d] pl-5 md:pl-6"
            style={{ animation: 'teamHeroIn 0.8s cubic-bezier(0.16,1,0.3,1) both' }}
          >
            <p
              className="text-[#c29f5d] text-xs font-semibold uppercase tracking-widest mb-3 md:mb-4"
              style={{ animation: 'teamHeroIn 0.6s 0.05s ease both' }}
            >
              Our People
            </p>

            {/* Typewriter heading */}
            <h1
              className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4"
              style={{ minHeight: '1.15em' }}
            >
              {typedHero}
              {!heroDone && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 3,
                    height: '0.85em',
                    background: '#f0c27b',
                    marginLeft: 4,
                    verticalAlign: 'middle',
                    animation: 'cursorBlink 0.75s step-end infinite',
                  }}
                />
              )}
            </h1>

            <p
              className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg"
              style={{
                opacity: heroDone ? 1 : 0,
                transform: heroDone ? 'none' : 'translateY(8px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              Meet the people guiding SriLin Electronics through dependable production,
              disciplined quality workflows, and customer-focused delivery.
            </p>

            <div
              className="flex flex-wrap gap-2.5 sm:gap-3"
              style={{ opacity: heroDone ? 1 : 0, transition: 'opacity 0.5s 0.2s ease' }}
            >
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#c29f5d]/30 text-[#ffe8cc] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <Users size={13} />
                {loading ? 'Loading…' : (
                  <><AnimatedNumber value={String(stats.total)} /> team profiles</>
                )}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#c29f5d]/30 text-[#ffe8cc] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <ShieldCheck size={13} />
                {loading ? 'Loading…' : (
                  <><AnimatedNumber value={String(stats.featured)} /> featured leaders</>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#c29f5d]/60 via-[#c29f5d]/10 to-transparent" />
      </section>

      {/* ══ MAIN LAYOUT ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-8 items-start mb-12">
          <Reveal>
            <div>
              <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A] border-l-4 border-[#c29f5d] pl-4">
                About our leadership
              </h2>
              <p className="text-[#44474d] mt-4 leading-relaxed">
                SriLin is led by engineers and operators who understand both product design and scalable manufacturing. Our team bridges the gap between concept, quality, and delivery.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {leadershipPillars.map(({ icon: Icon, title, text }, i) => (
                  <Reveal key={title} delay={i * 80}>
                    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm hover:border-[#c29f5d] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ecfeff] text-[#0F766E]">
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold text-base text-[#0F172A] mb-2">{title}</h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">{text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <aside className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">
                Team snapshot
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#f7f9fb] p-4 text-center">
                  <p className="text-3xl font-['JetBrains_Mono'] text-[#0F172A]">
                    <AnimatedNumber value={String(stats.total)} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#94A3B8] mt-2">Total profiles</p>
                </div>
                <div className="rounded-2xl bg-[#f7f9fb] p-4 text-center">
                  <p className="text-3xl font-['JetBrains_Mono'] text-[#0F172A]">
                    <AnimatedNumber value={String(stats.active)} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#94A3B8] mt-2">Active team</p>
                </div>
                <div className="rounded-2xl bg-[#f7f9fb] p-4 text-center">
                  <p className="text-3xl font-['JetBrains_Mono'] text-[#0F172A]">
                    <AnimatedNumber value={String(stats.featured)} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#94A3B8] mt-2">Featured leaders</p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>

        {loading ? (
          <Reveal>
            <div className="bg-white border border-[#E2E8F0] p-10 text-center text-[#44474d] rounded-3xl">
              Loading team profiles...
            </div>
          </Reveal>
        ) : error ? (
          <Reveal>
            <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] p-10 text-center rounded-3xl">
              {error}
            </div>
          </Reveal>
        ) : !members.length ? (
          <Reveal>
            <div className="bg-white border border-[#E2E8F0] p-10 text-center text-[#44474d] rounded-3xl">
              No team profiles are available yet.
            </div>
          </Reveal>
        ) : (
          <>
            {chairman ? (
              <Reveal>
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedMember(chairman)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedMember(chairman); } }}
                  className="cursor-pointer rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-sm mb-10 hover:border-[#c29f5d] hover:shadow-lg transition-all duration-300"
                >
                  <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div className="rounded-3xl overflow-hidden bg-[#eceef0]">
                      <img src={chairman.image.url} alt={chairman.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-[#94A3B8] mb-3">Chairman</p>
                      <h2 className="font-['JetBrains_Mono'] text-3xl text-[#0F172A] mb-3">{chairman.name}</h2>
                      <p className="text-sm font-semibold text-[#0F172A] mb-4">{chairman.designation}</p>
                      {chairman.message ? <p className="text-[#475569] leading-relaxed mb-4">{chairman.message}</p> : null}
                      {chairman.honors?.length ? (
                        <ul className="grid gap-2 text-sm text-[#475569] mb-4">
                          {chairman.honors.map((honor) => (
                            <li key={honor} className="flex items-center gap-2">
                              <Award size={16} className="text-[#0F766E]" aria-hidden="true" />
                              {honor}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-[#0F172A]">
                        <span className="inline-flex items-center gap-2 rounded-2xl bg-[#ecfeff] px-3 py-2">
                          <CheckCircle2 size={15} aria-hidden="true" /> Strategy
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-2xl bg-[#ecfeff] px-3 py-2">
                          <CheckCircle2 size={15} aria-hidden="true" /> Operations
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-2xl bg-[#ecfeff] px-3 py-2">
                          <CheckCircle2 size={15} aria-hidden="true" /> Quality
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ) : null}

            <Reveal delay={100}>
              <aside className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-sm mb-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-[#94A3B8] mb-2">Leadership roster</p>
                    <h2 className="text-2xl font-semibold text-[#0F172A]">Broader leadership team</h2>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-[#ecfeff] px-4 py-2 text-sm font-semibold text-[#0F766E]">
                    Team excellence
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {leadershipMembers.map((member, i) => (
                    <Reveal key={member._id} delay={i * 50}>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedMember(member)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedMember(member); } }}
                        className="cursor-pointer rounded-[28px] border border-[#E2E8F0] bg-[#f7f9fb] p-5 shadow-sm hover:border-[#c29f5d] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-16 w-16 overflow-hidden rounded-3xl bg-[#eceef0]">
                            <img src={member.image.url} alt={member.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-semibold text-[#0F172A]">{member.name}</h3>
                                <p className="text-sm text-[#64748b]">{member.designation}</p>
                              </div>
                            </div>
                            {member.message ? (
                              <p className="mt-3 text-sm text-[#475569] leading-relaxed line-clamp-2">{member.message}</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </aside>
            </Reveal>

            {remainingFeatured.length ? (
              <section className="mb-10">
                <Reveal>
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <Users size={20} className="text-[#0F172A]" aria-hidden="true" />
                    <h2 className="text-2xl font-semibold text-[#0F172A]">Featured leadership</h2>
                  </div>
                </Reveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  {remainingFeatured.map((member, i) => (
                    <Reveal key={member._id} delay={i * 80} className="h-full">
                      <article
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedMember(member)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedMember(member); } }}
                        className="h-full flex flex-col cursor-pointer rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-sm hover:border-[#c29f5d] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                          <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-3xl bg-[#eceef0]">
                            <img src={member.image.url} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-[#0F172A]">{member.name}</h3>
                            <p className="text-sm font-semibold text-[#0F172A] mb-3">{member.designation}</p>
                            {member.message ? (
                              <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">{member.message}</p>
                            ) : null}
                          </div>
                        </div>
                        {member.honors?.length ? (
                          <div className="mt-6 pt-4 border-t border-[#E2E8F0] mt-auto">
                            <p className="text-xs uppercase tracking-[0.26em] text-[#94A3B8] mb-2">Honors</p>
                            <ul className="grid gap-2 text-sm text-[#475569]">
                              {member.honors.slice(0, 3).map((honor) => (
                                <li key={honor} className="flex items-center gap-2">
                                  <Award size={16} className="text-[#0F766E] shrink-0" aria-hidden="true" />
                                  <span className="line-clamp-1">{honor}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="mt-auto" />
                        )}
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}
      </section>

      <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />

      <style>{`
        @keyframes teamHeroIn    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cursorBlink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes modalOverlayIn { from{opacity:0} to{opacity:1} }
        @keyframes modalPanelIn  { from{opacity:0;transform:translateY(16px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </section>
  );
}