import React from 'react'
import { motion } from 'motion/react'
import { UserCheck, Stethoscope, Pill, Ambulance } from 'lucide-react';
export default function StatsSection({ mockData }) {
  return (
    <section className="py-28 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {mockData.stats.map((stat, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`group p-8 rounded-3xl bg-linear-to-br ${stat.bg} hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-gray-200/50`}
              >
                <div className={`w-24 h-24 mx-auto mb-6 bg-linear-to-r ${stat.color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-3">{stat.value}</h3>
                <p className="text-xl font-semibold text-gray-700">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
