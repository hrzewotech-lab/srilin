import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const whatsappNumber = '917385069999';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = `Hello SriLin,%0A%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.phone)}%0ASubject: ${encodeURIComponent(formData.subject)}%0AMessage: ${encodeURIComponent(formData.message)}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  const styles = {
    page: {
      padding: '60px 20px',
      background: '#f7f9fc',
      minHeight: '100vh',
    },
    hero: {
      maxWidth: '1100px',
      margin: '0 auto 30px',
      textAlign: 'center',
    },
    eyebrow: {
      color: '#2563eb',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom: '10px',
    },
    title: {
      fontSize: 'clamp(28px, 4vw, 48px)',
      margin: '0 0 12px',
      color: '#0f172a',
    },
    subtitle: {
      maxWidth: '700px',
      margin: '0 auto',
      color: '#475569',
      fontSize: '16px',
      lineHeight: 1.7,
    },
    featureGrid: {
      maxWidth: '1100px',
      margin: '40px auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    featureCard: {
      background: '#fff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
      border: '1px solid #e2e8f0',
    },
    iconWrap: {
      width: '42px',
      height: '42px',
      borderRadius: '12px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#eff6ff',
      color: '#2563eb',
      marginBottom: '14px',
    },
    cardTitle: {
      margin: '0 0 8px',
      fontSize: '20px',
      color: '#0f172a',
    },
    cardText: {
      margin: 0,
      color: '#475569',
      lineHeight: 1.6,
    },
    formWrap: {
      maxWidth: '1100px',
      margin: '0 auto',
      background: '#fff',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
      border: '1px solid #e2e8f0',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '16px',
    },
    label: {
      fontWeight: 600,
      color: '#0f172a',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: '10px',
      border: '1px solid #cbd5e1',
      outline: 'none',
      fontSize: '15px',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: '10px',
      border: '1px solid #cbd5e1',
      outline: 'none',
      fontSize: '15px',
      resize: 'vertical',
      boxSizing: 'border-box',
      minHeight: '140px',
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      border: 'none',
      borderRadius: '12px',
      background: '#16a34a',
      color: '#fff',
      padding: '14px 20px',
      fontSize: '16px',
      fontWeight: 700,
      cursor: 'pointer',
      marginTop: '8px',
    },
  };

  return (
    <section style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.eyebrow}>Contact Us</p>
        <h1 style={styles.title}>Talk to SriLin about your next electronics requirement.</h1>
        <p style={styles.subtitle}>
          Share your product, production, or service requirement and our team will help you identify the right next step.
        </p>
      </div>

      <div style={styles.featureGrid}>
        <article style={styles.featureCard}>
          <span style={styles.iconWrap}><Phone size={18} /></span>
          <h2 style={styles.cardTitle}>Phone</h2>
          <p style={styles.cardText}>+91 73850 69999</p>
        </article>

        <article style={styles.featureCard}>
          <span style={styles.iconWrap}><Mail size={18} /></span>
          <h2 style={styles.cardTitle}>Email</h2>
          <p style={styles.cardText}>info@srilinelectronics.com</p>
        </article>

        <article style={styles.featureCard}>
          <span style={styles.iconWrap}><MapPin size={18} /></span>
          <h2 style={styles.cardTitle}>Address</h2>
          <p style={styles.cardText}>
            PLOT: S-1/P/D, E-City EMC, Raviryala Village, Maheshwaram Mandal,
            Ranga Reddy District, Telangana - 501359
          </p>
        </article>
      </div>

      <div style={styles.formWrap}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="name">Full Name</label>
              <input
                style={styles.input}
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="email">Email Address</label>
              <input
                style={styles.input}
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="phone">Phone Number</label>
              <input
                style={styles.input}
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="subject">Subject</label>
              <input
                style={styles.input}
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="message">Message</label>
            <textarea
              style={styles.textarea}
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your requirement..."
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            <Send size={18} />
            Send on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}