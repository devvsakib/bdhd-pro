import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Award, Shield, Target, Zap } from 'lucide-react';

const AboutPage = () => {
    const features = [
        {
            icon: Heart,
            title: 'Patient First',
            description: 'We prioritize patient care and accessibility above everything else'
        },
        {
            icon: Shield,
            title: 'Verified Information',
            description: 'All facilities and doctors are verified for authenticity'
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'Built by the community, for the community'
        },
        {
            icon: Zap,
            title: 'Quick Access',
            description: 'Find healthcare services instantly when you need them most'
        }
    ];

    const stats = [
        { value: '500K+', label: 'Users Trust Us' },
        { value: '5,000+', label: 'Healthcare Facilities' },
        { value: '25,000+', label: 'Verified Doctors' },
        { value: '1M+', label: 'Appointments Booked' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-6xl font-black mb-6">About BD Healthcare</h1>
                        <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Bangladesh's most comprehensive healthcare directory, connecting millions of people with quality medical services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-gray-200/50"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                                <Target className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            To make quality healthcare accessible to every Bangladeshi by providing a comprehensive,
                            user-friendly platform that connects patients with the right healthcare services at the right time.
                            We believe everyone deserves access to reliable healthcare information and services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-black text-center text-gray-900 mb-16">Why Choose Us</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-blue-200/50"
                                >
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="text-6xl font-black mb-3">{stat.value}</div>
                                <div className="text-2xl font-semibold text-blue-100">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;