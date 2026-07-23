import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content');
        if (res.data.success) {
          const contentMap = {};
          res.data.content.forEach(item => {
            contentMap[item.key] = item.value;
          });
          setContent(contentMap);
        }
      } catch (error) {
        console.error('Failed to load site content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, loading }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}
