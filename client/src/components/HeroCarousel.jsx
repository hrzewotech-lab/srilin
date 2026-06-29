import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../api/axios';

const fallbackSlides = [
  {
    _id: 'fallback-hero-1',
    title: 'Precision Electronics Manufacturing',
    description:
      'Certified electronics design and manufacturing support for prototype, SMT assembly, testing, and box build programs.',
    image: { url: '/header1.webp' },
  },
  {
    _id: 'fallback-hero-2',
    title: 'High-Reliability EMS for Demanding Products',
    description:
      'Aerospace-aware quality systems, ESD controls, and disciplined inspection workflows from Hyderabad.',
    image: { url: '/header2-2.webp' },
  },
  {
    _id: 'fallback-hero-3',
    title: 'From Embedded Design to Final Integration',
    description:
      'A practical one-stop manufacturing partner for teams scaling complex electronic products with confidence.',
    image: { url: '/header3-2.webp' },
  },
];

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const res = await api.get('/hero');
        const activeSlides = (res.data.slides || []).filter((slide) => slide.image?.url);
        setSlides(activeSlides.length ? activeSlides : fallbackSlides);
      } catch (error) {
        console.error('Failed to load hero slides', error);
        setSlides(fallbackSlides);
      }
    };

    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex] || slides[0];
  const slideLabel = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;

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
          <div className=""></div>

          <div className="hero-carousel-copy">
            <h2>{activeSlide?.title || 'Precision Electronics Manufacturing'}</h2>
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
