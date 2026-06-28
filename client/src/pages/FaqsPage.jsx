import { useEffect, useState } from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';
import api from '../api/axios';

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        setLoading(true);
        const res = await api.get('/faqs');
        setFaqs((res.data.faqs || []).filter((item) => item.isActive !== false));
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load FAQs right now.');
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, []);

  return (
    <section className="data-section-shell">
      <div className="data-hero">
        <div>
          <p className="public-eyebrow">FAQs</p>
          <h1>Find clear answers to common questions about our work and capabilities.</h1>
          <p>
            Frequently asked questions are now loaded from the backend and presented in a modern, expandable layout.
          </p>
        </div>
        <div className="data-hero-badge">
          <HelpCircle size={20} />
          <span>{faqs.length} answers</span>
        </div>
      </div>

      {loading ? (
        <div className="data-state-card">Loading FAQs...</div>
      ) : error ? (
        <div className="data-state-card error">{error}</div>
      ) : !faqs.length ? (
        <div className="data-state-card">No FAQs available yet.</div>
      ) : (
        <div className="faq-list">
          {faqs.map((faq) => {
            const isOpen = openId === faq._id;
            return (
              <article className={`faq-item ${isOpen ? 'open' : ''}`} key={faq._id}>
                <button type="button" className="faq-toggle" onClick={() => setOpenId(isOpen ? null : faq._id)}>
                  <span>{faq.question}</span>
                  <ChevronRight size={18} className={isOpen ? 'rotated' : ''} />
                </button>
                {isOpen ? <div className="faq-answer">{faq.answer}</div> : null}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
