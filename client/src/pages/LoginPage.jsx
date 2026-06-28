import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import api from '../api/axios';

const accessHighlights = [
  'Secure role-based access',
  'Manage website content',
  'Control products and services',
  'Publish updates with confidence',
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(Boolean(localStorage.getItem('rememberedEmail')));
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('authUser', JSON.stringify(user));
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', form.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      if (user?.role === 'admin' || user?.role === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-screen">
      <div className="login-brand-panel">
        <div className="login-brand-content">
          <Link className="login-logo" to="/" aria-label="Go to SriLin homepage">
            <img src="/SrilinLogo_NSG.png" alt="SriLin" />
          </Link>

          <p className="login-brand-kicker">SriLin Electronics Private Limited</p>
          <h1>Manage SriLin’s digital presence securely.</h1>
          <p className="login-brand-copy">
            Access the administration portal to keep company content, capabilities, and customer
            resources accurate and up to date.
          </p>

          <ul className="login-highlights">
            {accessHighlights.map((highlight) => (
              <li key={highlight}>
                <CheckCircle2 size={20} aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-card">
          <span className="login-card-icon"><LockKeyhole size={24} aria-hidden="true" /></span>
          <div className="login-card-heading">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to the admin portal</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="login-password">Password</label>
            <div className="login-password-field">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/contact-us">Need help signing in?</Link>
            </div>

            {error ? <p className="login-error" role="alert">{error}</p> : null}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="login-security-note">
            Protected access for authorized SriLin team members only.
          </p>
        </div>
      </div>
    </section>
  );
}
