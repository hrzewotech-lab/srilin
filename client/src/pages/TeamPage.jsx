import { useEffect, useMemo, useState } from 'react';
import { Award, BriefcaseBusiness, CheckCircle2, Factory, ShieldCheck, Users } from 'lucide-react';
import api from '../api/axios';

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

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <section className="bg-[#f7f9fb] font-['Inter']">
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
          <div className="max-w-2xl border-l-2 border-[#00f1fe] pl-5 md:pl-6">
            <p className="text-[#00f1fe] text-xs font-semibold uppercase tracking-widest mb-3 md:mb-4">
              Our People
            </p>
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4">
              Leadership shaped by engineering clarity and manufacturing execution.
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg">
              Meet the people guiding SriLin Electronics through dependable production,
              disciplined quality workflows, and customer-focused delivery.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#94f2ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <Users size={13} />
                {stats.total} team profiles
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#94f2ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <ShieldCheck size={13} />
                {stats.featured} featured leaders
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#00f1fe]/60 via-[#00f1fe]/10 to-transparent" />
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-8 items-start mb-12">
          <div>
            <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A] border-l-4 border-[#00f1fe] pl-4">
              About our leadership
            </h2>
            <p className="text-[#44474d] mt-4 leading-relaxed">
              SriLin is led by engineers and operators who understand both product design and scalable manufacturing. Our team bridges the gap between concept, quality, and delivery.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {leadershipPillars.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ecfeff] text-[#0F766E]">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-base text-[#0F172A] mb-2">{title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">
              Team snapshot
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[#f7f9fb] p-4 text-center">
                <p className="text-3xl font-['JetBrains_Mono'] text-[#0F172A]">{stats.total}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-[#94A3B8] mt-2">Total profiles</p>
              </div>
              <div className="rounded-2xl bg-[#f7f9fb] p-4 text-center">
                <p className="text-3xl font-['JetBrains_Mono'] text-[#0F172A]">{stats.active}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-[#94A3B8] mt-2">Active team</p>
              </div>
              <div className="rounded-2xl bg-[#f7f9fb] p-4 text-center">
                <p className="text-3xl font-['JetBrains_Mono'] text-[#0F172A]">{stats.featured}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-[#94A3B8] mt-2">Featured leaders</p>
              </div>
            </div>
          </aside>
        </div>

        {loading ? (
          <div className="bg-white border border-[#E2E8F0] p-10 text-center text-[#44474d] rounded-3xl">
            Loading team profiles...
          </div>
        ) : error ? (
          <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] p-10 text-center rounded-3xl">
            {error}
          </div>
        ) : !members.length ? (
          <div className="bg-white border border-[#E2E8F0] p-10 text-center text-[#44474d] rounded-3xl">
            No team profiles are available yet.
          </div>
        ) : (
          <>
            {chairman ? (
              <article className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-sm mb-10">
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                  <div className="rounded-3xl overflow-hidden bg-[#eceef0]">
                    <img src={chairman.image.url} alt={chairman.name} className="w-full h-full object-cover" />
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
            ) : null}
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
                {leadershipMembers.map((member) => (
                  <div key={member._id} className="rounded-[28px] border border-[#E2E8F0] bg-[#f7f9fb] p-5 shadow-sm">
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
                          <p className="mt-3 text-sm text-[#475569] leading-relaxed">{member.message}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            {remainingFeatured.length ? (
              <section className="mb-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <Users size={20} className="text-[#0F172A]" aria-hidden="true" />
                  <h2 className="text-2xl font-semibold text-[#0F172A]">Featured leadership</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {remainingFeatured.map((member) => (
                    <article key={member._id} className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-sm">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                        <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-3xl bg-[#eceef0]">
                          <img src={member.image.url} alt={member.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-[#0F172A]">{member.name}</h3>
                          <p className="text-sm font-semibold text-[#0F172A] mb-3">{member.designation}</p>
                          {member.message ? (
                            <p className="text-sm text-[#475569] leading-relaxed">{member.message}</p>
                          ) : null}
                        </div>
                      </div>
                      {member.honors?.length ? (
                        <div className="mt-6">
                          <p className="text-xs uppercase tracking-[0.26em] text-[#94A3B8] mb-2">Honors</p>
                          <ul className="grid gap-2 text-sm text-[#475569]">
                            {member.honors.map((honor) => (
                              <li key={honor} className="flex items-center gap-2">
                                <Award size={16} className="text-[#0F766E]" aria-hidden="true" />
                                {honor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

           
          </>
        )}
      </section>
    </section>
  );
}
