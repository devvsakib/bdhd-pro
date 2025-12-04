import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
    Calendar, Clock, User, Phone, Mail, MessageCircle,
    CheckCircle, AlertCircle, ChevronLeft, ChevronRight,
    MapPin, DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';
import { selectDoctorsByFacilityName, selectFacilityByDoctorId } from '../store/selectors';
import CustomDropdown from './CustomDropdown';
import { saveAppointmentToLocalStorage } from '../utils/localStorage';

const AppointmentPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const doctorId = searchParams.get('doctorId');
    const facilityId = searchParams.get('facilityId');

    const { doctors } = useSelector((state) => state.doctors);
    const { facilities } = useSelector((state) => state.facilities);

    const [step, setStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [doctorsHere, setDoctorsHere] = useState([]);
    const [doctorsFacility, setDoctorsFacility] = useState(null);

    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        date: '',
        timeSlot: '',
        reason: '',
        doctor: '',
        facilityName: '',
    });

    useEffect(() => {
        if (doctorId) {
            const doctor = doctors.find(d => d.id === parseInt(doctorId));
            setSelectedDoctor(doctor);
        }
        if (facilityId) {
            const facility = facilities.find(f => f.id === parseInt(facilityId));
            setSelectedFacility(facility);
        }
    }, [doctorId, facilityId, doctors, facilities]);


    useEffect(() => {
        const fetchDoctors = async () => {
            const doctors = await selectDoctorsByFacilityName(selectedFacility?.name);
            setDoctorsHere(doctors);
        };
        fetchDoctors();
    }, [selectedFacility]);

    // in a component (example)
    useEffect(() => {
        const run = async () => {
            const facilities = await selectFacilityByDoctorId(doctorId);
            setDoctorsFacility(facilities);
        };
        run();
    }, [doctorId]);


    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
        '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (step < 3) {
            setStep(step + 1);
            return;
        }

        // Final confirmation - build appointment payload
        const appointment = {
            id: Date.now(), // simple unique id, replace with UUID if preferred
            createdAt: new Date().toISOString(),
            facilityId: selectedFacility?.id ?? null,
            facilityName: selectedFacility?.name ?? '',
            doctorId: selectedDoctor?.id ?? formData.doctor ?? null,
            doctorName: selectedDoctor?.name ?? '',
            specialty: selectedDoctor?.specialty ?? '',
            patientName: formData.patientName,
            age: formData.age,
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            date: formData.date,
            time: formData.timeSlot,
            reason: formData.reason,
            fee: selectedDoctor?.fee ?? null,
            status: 'confirmed' // or 'pending' depending on business rules
        };

        // Persist locally
        const saved = saveAppointmentToLocalStorage(appointment);
        if (!saved) {
            toast.error('Failed to save appointment locally. Please try again.');
            return;
        }

        toast.success('Appointment booked successfully!');
        // optional: reset form or keep it for UX
        // navigate after a short delay
        setTimeout(() => {
            navigate('/my-appointments');
        }, 400);
    };


    const isStepValid = () => {
        if (step === 1) {
            return formData.patientName && formData.age && formData.gender && formData.phone;
        }
        if (step === 2) {
            return formData.date && formData.timeSlot;
        }
        return true;
    };

    useEffect(() => {
        const fetchFacility = async () => {
            if (formData?.facility) {
                const facilities = await selectFacilityByDoctorId(formData.facility);
                setSelectedFacility(facilities[0] || null);
            }
        };
        fetchFacility();
    }, [formData?.facility]);

    if (!selectedFacility && !doctorsFacility) {
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

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 mb-6"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                    </button>
                    <h1 className="text-5xl font-black bg-linear-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent mb-4">
                        Book Appointment
                    </h1>
                    <p className="text-xl text-gray-600">Schedule your consultation in 3 easy steps</p>
                </motion.div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    {[1, 2, 3].map((s) => (
                        <React.Fragment key={s}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: s * 0.1 }}
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${s <= step
                                    ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {s < step ? <CheckCircle className="w-6 h-6" /> : s}
                            </motion.div>
                            {s < 3 && (
                                <div className={`w-24 h-1 ${s < step ? 'bg-linear-to-r from-purple-600 to-blue-600' : 'bg-gray-200'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50"
                >
                    {selectedDoctor && (
                        <div className="bg-linear-to-br from-purple-100 to-blue-100 rounded-2xl p-6 mb-8">
                            <div className="flex items-center gap-4">
                                <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-16 h-16 rounded-full" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{selectedDoctor.name}</h3>
                                    <p className="text-purple-600 font-semibold">{selectedDoctor.specialty}</p>
                                    <p className="text-sm text-gray-600">{selectedDoctor.chamber}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {
                        selectedFacility && (
                            <div className="bg-linear-to-br from-purple-100 to-blue-100 rounded-2xl p-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <img src={selectedFacility.image} alt={selectedFacility.name} className="w-16 h-16 rounded-full" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedFacility.name}</h3>
                                        <p className="text-purple-600 font-semibold">{selectedFacility.address}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Patient Information */}
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Information</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Patient Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="patientName"
                                            value={formData.patientName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Enter full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Age *
                                        </label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                            max="120"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Enter age"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Gender *
                                        </label>
                                        <CustomDropdown
                                            data={[{ id: 'Male', name: 'Male' }, { id: 'Female', name: 'Female' }, { id: 'Other', name: 'Other' }]}
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            placeholder="Select gender"
                                            name="gender"
                                        />
                                    </div>
                                    {doctorsFacility &&
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Select Facility *
                                            </label>
                                            <CustomDropdown
                                                data={doctorsFacility}
                                                value={formData.facilityName}
                                                onChange={handleInputChange}
                                                placeholder="Select facility"
                                                name="facilityName"
                                            />
                                        </div>
                                    }
                                    {selectedFacility && doctorsHere && !doctorId &&
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Select Doctor
                                            </label>
                                            <CustomDropdown
                                                data={doctorsHere}
                                                value={formData.doctor}
                                                onChange={handleInputChange}
                                                placeholder="Select doctor"
                                                name="doctor"
                                            />
                                        </div>
                                    }

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="01XXXXXXXXX"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Email (Optional)
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Select Date & Time */}
                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Appointment Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-4">
                                        Available Time Slots *
                                    </label>
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                        {timeSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, timeSlot: slot })}
                                                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${formData.timeSlot === slot
                                                    ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Additional Information */}
                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Reason for Visit (Optional)
                                    </label>
                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Brief description of your health concern..."
                                    ></textarea>
                                </div>

                                {/* Summary */}
                                <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Appointment Summary</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 font-semibold">Patient:</span>
                                            <span className="text-gray-900 font-bold">{formData.patientName}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 font-semibold">Date:</span>
                                            <span className="text-gray-900 font-bold">{formData.date}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 font-semibold">Time:</span>
                                            <span className="text-gray-900 font-bold">{formData.timeSlot}</span>
                                        </div>
                                        {selectedDoctor && (
                                            <div className="flex items-center justify-between border-t border-purple-200 pt-3 mt-3">
                                                <span className="text-gray-700 font-semibold">Consultation Fee:</span>
                                                <span className="text-2xl font-black text-purple-600">৳{selectedDoctor.fee}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300 flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={!isStepValid()}
                                className={`ml-auto px-8 py-3 font-bold rounded-xl transition-all duration-300 flex items-center gap-2 ${isStepValid()
                                    ? 'bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {step === 3 ? (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Confirm Booking
                                    </>
                                ) : (
                                    <>
                                        Next
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Help Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6"
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h4>
                            <p className="text-gray-700 mb-3">
                                If you have any questions or need assistance with booking, please contact us:
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="tel:10678" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    Call: 10678
                                </a>
                                <a href="mailto:support@healthcarebd.com" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
                                    <Mail className="w-4 h-4" />
                                    Email Support
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AppointmentPage;