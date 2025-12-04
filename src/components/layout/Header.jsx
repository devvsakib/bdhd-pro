import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, X, HeartPulse, Hospital, User,
  Ambulance, FileText, Calendar
} from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: HeartPulse },
    { path: '/facilities', label: 'Facilities', icon: Hospital },
    { path: '/doctors', label: 'Doctors', icon: User },
    { path: '/emergency', label: 'Emergency', icon: Ambulance },
    { path: '/about', label: 'About', icon: FileText }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/95 backdrop-blur-xl'
      } border-b border-gray-200/50`}>
        <title>Bangladesh Healthcare Directory PRO - Home</title>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HeartPulse className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                BD Healthcare
              </h1>
              <p className="text-xs text-gray-500 font-medium">Directory Pro</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${isActive(item.path)
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/my-appointments')}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white/80 hover:bg-white border border-gray-200 rounded-xl backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              My Appointments
            </button>
            <button
              onClick={() => navigate('/appointments/book')}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all mb-2 ${isActive(item.path)
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
            <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  navigate('/my-appointments');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                My Appointments
              </button>
              <button
                onClick={() => {
                  navigate('/appointments/book');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-blue-700 rounded-xl"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </header>

  )
}
