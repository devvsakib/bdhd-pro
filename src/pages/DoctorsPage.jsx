import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'motion/react';
import { Search, Filter, Star, Calendar, Award } from 'lucide-react';
import { fetchDoctors, setSpecialty, setDoctorSearchQuery } from '../store/slices/doctorsSlice';
import DoctorCard from '../components/doctors/DoctorCard';

const DoctorsPage = () => {
    const dispatch = useDispatch();
    const { doctors, filters, loading } = useSelector((state) => state.doctors);
    const [showFilters, setShowFilters] = useState(false);

    const specialties = [
        'All Specialties',
        'Cardiologist',
        'Neurologist',
        'Pediatrician',
        'Gynecologist',
        'Orthopedic',
        'Dermatologist',
        'ENT Specialist'
    ];

    useEffect(() => {
        dispatch(fetchDoctors(filters));
    }, [dispatch, filters]);

    const handleSearch = (e) => {
        dispatch(setDoctorSearchQuery(e.target.value));
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-black bg-linear-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-4">
                        Find Expert Doctors
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Connect with qualified medical professionals across Bangladesh
                    </p>
                </motion.div>

                {/* Search & Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-12 border border-gray-200/50"
                >
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by doctor name or specialty..."
                                value={filters.searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:w-auto px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                        >
                            <Filter className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-6 pt-6 border-t border-gray-200"
                        >
                            <div className="flex flex-wrap gap-3">
                                {specialties.map((specialty, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => dispatch(setSpecialty(specialty === 'All Specialties' ? 'all' : specialty))}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${(specialty === 'All Specialties' && filters.specialty === 'all') ||
                                                specialty === filters.specialty
                                                ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {specialty}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Results Count */}
                <div className="mb-8">
                    <p className="text-lg text-gray-700">
                        Found <span className="font-bold text-purple-600">{doctors.length}</span> doctors
                    </p>
                </div>

                {/* Doctors Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="animate-pulse">
                                <div className="bg-gray-200 h-96 rounded-3xl"></div>
                            </div>
                        ))}
                    </div>
                ) : doctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {doctors.map((doctor, idx) => (
                            <motion.div
                                key={doctor.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <DoctorCard doctor={doctor} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No doctors found</h3>
                        <p className="text-gray-600">Try adjusting your search or filters</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default DoctorsPage;