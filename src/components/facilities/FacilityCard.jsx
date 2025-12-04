import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Award, ChevronRight } from 'lucide-react';

const FacilityCard = ({ facility }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => navigate(`/facilities/${facility.id}`)}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={facility.image}
          alt={facility.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {facility.verified && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm bg-opacity-90">
            <Award className="w-3 h-3" />
            Verified
          </div>
        )}
        {facility.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {facility.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">{facility.area}, {facility.city}</span>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${facility.category === 'Hospital'
              ? 'bg-red-100 text-red-700'
              : 'bg-blue-100 text-blue-700'
            }`}>
            {facility.category}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-bold text-gray-900">{facility.rating}</span>
          </div>
          <span className="text-gray-600 text-sm">({facility.reviews} reviews)</span>
        </div>

        {/* Services */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {facility.services.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-semibold"
              >
                {service}
              </span>
            ))}
            {facility.services.length > 3 && (
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                +{facility.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:scale-105">
          View Details
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default FacilityCard;
