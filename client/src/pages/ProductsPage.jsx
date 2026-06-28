import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, Sparkles } from 'lucide-react';
import api from '../api/axios';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/products');
        setProducts((res.data.products || []).filter((item) => item.isActive !== false));
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load products right now.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="data-section-shell">
      <div className="data-hero">
        <div>
          <p className="public-eyebrow">Products</p>
          <h1>Reliable product solutions designed for modern electronics requirements.</h1>
          <p>
            Explore active products and assemblies managed from the backend, with polished presentation for customers and partners.
          </p>
        </div>
        <div className="data-hero-badge">
          <Boxes size={20} />
          <span>{products.length} active products</span>
        </div>
      </div>

      {loading ? (
        <div className="data-state-card">Loading products...</div>
      ) : error ? (
        <div className="data-state-card error">{error}</div>
      ) : !products.length ? (
        <div className="data-state-card">No products available yet.</div>
      ) : (
        <div className="data-grid product-grid">
          {products.map((product) => (
            <article className="data-card product-card" key={product._id}>
              <div className="card-visual">
                <img src={product.image?.url || '/image.png'} alt={product.name} />
                <div className="card-visual-overlay">
                  <span className="chip">Featured</span>
                  <span className="chip subtle">Electronics</span>
                </div>
              </div>
              <div className="data-card-body">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                {product.specifications?.length ? (
                  <ul className="data-list">
                    {product.specifications.slice(0, 3).map((spec) => (
                      <li key={spec}><Sparkles size={14} />{spec}</li>
                    ))}
                  </ul>
                ) : null}
                <Link className="inline-link" to={`/products/${product._id}`}>
                  View full details <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
