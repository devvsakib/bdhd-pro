import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Star, Award, MapPin, Clock, Phone, Mail,
    Calendar, Video, MessageCircle, Share2, Heart, CheckCircle,
    GraduationCap, Briefcase, Users, DollarSign, AlertCircle
} from 'lucide-react';
import { fetchDoctorById } from '../store/slices/doctorsSlice';

const DoctorProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedDoctor, loading } = useSelector((state) => state.doctors);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        dispatch(fetchDoctorById(id));
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!selectedDoctor) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor not found</h2>
                    <button onClick={() => navigate('/doctors')} className="text-purple-600 hover:underline">
                        Go back to doctors
                    </button>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'experience', label: 'Experience' },
        { id: 'reviews', label: 'Reviews' },
        { id: 'schedule', label: 'Schedule' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50">
            {/* Hero Section */}
            <div className="relative bg-linear-to-r from-purple-600 via-blue-600 to-purple-700 text-white py-20">
                <div className="absolute inset-0 bg-black/10"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 bg-white/20 backdrop-blur-xl border border-white/30 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2 z-10"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Doctor Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-3xl overflow-hidden border-8 border-white/30 shadow-2xl backdrop-blur-xl">
                                <img
                                    src={`/images/${selectedDoctor.gender}-doc.jpg`} 
                                    alt={selectedDoctor.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {selectedDoctor.verified && (
                                <div className="absolute -top-3 -right-3 bg-blue-500 text-white p-3 rounded-full shadow-2xl border-4 border-white">
                                    <Award className="w-8 h-8" />
                                </div>
                            )}
                        </motion.div>

                        {/* Doctor Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-1 text-center lg:text-left"
                        >
                            <h1 className="text-5xl font-black mb-3">{selectedDoctor.name}</h1>
                            <p className="text-3xl font-bold text-purple-200 mb-6">{selectedDoctor.specialty}</p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    <span className="text-2xl font-bold">{selectedDoctor.rating}</span>
                                    <span className="text-white/80">({selectedDoctor.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-6 h-6" />
                                    <span className="text-xl font-semibold">{selectedDoctor.experience}+ years experience</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => navigate(`/appointments/book?doctorId=${selectedDoctor.id}`)}
                                    className="px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Book Appointment
                                </button>
                                <button className="px-8 py-4 bg-white/20 backdrop-blur-xl border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                                    <Video className="w-5 h-5" />
                                    Video Consult
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 mb-8 overflow-hidden">
                            <div className="flex border-b border-gray-200">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 ${activeTab === tab.id
                                                ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white'
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
                                        className="space-y-8"
                                    >
                                        {/* About */}
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <Users className="w-6 h-6 text-purple-600" />
                                                About Dr. {selectedDoctor.name.split(' ').pop()}
                                            </h3>
                                            <p className="text-gray-700 text-lg leading-relaxed">
                                                Dr. {selectedDoctor.name} is a highly experienced {selectedDoctor.specialty} with over {selectedDoctor.experience} years of practice.
                                                Specializing in comprehensive patient care, Dr. {selectedDoctor.name.split(' ').pop()} is known for a compassionate approach and
                                                dedication to staying current with the latest medical advances.
                                            </p>
                                        </div>

                                        {/* Education */}
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <GraduationCap className="w-6 h-6 text-purple-600" />
                                                Education & Qualification
                                            </h3>
                                            <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                                                <p className="text-xl font-bold text-gray-900">{selectedDoctor.qualification}</p>
                                            </div>
                                        </div>

                                        {/* Specialization */}
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Specialization</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {['Adult Cardiology', 'Heart Disease Prevention', 'Cardiac Imaging', 'Interventional Cardiology'].map((spec, idx) => (
                                                    <span key={idx} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-semibold">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'experience' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h3>

                                        {[
                                            { title: 'Senior Consultant', place: selectedDoctor.chamber, years: '2018 - Present' },
                                            { title: 'Associate Professor', place: 'Dhaka Medical College', years: '2015 - 2018' },
                                            { title: 'Medical Officer', place: 'BIRDEM Hospital', years: '2010 - 2015' }
                                        ].map((exp, idx) => (
                                            <div key={idx} className="bg-linear-to-br from-gray-50 to-white p-6 rounded-2xl border-l-4 border-purple-600">
                                                <h4 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h4>
                                                <p className="text-gray-700 font-semibold mb-1">{exp.place}</p>
                                                <p className="text-gray-600">{exp.years}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {activeTab === 'reviews' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h3>
                                        <p className="text-gray-600 text-center py-8">Reviews coming soon...</p>
                                    </motion.div>
                                )}

                                {activeTab === 'schedule' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Weekly Schedule</h3>
                                        <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                                            <p className="text-xl font-bold text-gray-900">{selectedDoctor.schedule}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Chamber Info */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Chamber Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Location</p>
                                        <p className="text-gray-600">{selectedDoctor.chamber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Visiting Hours</p>
                                        <p className="text-gray-600">{selectedDoctor.schedule}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Consultation Fee</p>
                                        <p className="text-2xl font-black text-purple-600">৳{selectedDoctor.fee}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-3">
                            <button className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                                <Phone className="w-5 h-5" />
                                Call Now
                            </button>
                            <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200">
                                <MessageCircle className="w-5 h-5" />
                                Send Message
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
                        <div className="bg-linear-to-br from-purple-100 to-blue-100 backdrop-blur-xl rounded-3xl p-8 border border-purple-200/50">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Statistics</h3>
                            <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <p className="text-3xl font-black text-purple-600">{selectedDoctor.reviews}</p>
                                    <p className="text-sm text-gray-600 font-semibold">Total Patients</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <p className="text-3xl font-black text-blue-600">{selectedDoctor.experience}+</p>
                                    <p className="text-sm text-gray-600 font-semibold">Years Experience</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <p className="text-3xl font-black text-green-600">{selectedDoctor.rating}</p>
                                    <p className="text-sm text-gray-600 font-semibold">Patient Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;