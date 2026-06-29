import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../api/axios';

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const res = await api.get('/hero');
        setSlides(res.data.slides || []);
      } catch (error) {
        console.error('Failed to load hero slides', error);
      }
    };

    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length < 2 || isPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  if (!slides.length) {
    return null;
  }

  const activeSlide = slides[activeIndex] || slides[0];

  return (
    <section
      className="hero-carousel-section"
      aria-label="Featured images"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="hero-carousel" aria-live="polite">
        <div className="hero-carousel-track">
          {slides.map((slide, index) => (
            <img
              key={slide._id || index}
              className={`hero-carousel-image ${index === activeIndex ? 'active' : ''}`}
              src={slide.image?.url}
              alt={slide.title || `Featured image ${index + 1}`}
              aria-hidden={index !== activeIndex}
            />
          ))}
        </div>

        <div className="hero-carousel-overlay" key={activeSlide?._id || activeIndex}>
          <div className="hero-carousel-copy">
            <span className="hero-pill">SriLin Electronics</span>
            <h2>{activeSlide?.title || 'Precision Electronics Manufacturing'}</h2>
            <p>{activeSlide?.description || 'Delivering dependable electronics manufacturing with clarity, consistency, and industrial discipline.'}</p>
            <div className="hero-actions">
              <Link className="hero-cta" to="/about-us/company">
                Explore Solutions <ArrowRight size={18} />
              </Link>
              <Link className="hero-ghost" to="/contact-us">Contact Us</Link>
            </div>
          </div>

          <div className="hero-carousel-metrics" aria-label="Company highlights">
            <div>
              <strong>03+</strong>
              <span>Capability Areas</span>
            </div>
            <div>
              <strong>QC</strong>
              <span>Focused Workflow</span>
            </div>
            <div>
              <strong>EMS</strong>
              <span>Reliable Delivery</span>
            </div>
          </div>
        </div>

        {slides.length > 1 ? (
          <>
          <button
            type="button"
            className="hero-carousel-control previous"
            onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="hero-carousel-control next"
            onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
            aria-label="Next slide"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>

          <div className="hero-carousel-dots" aria-label="Choose an image">
            {slides.map((slide, index) => (
              <button
                key={slide._id || index}
                type="button"
                className={`hero-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
