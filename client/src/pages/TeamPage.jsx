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

  const { featuredMembers, leadershipMembers } = useMemo(() => {
    const selected = members.filter((member) => member.isFeatured);
    const featured = selected.length ? selected : members.slice(0, 1);
    const featuredIds = new Set(featured.map((member) => member._id));

    return {
      featuredMembers: featured,
      leadershipMembers: members.filter((member) => !featuredIds.has(member._id)),
    };
  }, [members]);

  return (
    <section className="team-page">
      <div className="team-page-header">
        <div className="team-header-copy">
          <p className="public-eyebrow">Our People</p>
          <h1>Leadership shaped by engineering clarity and manufacturing execution.</h1>
          <p>
            Meet the people guiding SriLin Electronics through dependable production,
            disciplined quality workflows, and customer-focused delivery.
          </p>
        </div>

        <div className="team-hero-panel">
          <span className="team-hero-icon">
            <Users size={26} aria-hidden="true" />
          </span>
          <strong>{members.length || 'SriLin'}</strong>
          <span>{members.length ? 'active team profiles' : 'electronics manufacturing team'}</span>
        </div>
      </div>

      <div className="team-pillar-grid" aria-label="Leadership principles">
        {leadershipPillars.map(({ icon: Icon, title, text }) => (
          <article className="team-pillar-card" key={title}>
            <Icon size={22} aria-hidden="true" />
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>

      {loading ? (
        <div className="team-state-card">Loading team profiles...</div>
      ) : error ? (
        <div className="team-state-card error">{error}</div>
      ) : !members.length ? (
        <div className="team-state-card">No team profiles are available yet.</div>
      ) : (
        <>
          <div className="featured-team-list">
            {featuredMembers.map((member) => (
              <article className="featured-team-card" key={member._id}>
                <div className="featured-member-photo">
                  <img src={member.image.url} alt={member.name} />
                </div>

                <div className="featured-member-content">
                  <p className="featured-label">Executive Leadership</p>
                  <h2>{member.name}</h2>
                  <span className="featured-title">{member.designation}</span>
                  {member.message ? <p className="featured-message">{member.message}</p> : null}

                  {member.honors?.length ? (
                    <ul className="featured-honors">
                      {member.honors.map((honor) => (
                        <li key={honor}>
                          <Award size={16} aria-hidden="true" />
                          {honor}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="featured-focus-list">
                    <span><CheckCircle2 size={15} aria-hidden="true" /> Strategy</span>
                    <span><CheckCircle2 size={15} aria-hidden="true" /> Operations</span>
                    <span><CheckCircle2 size={15} aria-hidden="true" /> Quality</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {leadershipMembers.length ? (
            <div className="leadership-section">
              <div className="leadership-heading">
                <Users size={22} aria-hidden="true" />
                <h2>Leadership Team</h2>
              </div>

              <div className="leadership-grid">
                {leadershipMembers.map((member) => (
                  <article className="leadership-card" key={member._id}>
                    <div className="leadership-photo">
                      <img src={member.image.url} alt={member.name} />
                    </div>
                    <h3>{member.name}</h3>
                    <p>{member.designation}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
