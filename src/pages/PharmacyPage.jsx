import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPharmacies,
  setCategory,
  setCity,
  setSearchQuery,
  setSelectedPharmacy,
  clearFilters,
} from '../store/slices/pharmaSlice';
import { Search, MapPin, Filter, Star, ExternalLink } from 'lucide-react';

// PharmacyPage component
export default function PharmacyPage() {
  const dispatch = useDispatch();
  const { pharmacies, loading, error, filters, selectedPharmacy } = useSelector(
    (state) => state.pharma
  );

  const [localQuery, setLocalQuery] = useState(filters.searchQuery || '');

  useEffect(() => {
    // fetch on mount
    dispatch(fetchPharmacies());
  }, [dispatch]);

  // debounce local search -> global store
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 350);
    return () => clearTimeout(t);
  }, [localQuery, dispatch]);

  const categories = ['all', 'Pharmacy'];
  // derive cities from loaded pharmacies (unique)
  const cities = ['all', ...Array.from(new Set((pharmacies || []).map((p) => p.city || ''))).filter(Boolean)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">Pharmacies</h1>
          <p className="text-sm text-gray-600 mt-1">Search, filter and view nearby pharmacies.</p>
        </header>

        <section className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700">Search</label>
            <div className="mt-1 relative">
              <input
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search by name, area or service"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-60">
                <Search size={18} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">City</label>
            <select
              value={filters.city}
              onChange={(e) => dispatch(setCity(e.target.value))}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="mb-6 flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Filter size={16} />
            <span>Filters</span>
          </div>

          <div className="flex gap-2 items-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => dispatch(setCategory(c))}
                className={`rounded-md px-3 py-1 text-sm border ${
                  filters.category === c ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200'
                }`}
                disabled={filters.category === c}
              >
                {c === 'all' ? 'All' : c}
              </button>
            ))}

            <button
              onClick={() => dispatch(clearFilters())}
              className="ml-2 text-sm text-indigo-600 underline"
            >
              Clear
            </button>
          </div>
        </section>

        <main>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg p-4 h-44 shadow-sm" />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-600">Error: {error}</div>
          ) : pharmacies && pharmacies.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pharmacies.map((p) => (
                <article key={p.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="flex flex-col h-full">
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Pharmacy';
                        }}
                      />
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-semibold">{p.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Star size={14} />
                            <span>{p.rating ?? '—'}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500 mt-1 truncate">{p.address}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {(p.services || []).slice(0, 3).map((s) => (
                            <span key={s} className="text-xs px-2 py-1 rounded-full border border-gray-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm">
                          <button
                            onClick={() => dispatch(setSelectedPharmacy(p))}
                            className="text-sm px-3 py-1 rounded-md border border-gray-200 bg-white"
                          >
                            View
                          </button>

                          <a
                            href={`https://${p.website?.replace(/^(https?:\/\/)?/, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-sm text-indigo-600"
                          >
                            Website <ExternalLink size={14} />
                          </a>
                        </div>

                        <div className="text-xs text-gray-500">{p.hours || 'Hours N/A'}</div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-gray-600">No pharmacies found.</div>
          )}
        </main>

        {/* Detail drawer / modal */}
        {selectedPharmacy && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => dispatch(setSelectedPharmacy(null))} />

            <div className="relative bg-white rounded-t-2xl md:rounded-2xl w-full md:w-3/5 max-w-3xl p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">{selectedPharmacy.name}</h2>
                  <p className="text-sm text-gray-600">{selectedPharmacy.address}</p>
                </div>

                <div className="flex gap-2 items-start">
                  <button
                    onClick={() => dispatch(setSelectedPharmacy(null))}
                    className="text-sm text-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                  src={selectedPharmacy.image}
                  alt={selectedPharmacy.name}
                  className="w-full h-48 object-cover rounded-md"
                />

                <div>
                  <p className="text-sm text-gray-700 mb-2">{selectedPharmacy.description}</p>

                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{selectedPharmacy.city} — {selectedPharmacy.area}</span>
                    </div>

                    <div className="mt-3">
                      <div className="font-medium">Contact</div>
                      <div className="text-sm text-gray-600">Phone: {selectedPharmacy.phone}</div>
                      {selectedPharmacy.email && <div className="text-sm text-gray-600">Email: {selectedPharmacy.email}</div>}
                      {selectedPharmacy.homeDelivery && <div className="text-sm text-green-600 mt-2">Home Delivery Available</div>}
                    </div>

                    {selectedPharmacy.branches && selectedPharmacy.branches.length > 0 && (
                      <div className="mt-4">
                        <div className="font-medium">Branches</div>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                          {selectedPharmacy.branches.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <a
                  href={`tel:${selectedPharmacy.phone}`}
                  className="px-4 py-2 rounded-md border bg-white"
                >
                  Call
                </a>
                <a
                  href={`https://${selectedPharmacy.website?.replace(/^(https?:\/\/)?/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
