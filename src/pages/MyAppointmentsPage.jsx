import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react';
import { getAppointmentsFromLocalStorage } from '../utils/localStorage';
import { useSelector } from 'react-redux';

const MyAppointmentsPage = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [appointments, setAppointments] = useState({ upcoming: [], past: [] });
    const { doctors } = useSelector((state) => state.doctors);
    const { facilities } = useSelector((state) => state.facilities);


    useEffect(() => {
        const stored = getAppointmentsFromLocalStorage(); // latest first
        // Separate upcoming vs past by comparing dates (simple)
        const now = new Date();
        const upcoming = [];
        const past = [];

        const normalize = (a) => {
            // If structure uses date/time fields named differently, adjust
            const date = a.date ? new Date(a.date) : null;
            return { ...a, dateObj: date };
        };

        const all = stored.map(normalize);
        all.forEach((appt) => {
            if (appt.dateObj && appt.dateObj < now) past.push(appt);
            else upcoming.push(appt);
        });

        // if none stored use fallback
        setAppointments({
            upcoming: upcoming.length ? upcoming : [],
            past: past.length ? past : []
        });
    }, []);
    const getStatusBadge = (status) => {
        const styles = {
            confirmed: 'bg-green-100 text-green-700',
            pending: 'bg-yellow-100 text-yellow-700',
            completed: 'bg-blue-100 text-blue-700',
            cancelled: 'bg-red-100 text-red-700'
        };

        const icons = {
            confirmed: CheckCircle,
            pending: ClockIcon,
            completed: CheckCircle,
            cancelled: XCircle
        };

        const Icon = icons[status];

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
                <Icon className="w-3 h-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };
    const list = activeTab === 'upcoming' ? appointments.upcoming : appointments.past;
    console.log(list)
    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-black bg-linear-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent mb-4">
                        My Appointments
                    </h1>
                    <p className="text-xl text-gray-600">Manage your healthcare appointments</p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-gray-200/50">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'upcoming'
                                ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'past'
                                ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Past
                        </button>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-6">
                    {list && list?.map((appointment, idx) => (
                        <motion.div
                            key={appointment.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-gray-200/50 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Doctor Image */}
                                <img
                                    src={`/images/${doctors.find(d => d.id === parseInt(appointment.doctorId))?.gender}-doc.jpg`}
                                    alt={appointment.doctorName}
                                    className="w-24 h-24 rounded-2xl object-cover"
                                />

                                {/* Details */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                                {appointment.doctorName}
                                            </h3>
                                            <p className="text-purple-600 font-semibold">{appointment.specialty}</p>
                                        </div>
                                        {getStatusBadge(appointment.status)}
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Calendar className="w-5 h-5 text-purple-600" />
                                            <span className="font-semibold">{appointment.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock className="w-5 h-5 text-purple-600" />
                                            <span className="font-semibold">{appointment.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <MapPin className="w-5 h-5 text-purple-600" />
                                            <span className="font-semibold">{appointment.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                {activeTab === 'upcoming' && (
                                    <div className="flex flex-col gap-2">
                                        <button className="px-6 py-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105">
                                            Reschedule
                                        </button>
                                        <button className="px-6 py-2 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-all duration-300">
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {list?.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No appointments found</h3>
                            <p className="text-gray-600 mb-8">You don't have any {activeTab} appointments</p>
                            <button
                                onClick={() => window.location.href = '/doctors'}
                                className="px-8 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                Book Appointment
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAppointmentsPage;