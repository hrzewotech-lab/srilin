import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import api from '../api/axios';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog/${id}`);
        setBlog(res.data.blog);
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load this article right now.');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  return (
    <section className="detail-shell">
      <Link className="back-link" to="/resources/blog">
        <ArrowLeft size={16} /> Back to blog
      </Link>

      {loading ? (
        <div className="data-state-card">Loading article details...</div>
      ) : error ? (
        <div className="data-state-card error">{error}</div>
      ) : !blog ? (
        <div className="data-state-card">No article found.</div>
      ) : (
        <div className="detail-card article-card">
          <img src={blog.image?.url || '/image.png'} alt={blog.title} />
          <div className="detail-content">
            <div className="detail-badges">
              <span className="chip">Article</span>
              <span className="chip subtle">Engineering insight</span>
            </div>
            <div className="detail-heading">
              <BookOpen size={20} />
              <h1>{blog.title}</h1>
            </div>
            <p className="detail-description">{blog.description}</p>

            <div className="detail-actions">
              <Link className="detail-primary" to="/contact-us">Discuss this topic</Link>
              <Link className="detail-secondary" to="/resources/blog">Browse other articles</Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
