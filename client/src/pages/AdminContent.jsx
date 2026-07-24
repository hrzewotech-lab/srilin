import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import api from '../api/axios';
import { LoadingState } from '../components/AdminUi';

export default function AdminContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [jsonText, setJsonText] = useState('');

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await api.get('/content/homepage_sections');
      const data = res.data?.data || {};
      setContent(data);
      setJsonText(JSON.stringify(data, null, 2));
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');
      
      let parsedData;
      try {
        parsedData = JSON.parse(jsonText);
      } catch (err) {
        throw new Error('Invalid JSON format. Please check for syntax errors.');
      }

      await api.put('/content/homepage_sections', { data: parsedData });
      setMessage('Content saved successfully!');
      setContent(parsedData);
    } catch (error) {
      setMessage(error.message || error?.response?.data?.message || 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-content-page">
      <div className="admin-panel-card">
        <div className="admin-card-header">
          <div>
            <p className="eyebrow">Site Content</p>
            <h2>Manage Global Content (JSON)</h2>
          </div>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="primary-btn inline-flex items-center gap-2"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Content'}
          </button>
        </div>

        {message && (
          <div className={`admin-alert ${message.includes('successfully') ? 'success' : 'error'}`} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: message.includes('success') ? '#dcfce7' : '#fee2e2', color: message.includes('success') ? '#166534' : '#991b1b', borderRadius: '0.5rem' }}>
            {message}
          </div>
        )}

        {loading ? (
          <LoadingState label="Loading global content..." />
        ) : (
          <div className="json-editor-container">
            <p className="muted-text" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
              Edit the raw JSON below to update static sections like Testimonials, Industries, Why Choose Us, etc. Make sure the JSON syntax is valid before saving.
            </p>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              style={{
                width: '100%',
                minHeight: '600px',
                fontFamily: 'monospace',
                padding: '1rem',
                backgroundColor: '#1e293b',
                color: '#e2e8f0',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                fontSize: '14px',
                lineHeight: '1.5',
                whiteSpace: 'pre',
                overflowWrap: 'normal',
                overflowX: 'auto',
              }}
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
