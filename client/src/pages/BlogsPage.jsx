import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
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
    <section className="bg-[#f7f9fb] min-h-screen font-['Inter']">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#0F172A] min-h-[340px] sm:min-h-[380px] md:min-h-[420px] flex items-center">
        <img
          src="/image.png"
          alt="Engineering manufacturing floor"
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
              Engineering Journal
            </p>
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4">
              Insights &amp; Technical Updates
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg">
              Read the latest engineering, manufacturing, and quality articles from our team.
            </p>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white shadow-sm backdrop-blur-sm">
            <BookOpen size={18} />
            <span>{blogs.length} blog posts</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#00f1fe]/60 via-[#00f1fe]/10 to-transparent" />
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {loading ? (
          <div className="bg-white border border-[#E2E8F0] p-10 text-center text-[#44474d]">
            Loading blogs…
          </div>
        ) : error ? (
          <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] p-6 text-center">
            {error}
          </div>
        ) : !blogs.length ? (
          <div className="bg-white border border-[#E2E8F0] p-10 text-center text-[#44474d]">
            No blogs available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="group bg-white border border-[#E2E8F0] hover:border-[#00f1fe] transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-48 overflow-hidden bg-[#eceef0]">
                  <img
                    src={blog.image?.url || '/image.png'}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  {blog.readTime && (
                    <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#334155]">
                      <Clock size={14} /> {blog.readTime}
                    </span>
                  )}
                  <h3 className="font-['JetBrains_Mono'] font-semibold text-lg text-[#0F172A] leading-snug group-hover:text-[#00696f] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-[#44474d] line-clamp-3">
                    {blog.description}
                  </p>
                  <Link
                    to={`/resources/blog/${blog._id}`}
                    className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#00696f] hover:underline pt-2"
                  >
                    Read full article
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}