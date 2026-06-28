/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import api from '../api/axios';
import { AdminPagination, EmptyState, LoadingState, MiniStat } from '../components/AdminUi';
import { paginateItems } from '../utils/adminPagination';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', bullets: '', isActive: true, image: null });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);

  const loadServices = async () => {
    setPageLoading(true);
    try {
      const res = await api.get('/services?all=true');
      setServices(res.data.services || []);
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to load services');
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const stats = useMemo(() => ({
    total: services.length,
    active: services.filter((service) => service.isActive).length,
    hidden: services.filter((service) => !service.isActive).length,
  }), [services]);
  const { visibleItems, totalPages } = paginateItems(services, page);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('title', form.title);
      payload.append('description', form.description);
      payload.append('bullets', form.bullets);
      payload.append('isActive', form.isActive);
      if (form.image) payload.append('image', form.image);

      if (editingId) {
        await api.put(`/services/${editingId}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/services', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
      }

      setForm({ title: '', description: '', bullets: '', isActive: true, image: null });
      setEditingId(null);
      setMessage(editingId ? 'Service updated successfully' : 'Service added successfully');
      await loadServices();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Could not save service');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title,
      description: service.description,
      bullets: service.bullets?.join('\n') || '',
      isActive: service.isActive,
      image: null,
    });
  };

  const toggleActive = async (service) => {
    try {
      await api.put(`/services/${service._id}`, { isActive: !service.isActive }, { headers: { 'Content-Type': 'application/json' } });
      setMessage('Service status updated');
      await loadServices();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Could not update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      setMessage('Service deleted');
      await loadServices();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="admin-users-page">
      <section className="inner-stat-grid">
        <MiniStat icon={Sparkles} label="Total services" value={stats.total} tone="blue" />
        <MiniStat icon={Eye} label="Visible" value={stats.active} tone="green" />
        <MiniStat icon={EyeOff} label="Hidden" value={stats.hidden} tone="orange" />
      </section>

      <div className="admin-panel-card">
        <div className="admin-card-header">
          <div>
            <p className="eyebrow">Services</p>
            <h2>{editingId ? 'Update service' : 'Create service'}</h2>
          </div>
          <span className="admin-chip">{services.length} services</span>
        </div>

        {message ? <div className="admin-alert">{message}</div> : null}

        <form className="admin-form hero-form" onSubmit={handleSubmit}>
          <input placeholder="Service title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <label className="file-label">
            <span>{form.image ? form.image.name : 'Upload service image'}</span>
            <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
          </label>
          <textarea placeholder="Description" rows="5" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <textarea placeholder="Highlights / bullet points (one per line)" rows="5" value={form.bullets} onChange={(e) => setForm({ ...form, bullets: e.target.value })} />
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
              {loading ? 'Saving...' : editingId ? 'Update Service' : 'Add Service'}
            </button>
            {editingId ? (
              <button type="button" className="secondary-btn" onClick={() => { setEditingId(null); setForm({ title: '', description: '', bullets: '', isActive: true, image: null }); }}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="admin-panel-card">
        <div className="admin-card-header">
          <div>
            <p className="eyebrow">Showcase</p>
            <h2>Service cards</h2>
          </div>
        </div>
        {pageLoading ? <LoadingState label="Loading services" /> : null}
        {!pageLoading && !services.length ? <EmptyState title="No services yet" text="Create a service to show it on the website." /> : null}
        {!pageLoading && services.length ? (
          <>
            <div className="hero-grid admin-content-grid">
              {visibleItems.map((service) => (
                <div className="hero-card-item content-tile" key={service._id}>
                  <img src={service.image?.url} alt={service.title} />
                  <div className="hero-card-body">
                    <div className="hero-card-top">
                      <h3>{service.title}</h3>
                      <span className={`status-pill ${service.isActive ? 'active' : 'inactive'}`}>{service.isActive ? 'Active' : 'Hidden'}</span>
                    </div>
                    <p>{service.description}</p>
                    <div className="spec-list">
                      <strong>Highlights</strong>
                      <ul>{service.bullets?.map((bullet, index) => <li key={index}>{bullet}</li>)}</ul>
                    </div>
                    <div className="action-group">
                      <button className="table-btn" onClick={() => startEdit(service)}>Edit</button>
                      <button className="table-btn" onClick={() => toggleActive(service)}>{service.isActive ? 'Hide' : 'Show'}</button>
                      <button className="table-btn danger" onClick={() => handleDelete(service._id)}>Delete</button>
                    </div>
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
