import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
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

function Reveal({ children, delay = 0, y = 24, className = '', style = {} }) {
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

function AnimatedNumber({ value }) {
  const ref     = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const el  = ref.current;
    const num = Number(value);
    if (!el || isNaN(num)) { setDisplay(value); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true; obs.unobserve(el);
        let t0 = null;
        const tick = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 1600, 1);
          setDisplay(Math.floor((1 - (1 - p) ** 3) * num));
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

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function BlogsPage() {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get('/blog');
        setBlogs((res.data.blogs || []).filter((item) => item.isActive !== false));
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load blogs right now.');
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const heroText              = 'Insights & Technical Updates';
  const [typedHero, heroDone] = useTypewriter(heroText, 42);

  return (
    <section className="bg-[#f7f9fb] min-h-screen font-['Inter']">

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#0F172A] min-h-[340px] sm:min-h-[380px] md:min-h-[420px] flex items-center">
        <img src="/image.png" alt="Engineering manufacturing floor"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-0">
          <div className="max-w-2xl border-l-2 border-[#166b7f] pl-5 md:pl-6"
            style={{ animation: 'blogsHeroIn 0.8s cubic-bezier(0.16,1,0.3,1) both' }}>

            <p className="text-[#166b7f] text-xs font-semibold uppercase tracking-widest mb-3 md:mb-4"
              style={{ animation: 'blogsHeroIn 0.6s 0.05s ease both' }}>
              Engineering Journal
            </p>

            {/* Typewriter heading */}
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4"
              style={{ minHeight: '1.1em' }}>
              {typedHero}
              {!heroDone && (
                <span style={{ display: 'inline-block', width: 3, height: '0.85em', background: '#166b7f',
                  marginLeft: 4, verticalAlign: 'middle', animation: 'cursorBlink 0.75s step-end infinite' }} />
              )}
            </h1>

            {/* Sub-text fades after typing */}
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg"
              style={{ opacity: heroDone ? 1 : 0, transform: heroDone ? 'none' : 'translateY(8px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
              Read the latest engineering, manufacturing, and quality articles from our team.
            </p>
          </div>

          {/* Blog count badge — fades + counts */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white shadow-sm backdrop-blur-sm"
            style={{ opacity: heroDone ? 1 : 0, transition: 'opacity 0.5s 0.2s ease' }}>
            <BookOpen size={18} />
            <span><AnimatedNumber value={blogs.length} /> blog posts</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#166b7f]/60 via-[#166b7f]/10 to-transparent" />
      </section>

      {/* ══ CONTENT ═══════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {loading ? (
          <Reveal>
            <div className="bg-white border border-[#E2E8F0] p-10 text-center text-[#44474d]">
              Loading blogs…
            </div>
          </Reveal>
        ) : error ? (
          <Reveal>
            <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] p-6 text-center">
              {error}
            </div>
          </Reveal>
        ) : !blogs.length ? (
          <Reveal>
            <div className="bg-white border border-[#E2E8F0] p-10 text-center text-[#44474d]">
              No blogs available yet.
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <Reveal key={blog._id} delay={i * 70}>
                <article className="group bg-white border border-[#E2E8F0] hover:border-[#166b7f] transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lg h-full">
                  <div className="h-48 overflow-hidden bg-[#eceef0] relative">
                    <img src={blog.image?.url || '/image.png'} alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {/* Teal top-border on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#166b7f] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    {blog.readTime && (
                      <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#334155]">
                        <Clock size={14} /> {blog.readTime}
                      </span>
                    )}
                    <h3 className="font-['JetBrains_Mono'] font-semibold text-lg text-[#0F172A] leading-snug group-hover:text-[#00696f] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-[#44474d] line-clamp-3">
                      {blog.description}
                    </p>
                    <Link to={`/resources/blog/${blog._id}`}
                      className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#00696f] hover:underline pt-2">
                      Read full article
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes blogsHeroIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes cursorBlink  { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}
