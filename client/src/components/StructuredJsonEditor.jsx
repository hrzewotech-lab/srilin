import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function StructuredJsonEditor({ value, onChange }) {
  const [data, setData] = useState(value);
  const [mode, setMode] = useState('structured'); // 'structured' or 'raw'
  
  useEffect(() => {
    setData(value);
  }, [value]);

  const handleChange = (newData) => {
    setData(newData);
    onChange(newData);
  };

  // Determine data type
  const isArray = Array.isArray(data);
  const isObject = !isArray && data !== null && typeof data === 'object';
  const isArrayOfObjects = isArray && data.length > 0 && typeof data[0] === 'object' && data[0] !== null;
  const isArrayOfStrings = isArray && (data.length === 0 || typeof data[0] === 'string');

  if (mode === 'raw' || (!isArray && !isObject)) {
    return (
      <div className="space-y-3">
        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={() => {
              try {
                if (typeof data === 'string') {
                  const parsed = JSON.parse(data);
                  handleChange(parsed);
                }
                setMode('structured');
              } catch (e) {
                alert('Invalid JSON format');
              }
            }}
            className="text-xs font-semibold text-[#c29f5d] hover:underline"
          >
            Switch to Structured Editor
          </button>
        </div>
        <textarea
          value={typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
          onChange={(e) => {
            setData(e.target.value);
            // We don't call onChange here to avoid sending invalid JSON during typing.
            // It will be parsed when saving or switching modes.
          }}
          onBlur={(e) => {
             try {
               const parsed = JSON.parse(e.target.value);
               onChange(parsed);
             } catch(err) {
               onChange(e.target.value);
             }
          }}
          className="w-full h-48 p-4 font-mono text-sm border border-[#c29f5d] rounded-lg focus:ring-2 focus:ring-[#c29f5d]/30 outline-none bg-[#fefce8]"
          spellCheck="false"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button 
          type="button" 
          onClick={() => setMode('raw')}
          className="text-xs font-semibold text-[#64748b] hover:text-[#0F172A]"
        >
          Switch to Raw JSON
        </button>
      </div>

      {isArrayOfObjects && (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="p-4 border border-[#E2E8F0] rounded-xl bg-white flex gap-4 items-start relative group shadow-sm">
              <div className="pt-2 text-[#94A3B8] cursor-grab active:cursor-grabbing">
                <GripVertical size={16} />
              </div>
              <div className="flex-1 space-y-3">
                {Object.keys(item).map(key => (
                  <div key={key} className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <label className="w-24 text-xs font-semibold text-[#64748b] uppercase tracking-wider">{key}</label>
                    {typeof item[key] === 'string' && item[key].length > 50 ? (
                      <textarea
                        value={item[key]}
                        onChange={(e) => {
                          const newData = [...data];
                          newData[index] = { ...item, [key]: e.target.value };
                          handleChange(newData);
                        }}
                        className="flex-1 p-2 text-sm border border-[#E2E8F0] rounded-md focus:border-[#c29f5d] outline-none"
                        rows={3}
                      />
                    ) : (
                      <input
                        type="text"
                        value={item[key]}
                        onChange={(e) => {
                          const newData = [...data];
                          newData[index] = { ...item, [key]: e.target.value };
                          handleChange(newData);
                        }}
                        className="flex-1 p-2 text-sm border border-[#E2E8F0] rounded-md focus:border-[#c29f5d] outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => {
                  const newData = [...data];
                  newData.splice(index, 1);
                  handleChange(newData);
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const template = data.length > 0 ? Object.keys(data[0]).reduce((acc, key) => ({ ...acc, [key]: '' }), {}) : {};
              handleChange([...data, template]);
            }}
            className="w-full py-3 border-2 border-dashed border-[#E2E8F0] text-[#64748b] font-semibold text-sm rounded-xl hover:border-[#c29f5d] hover:text-[#c29f5d] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
      )}

      {isArrayOfStrings && (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newData = [...data];
                  newData[index] = e.target.value;
                  handleChange(newData);
                }}
                className="flex-1 p-3 text-sm border border-[#E2E8F0] rounded-lg focus:border-[#c29f5d] outline-none shadow-sm"
              />
              <button 
                onClick={() => {
                  const newData = [...data];
                  newData.splice(index, 1);
                  handleChange(newData);
                }}
                className="p-3 text-red-500 border border-[#E2E8F0] hover:bg-red-50 hover:border-red-200 rounded-lg transition-colors bg-white shadow-sm"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            onClick={() => handleChange([...data, ''])}
            className="w-full py-3 border-2 border-dashed border-[#E2E8F0] text-[#64748b] font-semibold text-sm rounded-xl hover:border-[#c29f5d] hover:text-[#c29f5d] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Text Item
          </button>
        </div>
      )}

      {isObject && (
        <div className="p-5 border border-[#E2E8F0] rounded-xl bg-white space-y-4 shadow-sm">
          {Object.keys(data).map(key => (
            <div key={key} className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <label className="w-32 text-xs font-semibold text-[#64748b] uppercase tracking-wider">{key}</label>
              {typeof data[key] === 'string' && data[key].length > 50 ? (
                <textarea
                  value={data[key]}
                  onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
                  className="flex-1 p-2 text-sm border border-[#E2E8F0] rounded-md focus:border-[#c29f5d] outline-none"
                  rows={3}
                />
              ) : (
                <input
                  type="text"
                  value={data[key]}
                  onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
                  className="flex-1 p-2 text-sm border border-[#E2E8F0] rounded-md focus:border-[#c29f5d] outline-none"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
