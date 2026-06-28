import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Settings, Sparkles } from 'lucide-react';
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
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <section className="detail-shell">
      <Link className="back-link" to="/services">
        <ArrowLeft size={16} aria-hidden="true" /> Back to services
      </Link>

      {loading ? (
        <div className="data-state-card">Loading service details...</div>
      ) : error ? (
        <div className="data-state-card error">{error}</div>
      ) : !service ? (
        <div className="data-state-card">No service found.</div>
      ) : (
        <div className="detail-card service-detail-card">
          <img src={service.image?.url || '/image.png'} alt={service.title} />
          <div className="detail-content">
            <div className="detail-badges">
              <span className="chip">SriLin Service</span>
              <span className="chip subtle">Engineering support</span>
            </div>

            <div className="detail-heading">
              <Settings size={20} aria-hidden="true" />
              <h1>{service.title}</h1>
            </div>

            <p className="detail-description">{service.description}</p>

            {service.bullets?.length ? (
              <div className="detail-section">
                <h2>Service highlights</h2>
                <ul className="data-list">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Sparkles size={14} aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="detail-actions">
              <Link className="detail-primary" to="/contact-us">Discuss your requirement</Link>
              <Link className="detail-secondary" to="/services">Explore other services</Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
