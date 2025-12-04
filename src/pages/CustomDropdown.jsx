import React, { useState, useRef, useEffect } from 'react';

function CustomDropdown({
    data = [],
    value,
    onChange,
    placeholder = 'Select option',
    name = 'value',
    disabled = false,
    error = null,
}) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selected = data.find(d => String(d.id) === String(value));

    const handleSelect = (item) => {
        // Emit a synthetic event shape compatible with form handlers
        onChange({ target: { name, value: item.id } });
        setOpen(false);
    };

    const getInitials = (nameStr = '') => {
        const parts = nameStr.trim().split(/\s+/);
        const first = parts[0]?.[0] || '';
        const last = parts[1]?.[0] || '';
        return (first + last).toUpperCase();
    };

    return (
        <div ref={rootRef} className="relative w-full">
            {/* Selected View */}
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 border rounded-xl bg-white"
            >
                <div className={`flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {selected?.image ? (
                        <img src={selected?.gender ? `/images/${selected?.gender}-doc.jpg` : selected?.image} alt={selected.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : selected ? (
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                            {getInitials(selected.name)}
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100" />
                    )}

                    <div className="text-left">
                        <div className="text-sm font-medium">{selected ? selected.name : placeholder}</div>
                        {selected && <div className="text-xs text-slate-500">{selected.specialty}</div>}
                    </div>
                </div>

                <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
            </button>
            {error && <i className='text-red-500'>{error}</i>}

            {/* Dropdown Menu */}
            {open && (
                <ul className="absolute z-50 mt-2 w-full max-h-64 overflow-auto bg-white rounded-xl shadow-lg border">
                    {data.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className="cursor-pointer px-4 py-3 flex items-center gap-3 hover:bg-slate-50"
                        >
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                                    {getInitials(item.name)}
                                </div>
                            )}

                            <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                {item.specialty && <div className="text-sm text-slate-500">{item.specialty}</div>}
                            </div>

                            {item.fee && <div className="text-sm text-slate-400">{item.fee} ৳</div>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomDropdown;
