import { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hello SriLin,%0A%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.phone)}%0ASubject: ${encodeURIComponent(formData.subject)}%0AMessage: ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const contactCards = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 73850 69999',
      sub: 'Mon – Sat, 9 AM – 6 PM IST',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@srilinelectronics.com',
      sub: 'We reply within one business day',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'PLOT: S-1/P/D, E-City EMC',
      sub: 'Raviryala, Maheshwaram, Ranga Reddy, Telangana – 501359',
    },
  ];

  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden bg-[#0F172A] min-h-[340px] sm:min-h-[380px] md:min-h-[420px] flex items-center">
        <img
          src="/image.png"
          alt="Electronics manufacturing floor"
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
              Contact Us
            </p>
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4">
              Talk to SriLin.
              <br />
              Start Building.
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg">
              Share your product, production, or service requirement and our engineering
              team will identify the right next step for you.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <MessageSquare size={13} /> WhatsApp Enabled
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <Mail size={13} /> Direct Email Support
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#00f1fe]/60 via-[#00f1fe]/10 to-transparent" />
      </section>

      {/* ── SPEC STRIP ── */}
      <div className="bg-[#0F172A] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/50 text-[10px] sm:text-[11px] tracking-wide text-center sm:text-left">
            ISO 13485:2016 &nbsp;•&nbsp; IPC-A-610 CLASS 3 &nbsp;•&nbsp; AS9100D &nbsp;•&nbsp; IATF 16949
          </p>
          <p className="text-[#00f1fe] font-['JetBrains_Mono'] text-xs tracking-widest text-center sm:text-right">
            SRILIN_CONTACT_24×7
          </p>
        </div>
      </div>

      {/* ── CONTACT CARDS ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="mb-10">
          <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A] border-l-4 border-[#00f1fe] pl-4">
            Get in Touch
          </h2>
          <p className="text-[#44474d] mt-3 max-w-2xl">
            Reach us through any channel — our team is ready to respond to your
            technical enquiries, RFQs, and partnership requests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {contactCards.map(({ icon: Icon, title, value, sub }) => (
            <div
              key={title}
              className="group bg-white border border-[#E2E8F0] p-6 flex flex-col gap-4 hover:border-[#00f1fe] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 flex items-center justify-center bg-[#eceef0] text-[#0F172A] group-hover:bg-[#00f1fe]/10 group-hover:text-[#00696f] transition-colors">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-['JetBrains_Mono'] font-semibold text-lg text-[#0F172A] mb-1">
                  {title}
                </h3>
                <p className="text-sm font-semibold text-[#0F172A] mb-1">{value}</p>
                <p className="text-xs text-[#64748b] leading-relaxed">{sub}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-[#E2E8F0]">
                <span className="inline-block bg-[#0F172A] text-[#00f1fe] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
                  {title === 'Phone' ? 'Call Direct' : title === 'Email' ? 'Write to Us' : 'Visit Us'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── CONTACT FORM ── */}
        <div className="bg-white border border-[#E2E8F0]">
          {/* Form header bar */}
          <div className="bg-[#0F172A] px-6 py-4 flex items-center justify-between">
            <h3 className="font-['JetBrains_Mono'] font-bold text-white text-base sm:text-lg">
              Send Your Requirement
            </h3>
            <span className="text-[#00f1fe] font-['JetBrains_Mono'] text-xs tracking-widest hidden sm:block">
              VIA WHATSAPP
            </span>
          </div>

          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {[
                  { id: 'name',    label: 'Full Name',     type: 'text',  placeholder: 'Your name' },
                  { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'Your email' },
                  { id: 'phone',   label: 'Phone Number',  type: 'tel',   placeholder: 'Your phone number' },
                  { id: 'subject', label: 'Subject',       type: 'text',  placeholder: 'e.g. PCB Assembly Inquiry' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label
                      htmlFor={id}
                      className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      value={formData[id]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                      className="w-full px-4 py-3 border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#00f1fe] focus:ring-1 focus:ring-[#00f1fe]/40 transition-colors bg-[#f7f9fb]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your product, production volume, or service requirement…"
                  required
                  className="w-full px-4 py-3 border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#00f1fe] focus:ring-1 focus:ring-[#00f1fe]/40 transition-colors bg-[#f7f9fb] resize-vertical min-h-[140px]"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-xs text-[#64748b]">
                  Your message will open in WhatsApp — review before sending.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-3 text-sm font-bold transition-colors"
                >
                  <Send size={15} />
                  Send on WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0F172A] relative overflow-hidden py-14 md:py-16">
        <div className="absolute right-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00f1fe]/40 to-transparent hidden md:block" />
        <div className="absolute right-16 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00f1fe]/20 to-transparent hidden md:block" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-lg">
            <h3 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-white mb-3">
              Need a technical deep-dive?
            </h3>
            <p className="text-white/60 text-sm md:text-base">
              Our engineers are ready to review your BOM, discuss industry-specific
              compliance, and propose the optimal manufacturing approach.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="mailto:info@srilinelectronics.com"
              className="inline-flex items-center justify-center gap-2 bg-[#00f1fe] text-[#0F172A] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Mail size={15} /> Email Our Team
            </a>
            <a
              href={`https://wa.me/917385069999`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <MessageSquare size={15} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}