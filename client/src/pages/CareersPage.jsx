import { useRef, useState } from 'react';
import { BriefcaseBusiness, CheckCircle2, Mail, Send, Upload } from 'lucide-react';
import api from '../api/axios';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  resume: null,
};

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
    <section className="careers-page">
      <div className="careers-intro">
        <span className="careers-intro-icon">
          <BriefcaseBusiness size={25} aria-hidden="true" />
        </span>
        <p className="public-eyebrow">Join SriLin</p>
        <h1>Careers in Electronics Manufacturing &amp; PCB Assembly</h1>
        <p>
          Build practical experience in electronics manufacturing, quality, engineering, and
          production operations with a team focused on dependable work.
        </p>

        <div className="careers-points">
          <span><CheckCircle2 size={18} />Hands-on technical exposure</span>
          <span><CheckCircle2 size={18} />Collaborative engineering culture</span>
          <span><CheckCircle2 size={18} />Learning and growth opportunities</span>
        </div>
      </div>

      <div className="career-application-card">
        <div className="career-form-heading">
          <p className="section-kicker">Career Application</p>
          <h2>Submit your resume</h2>
          <p>Complete the details below and our HR team will review your application.</p>
        </div>

        <form className="career-form" onSubmit={handleSubmit}>
          <div className="career-field">
            <label htmlFor="career-name">Name</label>
            <input
              id="career-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="career-field">
            <label htmlFor="career-email">Email</label>
            <input
              id="career-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="career-field">
            <label htmlFor="career-phone">Phone</label>
            <input
              id="career-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="career-field">
            <label htmlFor="career-address">Address</label>
            <textarea
              id="career-address"
              name="address"
              rows="4"
              autoComplete="street-address"
              placeholder="Enter your current address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="career-field">
            <label htmlFor="career-resume">Upload Resume</label>
            <label className="career-file-picker" htmlFor="career-resume">
              <Upload size={20} aria-hidden="true" />
              <span>
                <strong>{form.resume ? form.resume.name : 'Choose your resume'}</strong>
                <small>PDF, DOC, or DOCX — maximum 5 MB</small>
              </span>
            </label>
            <input
              ref={fileInputRef}
              id="career-resume"
              className="career-file-input"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleResumeChange}
              required
            />
          </div>

          {status.message ? (
            <p className={`career-form-status ${status.type}`} role="status">
              {status.message}
            </p>
          ) : null}

          <button className="career-submit" type="submit" disabled={submitting}>
            <Send size={18} aria-hidden="true" />
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        <div className="career-email-option">
          <span>OR</span>
          <p>
            Send your resume directly to our HR email ID
            <a href="mailto:hr@srilinelectronics.com">
              <Mail size={17} aria-hidden="true" />
              hr@srilinelectronics.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
