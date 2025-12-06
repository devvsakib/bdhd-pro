import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setCity } from '../../store/slices/facilitiesSlice';
import { Hospital, Activity, Stethoscope, Pill } from 'lucide-react';

const FacilityFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.facilities);

  const categories = [
    { id: 'all', name: 'All', icon: Hospital },
    { id: 'Hospital', name: 'Hospitals', icon: Hospital },
    { id: 'Diagnostic', name: 'Diagnostics', icon: Activity },
    { id: 'Clinic', name: 'Clinics', icon: Stethoscope },
    { id: 'Pharmacy', name: 'Pharmacies', icon: Pill }
  ];

  const cities = [
    'All Cities',
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barishal',
    'Rangpur',
    'Mymensingh'
  ];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Category</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => dispatch(setCategory(category.id))}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${filters.category === category.id
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* City Filter */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
        <div className="flex flex-wrap gap-3">
          {cities.map((city, idx) => (
            <button
              key={idx}
              onClick={() => dispatch(setCity(city === 'All Cities' ? 'all' : city))}
              className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${(city === 'All Cities' && filters.city === 'all') || filters.city === city
                  ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilityFilters;