/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from 'react';
import { CircleHelp, Eye, EyeOff } from 'lucide-react';
import api from '../api/axios';
import { AdminPagination, EmptyState, LoadingState, MiniStat } from '../components/AdminUi';
import { paginateItems } from '../utils/adminPagination';

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '', isActive: true });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);

  const loadFaqs = async () => {
    setPageLoading(true);
    try {
      const res = await api.get('/faqs?all=true');
      setFaqs(res.data.faqs || []);
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to load FAQs');
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const stats = useMemo(() => ({
    total: faqs.length,
    active: faqs.filter((faq) => faq.isActive).length,
    hidden: faqs.filter((faq) => !faq.isActive).length,
  }), [faqs]);
  const { visibleItems, totalPages } = paginateItems(faqs, page, 8);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/faqs/${editingId}`, form);
      } else {
        await api.post('/faqs', form);
      }

      setForm({ question: '', answer: '', isActive: true });
      setEditingId(null);
      setMessage(editingId ? 'FAQ updated successfully' : 'FAQ added successfully');
      await loadFaqs();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Could not save FAQ');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (faq) => {
    setEditingId(faq._id);
    setForm({ question: faq.question, answer: faq.answer, isActive: faq.isActive });
  };

  const toggleActive = async (faq) => {
    try {
      await api.put(`/faqs/${faq._id}`, { ...faq, isActive: !faq.isActive });
      setMessage('FAQ status updated');
      await loadFaqs();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Could not update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      await api.delete(`/faqs/${id}`);
      setMessage('FAQ deleted');
      await loadFaqs();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="admin-users-page">
      <section className="inner-stat-grid">
        <MiniStat icon={CircleHelp} label="Total FAQs" value={stats.total} tone="blue" />
        <MiniStat icon={Eye} label="Visible" value={stats.active} tone="green" />
        <MiniStat icon={EyeOff} label="Hidden" value={stats.hidden} tone="orange" />
      </section>

      <div className="admin-panel-card">
        <div className="admin-card-header">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2>{editingId ? 'Update question' : 'Create question'}</h2>
          </div>
          <span className="admin-chip">{faqs.length} items</span>
        </div>

        {message ? <div className="admin-alert">{message}</div> : null}

        <form className="admin-form hero-form" onSubmit={handleSubmit}>
          <input placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
          <textarea placeholder="Answer" rows="5" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
          <div className="status-toggle-row">
            <button
              type="button"
              className={`status-toggle ${form.isActive ? 'active' : 'inactive'}`}
              onClick={() => setForm({ ...form, isActive: !form.isActive })}
            >
              {form.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
          <div className="form-actions">
            <button className="primary-btn" type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update FAQ' : 'Add FAQ'}
            </button>
            {editingId ? (
              <button type="button" className="secondary-btn" onClick={() => { setEditingId(null); setForm({ question: '', answer: '', isActive: true }); }}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="admin-panel-card">
        <div className="admin-card-header">
          <div>
            <p className="eyebrow">Knowledge Base</p>
            <h2>Question library</h2>
          </div>
        </div>
        {pageLoading ? <LoadingState label="Loading FAQs" /> : null}
        {!pageLoading && !faqs.length ? <EmptyState title="No FAQs yet" text="Add common questions to help visitors get answers quickly." /> : null}
        {!pageLoading && faqs.length ? (
          <>
            <div className="faq-list">
              {visibleItems.map((faq) => (
                <div className="faq-item" key={faq._id}>
                  <div className="hero-card-top">
                    <h3>{faq.question}</h3>
                    <span className={`status-pill ${faq.isActive ? 'active' : 'inactive'}`}>
                      {faq.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                  <p className="blog-description">{faq.answer}</p>
                  <div className="action-group">
                    <button className="table-btn" onClick={() => startEdit(faq)}>Edit</button>
                    <button className="table-btn" onClick={() => toggleActive(faq)}>{faq.isActive ? 'Hide' : 'Show'}</button>
                    <button className="table-btn danger" onClick={() => handleDelete(faq._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        ) : null}
      </div>
    </div>
  );
}
