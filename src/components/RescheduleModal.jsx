import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';

const RescheduleModal = ({ isOpen, onClose, appointment, onConfirm }) => {
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [loading, setLoading] = useState(false);

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
        '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
    ];

    const handleReschedule = async () => {
        if (!newDate || !newTime) {
            alert('Please select both date and time');
            return;
        }

        setLoading(true);
        try {
            await onConfirm(appointment.id, newDate, newTime);
            setLoading(false);
            onClose();
        } catch (error) {
            setLoading(false);
            console.error('Reschedule failed:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Reschedule Appointment</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-white/20 rounded-lg transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-purple-100">Choose a new date and time for your appointment</p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Current Appointment */}
                        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                            <h4 className="font-bold text-gray-900 mb-3">Current Appointment</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Doctor:</span>
                                    <p className="font-semibold text-gray-900">{appointment.doctorName}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Location:</span>
                                    <p className="font-semibold text-gray-900">{appointment.location}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Current Date:</span>
                                    <p className="font-semibold text-gray-900">{appointment.date}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Current Time:</span>
                                    <p className="font-semibold text-gray-900">{appointment.time}</p>
                                </div>
                            </div>
                        </div>

                        {/* New Date Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Select New Date *
                            </label>
                            <input
                                type="date"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        {/* New Time Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-900 mb-3">
                                Select New Time Slot *
                            </label>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-xl">
                                {timeSlots.map((slot) => (
                                    <button
                                        key={slot}
                                        type="button"
                                        onClick={() => setNewTime(slot)}
                                        className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${newTime === slot
                                                ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        {newDate && newTime && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-linear-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-4 mb-6"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle className="w-5 h-5 text-purple-600" />
                                    <h4 className="font-bold text-gray-900">New Appointment Details</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">New Date:</span>
                                        <p className="font-bold text-gray-900">{newDate}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">New Time:</span>
                                        <p className="font-bold text-gray-900">{newTime}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-300 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReschedule}
                                disabled={loading || !newDate || !newTime}
                                className="flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Rescheduling...' : 'Confirm Reschedule'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RescheduleModal;