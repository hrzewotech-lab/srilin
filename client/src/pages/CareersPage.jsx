import { useRef, useState } from 'react';
import { BriefcaseBusiness, CheckCircle2, Mail, Send, Upload, Users, Lightbulb, TrendingUp } from 'lucide-react';
import api from '../api/axios';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  resume: null,
};

const perks = [
  {
    icon: BriefcaseBusiness,
    title: 'Hands-On Technical Exposure',
    description:
      'Work directly on live PCB assembly lines, SMT processes, and quality inspection systems across industry verticals.',
    tag: 'IPC-Certified Env.',
  },
  {
    icon: Users,
    title: 'Collaborative Engineering Culture',
    description:
      'Join cross-functional teams where engineers, operators, and quality leads solve real manufacturing challenges together.',
    tag: 'Team-Driven',
  },
  {
    icon: Lightbulb,
    title: 'Learning & Growth',
    description:
      'Access structured mentoring, process certifications, and exposure to aerospace, medical, and defence-grade standards.',
    tag: 'Skill-Forward',
  },
  {
    icon: TrendingUp,
    title: 'Career Progression',
    description:
      'Clear advancement paths across production, engineering, quality assurance, and program management functions.',
    tag: 'Merit-Based',
  },
];

export default function CareersPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] || null;
    if (file && file.size > 5 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'Resume file size must be 5 MB or less.' });
      event.target.value = '';
      setForm((current) => ({ ...current, resume: null }));
      return;
    }
    setStatus({ type: '', message: '' });
    setForm((current) => ({ ...current, resume: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const payload = new FormData();
      payload.append('name', form.name);
      payload.append('email', form.email);
      payload.append('phone', form.phone);
      payload.append('address', form.address);
      payload.append('resume', form.resume);
      const response = await api.post('/careers', payload);
      setStatus({
        type: 'success',
        message: response.data.message || 'Your application has been submitted successfully.',
      });
      setForm(initialForm);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setStatus({
        type: 'error',
        message: error?.response?.data?.message || 'Unable to submit your application right now.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden bg-[#0F172A] min-h-[340px] sm:min-h-[380px] md:min-h-[420px] flex items-center">
        <img
          src="/about-us2.png"
          alt="Electronics manufacturing team"
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
          <div className="max-w-2xl border-l-2 border-[#166b7f] pl-5 md:pl-6">
            <p className="text-[#166b7f] text-xs font-semibold uppercase tracking-widest mb-3 md:mb-4">
              Join SriLin
            </p>
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4">
              Build Your Career.
              <br />
              Build the Future.
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg">
              Careers in electronics manufacturing, quality engineering, PCB assembly, and
              production operations — with a team that values dependable, precise work.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#166b7f]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={13} /> IPC-Certified Environment
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#166b7f]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={13} /> AS9100D & ISO 13485
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#166b7f]/60 via-[#166b7f]/10 to-transparent" />
      </section>

      {/* ── SPEC STRIP ── */}
      <div className="bg-[#0F172A] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/50 text-[10px] sm:text-[11px] tracking-wide text-center sm:text-left">
            EMS &nbsp;•&nbsp; ESDM &nbsp;•&nbsp; PCB ASSEMBLY &nbsp;•&nbsp; QUALITY ASSURANCE &nbsp;•&nbsp; PRODUCTION OPS
          </p>
          <p className="text-[#166b7f] font-['JetBrains_Mono'] text-xs tracking-widest text-center sm:text-right">
            SRILIN_CAREERS_OPEN
          </p>
        </div>
      </div>

      {/* ── WHY JOIN CARDS ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="mb-10">
          <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A] border-l-4 border-[#166b7f] pl-4">
            Why Work With Us
          </h2>
          <p className="text-[#44474d] mt-3 max-w-2xl">
            SriLin offers a technically rich environment where every role contributes
            directly to mission-critical electronics manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {perks.map(({ icon: Icon, title, description, tag }) => (
            <div
              key={title}
              className="group bg-white border border-[#E2E8F0] p-6 flex flex-col gap-4 hover:border-[#166b7f] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 flex items-center justify-center bg-[#eceef0] text-[#0F172A] group-hover:bg-[#166b7f]/10 group-hover:text-[#00696f] transition-colors">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-['JetBrains_Mono'] font-semibold text-base text-[#0F172A] mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-[#44474d] leading-relaxed">{description}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-[#E2E8F0]">
                <span className="inline-block bg-[#0F172A] text-[#166b7f] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── APPLICATION FORM ── */}
        <div className="bg-white border border-[#E2E8F0]">
          {/* Form header bar */}
          <div className="bg-[#0F172A] px-6 py-4 flex items-center justify-between">
            <h3 className="font-['JetBrains_Mono'] font-bold text-white text-base sm:text-lg">
              Submit Your Application
            </h3>
            <span className="text-[#166b7f] font-['JetBrains_Mono'] text-xs tracking-widest hidden sm:block">
              HR REVIEW WITHIN 5 DAYS
            </span>
          </div>

          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {[
                  { id: 'name',  label: 'Full Name',     type: 'text',  ac: 'name',  placeholder: 'Enter your full name' },
                  { id: 'email', label: 'Email Address', type: 'email', ac: 'email', placeholder: 'Enter your email address' },
                  { id: 'phone', label: 'Phone Number',  type: 'tel',   ac: 'tel',   placeholder: 'Enter your phone number' },
                ].map(({ id, label, type, ac, placeholder }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label htmlFor={`career-${id}`} className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                      {label}
                    </label>
                    <input
                      id={`career-${id}`}
                      name={id}
                      type={type}
                      autoComplete={ac}
                      placeholder={placeholder}
                      value={form[id]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#166b7f] focus:ring-1 focus:ring-[#166b7f]/40 transition-colors bg-[#f7f9fb]"
                    />
                  </div>
                ))}

                {/* Address spans full width on sm+ but sits beside phone in the grid */}
                <div className="flex flex-col gap-2 sm:col-span-1">
                  <label htmlFor="career-address" className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                    Address
                  </label>
                  <textarea
                    id="career-address"
                    name="address"
                    rows={4}
                    autoComplete="street-address"
                    placeholder="Enter your current address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#166b7f] focus:ring-1 focus:ring-[#166b7f]/40 transition-colors bg-[#f7f9fb] resize-vertical"
                  />
                </div>
              </div>

              {/* Resume upload */}
              <div className="flex flex-col gap-2 mb-6">
                <label htmlFor="career-resume" className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                  Upload Resume
                </label>
                <label
                  htmlFor="career-resume"
                  className="flex items-center gap-4 px-4 py-4 border border-dashed border-[#CBD5E1] bg-[#f7f9fb] cursor-pointer hover:border-[#166b7f] hover:bg-[#166b7f]/5 transition-colors group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#eceef0] text-[#0F172A] group-hover:bg-[#166b7f]/10 group-hover:text-[#00696f] transition-colors shrink-0">
                    <Upload size={18} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {form.resume ? form.resume.name : 'Choose your resume'}
                    </p>
                    <p className="text-xs text-[#64748b] mt-0.5">PDF, DOC, or DOCX — maximum 5 MB</p>
                  </div>
                </label>
                <input
                  ref={fileInputRef}
                  id="career-resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleResumeChange}
                  required
                  className="sr-only"
                />
              </div>

              {/* Status message */}
              {status.message && (
                <div
                  role="status"
                  className={`mb-5 px-4 py-3 text-sm font-medium border-l-4 ${
                    status.type === 'success'
                      ? 'bg-green-50 border-green-500 text-green-800'
                      : 'bg-red-50 border-red-500 text-red-800'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-xs text-[#64748b]">
                  Our HR team reviews all applications within 5 business days.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2.5 bg-[#0F172A] hover:bg-[#1e293b] disabled:opacity-60 text-white px-6 py-3 text-sm font-bold transition-colors"
                >
                  <Send size={15} />
                  {submitting ? 'Submitting…' : 'Submit Application'}
                </button>
              </div>
            </form>

            {/* Email fallback */}
            <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Or</span>
              <p className="text-sm text-[#44474d]">
                Send your resume directly to our HR team at{' '}
                <a
                  href="mailto:hr@srilinelectronics.com"
                  className="inline-flex items-center gap-1.5 text-[#0F172A] font-semibold hover:text-[#00696f] transition-colors"
                >
                  <Mail size={14} />
                  hr@srilinelectronics.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0F172A] relative overflow-hidden py-14 md:py-16">
        <div className="absolute right-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#166b7f]/40 to-transparent hidden md:block" />
        <div className="absolute right-16 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#166b7f]/20 to-transparent hidden md:block" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-lg">
            <h3 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-white mb-3">
              Have questions before applying?
            </h3>
            <p className="text-white/60 text-sm md:text-base">
              Reach our HR team to learn more about open roles, work culture, and
              what a career at SriLin looks like day-to-day.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="mailto:hr@srilinelectronics.com"
              className="inline-flex items-center justify-center gap-2 bg-[#166b7f] text-[#0F172A] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Mail size={15} /> Email HR Team
            </a>
            <a
              href="#career-resume"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <Upload size={15} /> Upload Resume
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}