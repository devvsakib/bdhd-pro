import React from 'react';
import { motion } from 'motion/react';
import {
    Phone, Ambulance, Droplets, AlertTriangle,
    Heart, Shield, MapPin, Clock
} from 'lucide-react';

const EmergencyPage = () => {
    const emergencyNumbers = [
        {
            icon: AlertTriangle,
            name: 'National Emergency',
            number: '999',
            description: '24/7 Emergency Helpline',
            color: 'from-red-500 to-red-600'
        },
        {
            icon: Shield,
            name: 'Police Emergency',
            number: '100',
            description: 'Law Enforcement',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: AlertTriangle,
            name: 'Fire Service',
            number: '16163',
            description: 'Fire & Rescue',
            color: 'from-orange-500 to-orange-600'
        },
        {
            icon: Phone,
            name: 'Ambulance (DMCH)',
            number: '02-9663737',
            description: 'Medical Emergency',
            color: 'from-green-500 to-green-600'
        }
    ];

    const ambulanceServices = [
        { name: 'Quantum Ambulance', phone: '09666-777888', available: '24/7', type: 'AC/Non-AC' },
        { name: 'Seba Ambulance', phone: '09610-115115', available: '24/7', type: 'AC/ICU' },
        { name: 'Pranta Ambulance', phone: '01321-326565', available: '24/7', type: 'AC/Freezing' },
        { name: 'Jonota Ambulance', phone: '01919-666662', available: '24/7', type: 'All Types' }
    ];

    const bloodBanks = [
        { name: 'Square Hospital Blood Bank', phone: '02-8159457', groups: 'All Groups', area: 'Panthapath' },
        { name: 'Sandhani Blood Bank', phone: '01778-990000', groups: 'All Groups', area: 'Multiple Locations' },
        { name: 'Quantum Blood Bank', phone: '10616', groups: 'All Groups', area: 'Dhanmondi' },
        { name: 'Red Crescent Blood Bank', phone: '02-9353737', groups: 'All Groups', area: 'Mohammadpur' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full font-bold text-sm mb-6 border-2 border-red-300">
                        <AlertTriangle className="w-5 h-5 mr-2 animate-pulse" />
                        EMERGENCY SERVICES - AVAILABLE 24/7
                    </div>
                    <h1 className="text-6xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-red-700 bg-clip-text text-transparent mb-6">
                        Emergency Services
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Quick access to life-saving emergency services across Bangladesh
                    </p>
                </motion.div>

                {/* Emergency Numbers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Emergency Hotlines</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {emergencyNumbers.map((emergency, idx) => {
                            const Icon = emergency.icon;
                            return (
                                <motion.a
                                    key={idx}
                                    href={`tel:${emergency.number}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`bg-gradient-to-br ${emergency.color} text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group`}
                                >
                                    <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                                        <Icon className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{emergency.name}</h3>
                                    <p className="text-5xl font-black mb-3">{emergency.number}</p>
                                    <p className="text-white/90 font-semibold">{emergency.description}</p>
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Ambulance Services */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 mb-16 border border-gray-200/50"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl">
                            <Ambulance className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">Ambulance Services</h2>
                            <p className="text-gray-600 font-medium">Available 24/7 across Bangladesh</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {ambulanceServices.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                                        <p className="text-sm text-gray-600 font-semibold">{service.type}</p>
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                        {service.available}
                                    </span>
                                </div>
                                <a
                                    href={`tel:${service.phone}`}
                                    className="inline-flex items-center gap-2 text-2xl font-black text-green-600 hover:text-green-700 transition-colors"
                                >
                                    <Phone className="w-6 h-6" />
                                    {service.phone}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Blood Banks */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-200/50"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-2xl">
                            <Droplets className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">Blood Banks</h2>
                            <p className="text-gray-600 font-medium">Find blood donors and donation centers</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {bloodBanks.map((bank, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + idx * 0.1 }}
                                className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200 hover:border-red-500 hover:shadow-xl transition-all duration-300"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{bank.name}</h3>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MapPin className="w-4 h-4 text-red-600" />
                                        <span className="font-semibold">{bank.area}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Droplets className="w-4 h-4 text-red-600" />
                                        <span className="font-semibold">{bank.groups}</span>
                                    </div>
                                </div>
                                <a
                                    href={`tel:${bank.phone}`}
                                    className="inline-flex items-center gap-2 text-xl font-black text-red-600 hover:text-red-700 transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    {bank.phone}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Emergency Tips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-10 shadow-2xl"
                >
                    <h2 className="text-3xl font-black mb-6">Emergency Tips</h2>
                    <ul className="space-y-3 text-lg">
                        <li className="flex items-start gap-3">
                            <span className="bg-white/20 rounded-full p-1 mt-1">✓</span>
                            <span>Stay calm and call emergency services immediately</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-white/20 rounded-full p-1 mt-1">✓</span>
                            <span>Provide clear location details to emergency responders</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-white/20 rounded-full p-1 mt-1">✓</span>
                            <span>Keep important medical documents easily accessible</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-white/20 rounded-full p-1 mt-1">✓</span>
                            <span>Know your blood type and any allergies</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default EmergencyPage;