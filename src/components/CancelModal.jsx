import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

const CancelModal = ({ isOpen, onClose, appointment, onConfirm }) => {
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        setLoading(true);
        try {
            await onConfirm(appointment.id, reason);
            setLoading(false);
            onClose();
        } catch (error) {
            setLoading(false);
            console.error('Cancel failed:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-linear-to-r from-red-500 to-red-600 text-white p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Cancel Appointment</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-white/20 rounded-lg transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-red-100">Are you sure you want to cancel this appointment?</p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Appointment Details */}
                        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                            <h4 className="font-bold text-gray-900 mb-3">Appointment Details</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Doctor:</span>
                                    <span className="font-semibold text-gray-900">{appointment.doctorName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="font-semibold text-gray-900">{appointment.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Time:</span>
                                    <span className="font-semibold text-gray-900">{appointment.time}</span>
                                </div>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Reason for Cancellation (Optional)
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                placeholder="Please let us know why you're cancelling..."
                            />
                        </div>

                        {/* Warning */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                            <p className="text-sm text-amber-800">
                                <strong>Note:</strong> Cancelling this appointment may affect your booking history.
                                Please consider rescheduling if you need to change the date or time.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-300 disabled:opacity-50"
                            >
                                Keep Appointment
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                                {loading ? 'Cancelling...' : 'Yes, Cancel'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CancelModal;