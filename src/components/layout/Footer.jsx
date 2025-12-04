import { FacebookIcon, TwitterIcon, InstagramIcon, HeartPulse } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-xl text-white py-20 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <HeartPulse className="w-9 h-9 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black">BD Healthcare</h3>
                <p className="text-gray-400 text-lg mt-1">Your trusted healthcare companion</p>
              </div>
            </div>
            <div className="flex space-x-4">
              {[FacebookIcon, TwitterIcon, InstagramIcon].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-14 h-14 bg-gray-800/50 hover:bg-gray-700 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-700/50"
                >
                  <Icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              {['Hospitals', 'Doctors', 'Appointments', 'Emergency'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white font-semibold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-2xl font-bold mb-8">Services</h4>
            <ul className="space-y-4 text-gray-400">
              {['Lab Tests', 'Pharmacy', 'Blood Bank', 'Ambulance'].map((service, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white font-semibold transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-12 text-center text-gray-400 text-lg">
          <p>© 2025 BD Healthcare Directory. All rights reserved. | Made with ❤️ for Bangladesh</p>
        </div>
      </div>
    </footer>
  )
}
