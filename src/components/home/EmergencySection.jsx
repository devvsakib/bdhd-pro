import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export default function EmergencySection() {
  return (
    <section className="bg-linear-to-r from-red-600 via-red-700 to-red-800 text-white py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-white/20 backdrop-blur-xl px-8 py-4 rounded-2xl mb-12 border border-white/30 font-bold text-lg shadow-2xl">
            <AlertTriangle className="w-7 h-7 mr-3" />
            <span>LIFE-SAVING EMERGENCY SERVICES - AVAILABLE 24/7</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight drop-shadow-2xl">
            Emergency Services
          </h2>

          <p className="text-2xl text-red-100 mb-16 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Instant access to ambulance services, emergency hospitals, blood banks and 24/7 helplines across Bangladesh
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { emoji: '🚑', title: '999', subtitle: 'Emergency Helpline' },
              { emoji: '🩸', title: 'Blood Bank', subtitle: 'Find Donors Now' },
              { emoji: '🚨', title: 'Ambulance', subtitle: 'Nearest Services' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/15 backdrop-blur-2xl rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 border border-white/30 cursor-pointer"
              >
                <div className="text-6xl mb-8">{item.emoji}</div>
                <h3 className="text-4xl font-black mb-6">{item.title}</h3>
                <p className="text-2xl font-bold">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
