import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import api from '../api/axios';


import StructuredJsonEditor from '../components/StructuredJsonEditor';

export default function AdminContent() {
  const [contentItems, setContentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  // Tab state
  const [activeTab, setActiveTab] = useState('');
  
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await api.get('/content');
      if (res.data.success) {
        setContentItems(res.data.content);
        
        // Auto-select first tab if not set
        const groups = [...new Set(res.data.content.map(item => item.page))].sort();
        if (groups.length > 0 && !activeTab) {
          setActiveTab(groups[0]);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load content settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key, value) => {
    try {
      setSaving(true);
      await api.put(`/content/${key}`, { value });
      setEditingItem(null);
      await fetchContent();
    } catch (err) {
      console.error(err);
      alert('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (item) => {
    setEditingItem(item.key);
    setEditValue(item.value);
  };

  if (loading) {
    return <div className="p-8 text-[#64748b] animate-pulse">Loading content settings...</div>;
  }

  // Group items by page
  const groupedContent = contentItems.reduce((acc, item) => {
    if (!acc[item.page]) acc[item.page] = [];
    acc[item.page].push(item);
    return acc;
  }, {});

  const groups = Object.keys(groupedContent).sort();
  const currentItems = groupedContent[activeTab] || [];

  return (
    <div className="admin-page flex flex-col min-h-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-['JetBrains_Mono'] mb-2">Site Content</h1>
          <p className="text-[#64748b] text-sm">Manage static text, configurations, and general content across the website.</p>
        </div>
        <button 
          onClick={fetchContent}
          className="bg-white border border-[#E2E8F0] hover:border-[#c29f5d] text-[#334155] px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
        >
          Refresh Data
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {contentItems.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-xl border border-dashed border-[#cbd5e1]">
          <FileText size={48} className="mx-auto text-[#cbd5e1] mb-4" />
          <h3 className="text-lg font-semibold text-[#0F172A] mb-1">No content configured</h3>
          <p className="text-[#64748b] mb-6">Run the database seed script or click the button below to populate initial site content.</p>
          <button
            onClick={async () => {
              try {
                setLoading(true);
                await api.post('/content/seed');
                await fetchContent();
              } catch (err) {
                console.error(err);
                alert('Failed to seed content: ' + (err.response?.data?.message || err.message));
                setLoading(false);
              }
            }}
            className="bg-[#c29f5d] hover:bg-[#9a7a3e] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            Seed Initial Content
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Tabs Sidebar */}
          <div className="w-full lg:w-64 shrink-0 bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#f8fafc] px-4 py-3 border-b border-[#E2E8F0]">
              <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Pages / Sections</h3>
            </div>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
              {groups.map(group => (
                <button
                  key={group}
                  onClick={() => setActiveTab(group)}
                  className={`flex-1 lg:flex-none text-left px-4 py-3 text-sm font-medium transition-colors border-b lg:border-b-0 lg:border-l-4 whitespace-nowrap ${
                    activeTab === group 
                      ? 'bg-[#fefce8] text-[#9a7a3e] border-[#c29f5d] lg:border-b-0 border-b-4' 
                      : 'text-[#64748b] border-transparent hover:bg-[#f8fafc] hover:text-[#0F172A]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{group}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === group ? 'bg-[#c29f5d]/20 text-[#9a7a3e]' : 'bg-[#e2e8f0] text-[#64748b]'}`}>
                      {groupedContent[group].length}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 w-full bg-white border border-[#E2E8F0] rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#f8fafc]">
              <h2 className="font-['JetBrains_Mono'] font-bold text-lg text-[#0F172A]">Editing: {activeTab}</h2>
            </div>
            
            <div className="p-6 divide-y divide-[#E2E8F0]">
              {currentItems.map(item => (
                <div key={item.key} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[#0F172A] text-lg">{item.label}</h3>
                          <span className="text-[10px] uppercase font-['JetBrains_Mono'] tracking-wider bg-[#e0f2fe] text-[#0369a1] px-2 py-0.5 rounded">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-[#64748b]">{item.key}</p>
                      </div>
                    </div>
                    
                    {editingItem === item.key ? (
                      <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#E2E8F0]">
                        {item.type === 'json' ? (
                          <StructuredJsonEditor 
                            value={editValue} 
                            onChange={setEditValue} 
                          />
                        ) : item.type === 'text' ? (
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full h-48 p-4 font-mono text-sm border border-[#c29f5d] rounded-lg focus:ring-2 focus:ring-[#c29f5d]/30 outline-none bg-[#fefce8]"
                            spellCheck="false"
                          />
                        ) : (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full p-3 text-sm border border-[#c29f5d] rounded-lg focus:ring-2 focus:ring-[#c29f5d]/30 outline-none bg-[#fefce8]"
                          />
                        )}
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => handleSave(item.key, editValue)}
                            disabled={saving}
                            className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1e293b] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                          >
                            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="px-4 py-2 text-sm font-semibold text-[#64748b] hover:text-[#0F172A] transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="bg-white border border-[#E2E8F0] rounded-xl cursor-pointer hover:border-[#c29f5d] hover:shadow-md transition-all relative group overflow-hidden"
                        onClick={() => startEditing(item)}
                      >
                        <div className="bg-[#f8fafc] px-4 py-2 flex items-center justify-between border-b border-[#E2E8F0]">
                          <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Current Value</span>
                          <span className="text-[11px] bg-[#c29f5d] text-white px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Click to edit
                          </span>
                        </div>
                        <div className="p-4 bg-white">
                          {item.type === 'json' ? (
                            <pre className="text-xs font-mono text-[#334155] whitespace-pre-wrap max-h-60 overflow-y-auto m-0">
                              {JSON.stringify(item.value, null, 2)}
                            </pre>
                          ) : (
                            <p className="text-sm text-[#334155]">{item.value?.toString() || <span className="text-gray-400 italic">Empty</span>}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
