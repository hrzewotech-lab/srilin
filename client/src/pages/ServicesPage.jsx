import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Sparkles, ChevronRight, Mail } from 'lucide-react';
import api from '../api/axios';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const response = await api.get('/services');
        const rawList = response?.data?.services;
        const list = Array.isArray(rawList)
          ? rawList.filter((service) => service && service.isActive !== false)
          : [];

        if (isMounted) {
          setServices(list);
          if (list.length) setActiveId(list[0]._id);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError?.response?.data?.message || 'Unable to load services right now.'
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">
      {/* HERO */}
      <section className="relative h-[42vh] sm:h-[46vh] md:h-[50vh] min-h-[340px] flex items-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <img
            src="/image.png"
            alt="High-precision SMT assembly line"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/70 to-[#0F172A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#00f1fe] text-[#0F172A] text-xs font-bold uppercase tracking-widest mb-3 md:mb-4">
              High-Precision EMS
            </span>
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-5xl text-white leading-tight mb-3 md:mb-5">
              Advanced EMS <span className="text-[#00dbe7]">Solutions</span>
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-5 md:mb-8 max-w-lg">
              Delivering tier-one electronics manufacturing services with aerospace-grade
              reliability, managed live from our service capability database.
            </p>
            <div className="inline-flex items-center gap-2 bg-white text-[#0F172A] px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-['JetBrains_Mono'] font-bold">
              <Settings size={14} />
              {loading ? 'Loading…' : `${services.length} active services`}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16 lg:py-20">
        {loading ? (
          <div className="bg-white border border-[#E2E8F0] p-8 md:p-10 text-center text-[#44474d]">
            Loading services…
          </div>
        ) : error ? (
          <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] p-6 text-center">
            {error}
          </div>
        ) : !services.length ? (
          <div className="bg-white border border-[#E2E8F0] p-8 md:p-10 text-center text-[#44474d]">
            No services available yet.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Sidebar Nav */}
            <aside className="lg:w-1/4 order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 space-y-1">
                <h3 className="font-['JetBrains_Mono'] text-xs text-[#334155] uppercase tracking-widest mb-3 md:mb-4">
                  Service Categories
                </h3>
                <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-1">
                  {services.map((service) => {
                    if (!service || !service._id) return null;
                    return (
                      <a
                        key={service._id}
                        href={`#service-${service._id}`}
                        onClick={() => setActiveId(service._id)}
                        className={`group flex items-center justify-between gap-2 px-3 lg:p-4 py-2 border-l-4 font-['JetBrains_Mono'] text-xs md:text-sm transition-all ${
                          activeId === service._id
                            ? 'bg-white border-[#00696f] text-[#00696f]'
                            : 'bg-white lg:bg-transparent border-[#E2E8F0] lg:border-transparent text-[#334155] hover:border-[#00696f]/40 hover:bg-[#eceef0]'
                        }`}
                      >
                        <span className="truncate pr-1 max-w-[160px] lg:max-w-none">
                          {service.title || 'Untitled service'}
                        </span>
                        <ChevronRight
                          size={14}
                          className="shrink-0 group-hover:translate-x-1 transition-transform hidden lg:block"
                        />
                      </a>
                    );
                  })}
                </div>

                <div className="mt-6 lg:mt-10 p-5 md:p-6 bg-[#0F172A] text-white">
                  <h4 className="font-['JetBrains_Mono'] font-semibold text-base md:text-lg mb-2 md:mb-3">
                    Technical Help?
                  </h4>
                  <p className="text-xs md:text-sm text-white/70 mb-4 md:mb-5">
                    Our senior engineers are available for DFM consultation.
                  </p>
                  <Link
                    to="/contact-us"
                    className="flex items-center justify-center gap-2 w-full py-2.5 md:py-3 border border-[#00dbe7] text-[#00dbe7] text-xs md:text-sm font-['JetBrains_Mono'] font-semibold hover:bg-[#00dbe7] hover:text-[#0F172A] transition-all"
                  >
                    <Mail size={14} /> Contact Engineering
                  </Link>
                </div>
              </div>
            </aside>

            {/* Service Cards */}
            <div className="lg:w-3/4 order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {services.map((service, index) => {
                  if (!service) return null;
                  const key = service._id || `service-${index}`;
                  const bullets = Array.isArray(service.bullets) ? service.bullets : [];

                  return (
                    <article
                      key={key}
                      id={`service-${service._id || index}`}
                      className="group flex flex-col bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#00f1fe] transition-colors duration-300"
                    >
                      <div className="h-36 sm:h-40 md:h-44 overflow-hidden relative bg-[#eceef0]">
                        <img
                          src={service.image?.url || '/image.png'}
                          alt={service.title || 'Service'}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/image.png';
                          }}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4 md:p-5 flex-grow flex flex-col">
                        <h3 className="font-['JetBrains_Mono'] font-semibold text-base md:text-lg text-[#0F172A] mb-2 leading-snug">
                          {service.title || 'Untitled service'}
                        </h3>
                        <p className="text-[#334155] text-xs md:text-sm mb-3 leading-relaxed line-clamp-2">
                          {service.description || 'No description provided.'}
                        </p>

                        {bullets.length > 0 && (
                          <ul className="space-y-1.5 mb-3">
                            {bullets.slice(0, 2).map((bullet, bulletIndex) => (
                              <li
                                key={`${key}-bullet-${bulletIndex}`}
                                className="flex items-start gap-1.5 text-xs text-[#44474d]"
                              >
                                <Sparkles size={12} className="text-[#00696f] mt-0.5 shrink-0" />
                                <span className="line-clamp-1">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {service._id && (
                          <Link
                            to={`/services/${service._id}`}
                            className="mt-auto inline-flex items-center gap-1.5 text-[#00696f] font-['JetBrains_Mono'] font-semibold text-xs md:text-sm hover:gap-2.5 transition-all"
                          >
                            View details
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}