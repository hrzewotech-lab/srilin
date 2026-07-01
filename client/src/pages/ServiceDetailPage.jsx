import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Settings, Sparkles, Share2, Mail } from 'lucide-react';
import api from '../api/axios';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const loadService = async () => {
      try {
        const response = await api.get(`/services/${id}`);
        if (isMounted) setService(response.data.service);
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError?.response?.data?.message || 'Unable to load this service right now.'
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadService();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f7f9fb]">
        <div className="bg-white border border-[#E2E8F0] px-8 py-6 text-[#44474d] font-['Inter']">
          Loading service details…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f7f9fb] px-6">
        <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] px-8 py-6 text-center font-['Inter']">
          {error}
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f7f9fb]">
        <div className="bg-white border border-[#E2E8F0] px-8 py-6 text-[#44474d] font-['Inter']">
          No service found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">

      {/* ── Back bar ── */}
      <div className="bg-[#0F172A] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-white/80 hover:text-[#166b7f] transition-colors text-sm font-semibold"
          >
            <ArrowLeft size={16} /> Back to services
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section
        className="relative bg-[#0F172A]"
        style={{
          backgroundImage: `url('/header2-2.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0F172A]/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-14 md:py-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-[#00dbe7]" />
            <span className="font-['JetBrains_Mono'] text-[#00dbe7] text-xs font-bold uppercase tracking-[0.15em]">
              Srilin Electronics — Service
            </span>
          </div>
          <h1 className="font-['JetBrains_Mono'] font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl mb-6">
            {service.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#166b7f]/20 text-[#00dbe7] text-xs font-['JetBrains_Mono'] font-bold uppercase tracking-widest border border-[#00dbe7]/30">
              Srilin Service
            </span>
            <span className="px-3 py-1 bg-white/10 text-white/70 text-xs font-['JetBrains_Mono'] font-bold uppercase tracking-widest border border-white/20">
              Engineering Support
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LAYOUT (lg+):
          LEFT  → Image (4:3) / Team card / CTA
          RIGHT → Overview / Highlights
          Mobile → single column, natural order
         ══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* Image — 4:3 locked */}
            <div
              className="relative w-full overflow-hidden border border-[#E2E8F0] shadow-sm"
              style={{ paddingBottom: '75%' }}
            >
              <img
                src={service.image?.url || '/image.png'}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00696f]" />
            </div>

            {/* Team card */}
            <div className="bg-white border border-[#E2E8F0] shadow-sm px-6 py-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  SE
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm">Srilin Engineering Team</p>
                  <p className="text-[#44474d] text-xs">Quality Assurance</p>
                </div>
              </div>
              <div className="flex gap-3 pt-3 border-t border-[#E2E8F0]">
                <Share2 size={16} className="text-[#00696f] cursor-pointer hover:text-[#0F172A] transition-colors" />
                <Mail size={16} className="text-[#00696f] cursor-pointer hover:text-[#0F172A] transition-colors" />
              </div>
            </div>

            {/* CTA card */}
            <div className="bg-[#0F172A] text-white px-6 py-6 space-y-3 shadow-sm">
              <p className="font-['JetBrains_Mono'] font-semibold text-lg">Need this service?</p>
              <p className="text-sm text-white/70 leading-relaxed">
                Talk to our engineering team about your specific requirements and get a tailored quote.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  to="/contact-us"
                  className="inline-block bg-[#166b7f] text-[#0F172A] px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Discuss your requirement
                </Link>
                <Link
                  to="/services"
                  className="inline-block border border-white/30 text-white px-6 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Explore other services
                </Link>
              </div>
            </div>

          </div>
          {/* end LEFT col */}

          {/* ══ RIGHT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* Overview card */}
            <div className="bg-white border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-[#E2E8F0]">
                <Settings size={16} className="text-[#00696f]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#00696f]">
                  Service Overview
                </span>
              </div>
              <div className="px-6 py-5">
                <p className="text-base md:text-[17px] leading-relaxed text-[#334155] whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Highlights card */}
            {service.bullets?.length > 0 && (
              <div className="bg-white border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-[#E2E8F0]">
                  <Sparkles size={16} className="text-[#00696f]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#00696f]">
                    Service Highlights
                  </span>
                </div>
                <ul className="px-6 py-5 space-y-3">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 p-3 border border-[#E2E8F0] hover:border-[#00696f] hover:bg-[#f7f9fb] transition-colors"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#166b7f]/20 flex items-center justify-center shrink-0">
                        <Sparkles size={11} className="text-[#00696f]" />
                      </span>
                      <span className="text-[#334155] text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
          {/* end RIGHT col */}

        </div>
      </div>
    </div>
  );
}