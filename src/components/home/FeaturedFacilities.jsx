import { Award, MapPin, Star } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const FeaturedFacilities = ({ mockData }) => {
    return (
        <section className="py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-gray-900 mb-6">Featured Hospitals</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Top-rated healthcare facilities with excellent patient reviews
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockData.facilities.map((facility, idx) => (
                        <motion.div
                            key={facility.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            <div className="relative h-48">
                                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                                {facility.verified && (
                                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                                        <Award className="w-3 h-3" />
                                        Verified
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{facility.name}</h3>
                                        <p className="text-gray-600 text-sm flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {facility.area}, {facility.city}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-gray-900">{facility.rating}</span>
                                    </div>
                                    <span className="text-gray-500 text-sm">({facility.reviews} reviews)</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {facility.services.slice(0, 3).map((service, idx) => (
                                        <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                                            {service}
                                        </span>
                                    ))}
                                </div>

                                <Link
to={`/facilities/${service.id}`}
 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedFacilities;
