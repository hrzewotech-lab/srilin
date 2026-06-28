import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import api from '../api/axios';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get('/blog');
        setBlogs((res.data.blogs || []).filter((item) => item.isActive !== false));
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load blogs right now.');
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <section className="data-section-shell">
      <div className="data-hero">
        <div>
          <p className="public-eyebrow">Blogs</p>
          <h1>Insights from our engineering, manufacturing, and quality teams.</h1>
          <p>
            Read the latest updates and knowledge-sharing articles directly from the backend content database.
          </p>
        </div>
        <div className="data-hero-badge">
          <BookOpen size={20} />
          <span>{blogs.length} blog posts</span>
        </div>
      </div>

      {loading ? (
        <div className="data-state-card">Loading blogs...</div>
      ) : error ? (
        <div className="data-state-card error">{error}</div>
      ) : !blogs.length ? (
        <div className="data-state-card">No blogs available yet.</div>
      ) : (
        <div className="data-grid blog-grid">
          {blogs.map((blog) => (
            <article className="data-card blog-card" key={blog._id}>
              <div className="card-visual">
                <img src={blog.image?.url || '/image.png'} alt={blog.title} />
              </div>
              <div className="data-card-body">
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <Link className="inline-link" to={`/resources/blog/${blog._id}`}>
                  Read full article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
