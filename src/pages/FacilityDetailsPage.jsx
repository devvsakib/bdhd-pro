import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'motion/react';
import {
    MapPin, Phone, Clock, Mail, Award, Star,
    Calendar, Navigation, Share2, Heart, ChevronLeft,
    CheckCircle, AlertCircle
} from 'lucide-react';
import { fetchFacilityById } from '../store/slices/facilitiesSlice';
import { selectDoctorsByFacilityName } from '../store/selectors'

const FacilityDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedFacility, loading } = useSelector((state) => state.facilities);
    const [doctorsHere, setDoctorsHere] = useState([])

    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        dispatch(fetchFacilityById(id));
    }, [dispatch, id]);
    
    useEffect(() => {
        const fetchDoctors = async () => {
            const doctors = await selectDoctorsByFacilityName(selectedFacility?.name);
            setDoctorsHere(doctors);
        };
        fetchDoctors();
    }, [selectedFacility]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!selectedFacility) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Facility not found</h2>
                    <button onClick={() => navigate('/facilities')} className="text-blue-600 hover:underline">
                        Go back to facilities
                    </button>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'services', label: 'Services' },
        { id: 'doctors', label: 'Doctors' },
        { id: 'reviews', label: 'Reviews' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <div className="relative h-[400px] bg-linear-to-r from-blue-600 to-purple-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <img
                    src={selectedFacility.image}
                    alt={selectedFacility.name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                />

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 bg-white/20 backdrop-blur-xl border border-white/30 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/60 to-transparent">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <h1 className="text-5xl font-black text-white">{selectedFacility.name}</h1>
                            {selectedFacility.verified && (
                                <div className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4" />
                                    Verified
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-6 text-white">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-xl font-bold">{selectedFacility.rating}</span>
                                <span className="text-white/80">({selectedFacility.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{selectedFacility.area}, {selectedFacility.city}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 mb-8 overflow-hidden">
                            <div className="flex border-b border-gray-200">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-8">
                                {activeTab === 'overview' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">About</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {selectedFacility.description || 'A leading healthcare facility providing comprehensive medical services with state-of-the-art technology and experienced medical professionals.'}
                                            </p>
                                        </div>

                                        {selectedFacility.specialties && (
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Specialties</h3>
                                                <div className="flex flex-wrap gap-3">
                                                    {selectedFacility.specialties.map((specialty, idx) => (
                                                        <span key={idx} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
                                                            {specialty}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {selectedFacility.insurance && (
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Insurance Accepted</h3>
                                                <div className="flex flex-wrap gap-3">
                                                    {selectedFacility.insurance.map((ins, idx) => (
                                                        <span key={idx} className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
                                                            {ins}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'services' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Services</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {selectedFacility.services.map((service, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                    <span className="font-semibold text-gray-900">{service}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'doctors' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Doctors</h3>
                                        {doctorsHere.length === 0 ? (
                                            <p className="text-gray-600">No doctors available at this facility.</p>
                                        ) : (
                                            <div className="grid md:grid-cols-2 gap-6">
                                                {doctorsHere.map((doctor) => (
                                                    <Link to={`/doctors/${doctor.id}`} key={doctor.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50 flex items-center gap-4">
                                                        <img
                                                            src={`/images/${doctor.gender}-doc.jpg`}
                                                            alt={doctor.name}
                                                            className="w-20 h-20 rounded-full object-cover border-2 border-blue-600"
                                                        />
                                                        <div>
                                                            <h4 className="text-xl font-bold text-gray-900">{doctor.name}</h4>
                                                            <p className="text-gray-600">{doctor.specialty}</p>
                                                            <p className="text-gray-500 text-sm mt-1">Experience: {doctor.experience} years</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'reviews' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h3>
                                        <p className="text-gray-600">Reviews coming soon...</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Address</p>
                                        <p className="text-gray-600">{selectedFacility.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Phone</p>
                                        <a href={`tel:${selectedFacility.phone}`} className="text-blue-600 hover:underline">
                                            {selectedFacility.phone}
                                        </a>
                                    </div>
                                </div>
                                {selectedFacility.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Email</p>
                                            <a href={`mailto:${selectedFacility.email}`} className="text-blue-600 hover:underline">
                                                {selectedFacility.email}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Hours</p>
                                        <p className="text-gray-600">{selectedFacility.hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button onClick={() => navigate(`/appointments/book?facilityId=${selectedFacility.id}`)} className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                                <Calendar className="w-5 h-5" />
                                Book Appointment
                            </button>
                            <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200">
                                <Navigation className="w-5 h-5" />
                                Get Directions
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200">
                                    <Share2 className="w-5 h-5" />
                                    Share
                                </button>
                                <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200">
                                    <Heart className="w-5 h-5" />
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        {selectedFacility.beds && (
                            <div className="bg-linear-to-br from-blue-50 to-purple-50 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Facility Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-xl p-4 text-center">
                                        <p className="text-3xl font-black text-blue-600">{selectedFacility.beds}</p>
                                        <p className="text-sm text-gray-600 font-semibold">Beds</p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 text-center">
                                        <p className="text-3xl font-black text-purple-600">{selectedFacility.doctors}</p>
                                        <p className="text-sm text-gray-600 font-semibold">Doctors</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacilityDetailsPage;