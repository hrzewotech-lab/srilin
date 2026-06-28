import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Boxes, Sparkles } from 'lucide-react';
import api from '../api/axios';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load this product right now.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return (
    <section className="detail-shell">
      <Link className="back-link" to="/products">
        <ArrowLeft size={16} /> Back to products
      </Link>

      {loading ? (
        <div className="data-state-card">Loading product details...</div>
      ) : error ? (
        <div className="data-state-card error">{error}</div>
      ) : !product ? (
        <div className="data-state-card">No product found.</div>
      ) : (
        <div className="detail-card">
          <img src={product.image?.url || '/image.png'} alt={product.name} />
          <div className="detail-content">
            <div className="detail-badges">
              <span className="chip">Electronics</span>
              <span className="chip subtle">Custom solution</span>
            </div>
            <div className="detail-heading">
              <Boxes size={20} />
              <h1>{product.name}</h1>
            </div>
            <p className="detail-description">{product.description}</p>

            {Array.isArray(product.specifications) && product.specifications.length ? (
              <div className="detail-section">
                <h2>Key highlights</h2>
                <ul className="data-list">
                  {product.specifications.map((spec) => (
                    <li key={spec}><Sparkles size={14} />{spec}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="detail-actions">
              <Link className="detail-primary" to="/contact-us">Request this solution</Link>
              <Link className="detail-secondary" to="/products">Explore more products</Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
