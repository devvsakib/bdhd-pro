import React from 'react'
import { motion } from 'motion/react'
import { Award, Hospital, Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-linear-to-r from-indigo-600 via-purple-600 to-purple-700 text-white overflow-hidden pt-28 pb-32 relative">
      <div className="absolute inset-0 bg-black/15"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:pr-16 space-y-8"
          >
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <Award className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Trusted by 500K+ Bangladeshis</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              Find Best<br />
              <span className="bg-linear-to-r from-white via-blue-50 to-transparent bg-clip-text text-transparent">Healthcare</span><br />
              Services Near You
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              Complete directory of hospitals, doctors, clinics, pharmacies & emergency services across Bangladesh
            </p>

            {/* Search Box */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-1 border border-white/20 shadow-2xl">
              <div className="flex bg-white rounded-2xl p-5 shadow-2xl">
                <div className="flex-1 relative">
                  <Hospital className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter hospital name, doctor or location"
                    className="w-full pl-14 pr-4 py-4 text-lg border-none focus:ring-0 bg-transparent font-medium placeholder-gray-500 text-gray-900"
                  />
                </div>
                <button className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 flex items-center justify-center hover:scale-105">
                  <Search className="w-5 h-5 mr-2" />
                  Search Now
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mt-20 pt-10 border-t border-white/20">
              {[
                { value: '5,000+', label: 'Hospitals & Clinics' },
                { value: '25,000+', label: 'Doctors' },
                { value: '1M+', label: 'Appointments Booked' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center min-w-[120px]">
                  <div className="text-4xl font-black text-blue-100 mb-2">{stat.value}</div>
                  <div className="text-blue-200 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
