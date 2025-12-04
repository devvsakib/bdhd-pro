import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react';

export default function ServicesGrid({mockData}) {
  const items = ['Hospitals', 'Clinics', 'Diagnostics', 'Pharmacies']
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6">
            Healthcare Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find and book healthcare services across Bangladesh with verified listings and real patient reviews
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockData.services.map((service, idx) => {
            return (
              <motion.a
                key={idx}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -16, scale: 1.02 }}
                className="group bg-white/70 backdrop-blur-sm rounded-4xl p-10 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 overflow-hidden hover:bg-white"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 mx-auto shadow-xl`}>
                 {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-8 text-center leading-relaxed">{service.desc}</p>
                <div className={`flex items-center justify-center text-${service.color}-600 font-bold text-lg group-hover:translate-x-2 transition-all duration-300`}>
                  <ArrowRight className="w-6 h-6 mr-2" />
                  Learn More
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
