import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Award, Calendar, MapPin, Phone } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => navigate(`/doctors/${doctor.id}`)}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 cursor-pointer group"
    >
      {/* Header with Image */}
      <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 p-8">
        <div className="flex items-start gap-6">
          <div className="relative">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300"
            />
            {doctor.verified && (
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
                <Award className="w-4 h-4" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-purple-600 font-bold text-lg mb-3">{doctor.specialty}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900">{doctor.rating}</span>
              </div>
              <span className="text-gray-600 text-sm">({doctor.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-600 font-semibold">Qualification</p>
              <p className="text-gray-900 font-bold">{doctor.qualification}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-600 font-semibold">Chamber</p>
              <p className="text-gray-900 font-bold">{doctor.chamber}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-600 font-semibold">Schedule</p>
              <p className="text-gray-900 font-bold">{doctor.schedule}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
          <div className="text-center">
            <p className="text-2xl font-black text-purple-600">{doctor.experience}+</p>
            <p className="text-sm text-gray-600 font-semibold">Years Exp.</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-blue-600">৳{doctor.fee}</p>
            <p className="text-sm text-gray-600 font-semibold">Consultation</p>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:scale-105">
          <Calendar className="w-5 h-5" />
          Book Appointment
        </button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;