import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import api from '../api/axios';

export default function CertificateCarousel() {
  const [certificates, setCertificates] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCertificates = async () => {
      try {
        const response = await api.get('/certificates');
        if (isMounted) {
          setCertificates(
            (response.data.certificates || []).filter((certificate) => certificate.image?.url)
          );
        }
      } catch (error) {
        console.error('Failed to load certificates', error);
      }
    };

    loadCertificates();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (certificates.length < 2 || isPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % certificates.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [certificates.length, isPaused]);

  if (!certificates.length) return null;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + certificates.length) % certificates.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % certificates.length);
  };

  return (
    <section className="certificates-section section-shell">
      <div className="certificate-heading">
        <p className="section-kicker">Quality Certifications</p>
        <h2>Recognized standards behind dependable manufacturing.</h2>
        <p>
          Explore the certifications that support our commitment to consistent quality and
          production discipline.
        </p>
      </div>

      <div
        className="certificate-carousel"
        aria-label="Company certificates"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="certificate-stage" aria-live="polite">
          {certificates.map((certificate, index) => (
            <figure
              className={`certificate-slide ${index === activeIndex ? 'active' : ''}`}
              key={certificate._id || index}
              aria-hidden={index !== activeIndex}
            >
              <img src={certificate.image.url} alt={certificate.name} />
              <figcaption>
                <ShieldCheck size={18} aria-hidden="true" />
                {certificate.name}
              </figcaption>
            </figure>
          ))}
        </div>

        {certificates.length > 1 ? (
          <div className="certificate-navigation">
            <button type="button" onClick={showPrevious} aria-label="Previous certificate">
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <div className="certificate-dots" aria-label="Choose a certificate">
              {certificates.map((certificate, index) => (
                <button
                  key={certificate._id || index}
                  type="button"
                  className={index === activeIndex ? 'active' : ''}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show certificate ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>
            <button type="button" onClick={showNext} aria-label="Next certificate">
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
