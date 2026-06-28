import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Sparkles } from 'lucide-react';
import api from '../api/axios';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const response = await api.get('/services');
        if (isMounted) {
          setServices((response.data.services || []).filter((service) => service.isActive !== false));
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError?.response?.data?.message || 'Unable to load services right now.');
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
    <section className="data-section-shell">
      <div className="data-hero">
        <div>
          <p className="public-eyebrow">Services</p>
          <h1>Engineering and manufacturing services built around dependable execution.</h1>
          <p>
            Explore our active service capabilities, managed directly from the SriLin backend.
          </p>
        </div>
        <div className="data-hero-badge">
          <Settings size={20} />
          <span>{services.length} active services</span>
        </div>
      </div>

      {loading ? (
        <div className="data-state-card">Loading services...</div>
      ) : error ? (
        <div className="data-state-card error">{error}</div>
      ) : !services.length ? (
        <div className="data-state-card">No services available yet.</div>
      ) : (
        <div className="data-grid service-grid">
          {services.map((service) => (
            <article className="data-card service-card" key={service._id}>
              <div className="card-visual">
                <img src={service.image?.url || '/image.png'} alt={service.title} />
              </div>
              <div className="data-card-body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                {service.bullets?.length ? (
                  <ul className="data-list">
                    {service.bullets.slice(0, 3).map((bullet) => (
                      <li key={bullet}>
                        <Sparkles size={14} aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <Link className="inline-link" to={`/services/${service._id}`}>
                  View service details <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
