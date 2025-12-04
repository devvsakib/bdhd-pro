import React from 'react'
import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import ServicesGrid from '../components/home/ServicesGrid'
import EmergencySection from '../components/home/EmergencySection'
import { Hospital, User, Truck, Calendar, Pill, Ambulance, Droplets, PhoneCall, PhoneCallIcon } from 'lucide-react'
import FeaturedFacilities from '../components/home/FeaturedFacilities'

const mockData = {
  facilities: [
    {
      id: 1,
      name: 'Square Hospital',
      category: 'Hospital',
      city: 'Dhaka',
      area: 'Panthapath',
      rating: 4.8,
      reviews: 1247,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop',
      services: ['Emergency 24/7', 'ICU', 'Surgery', 'Cardiology'],
      verified: true
    },
    {
      id: 2,
      name: 'United Hospital',
      category: 'Hospital',
      city: 'Dhaka',
      area: 'Gulshan',
      rating: 4.7,
      reviews: 982,
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop',
      services: ['Cancer Treatment', 'Heart Surgery', 'Orthopedics'],
      verified: true
    },
    {
      id: 3,
      name: 'Apollo Hospital',
      category: 'Hospital',
      city: 'Dhaka',
      area: 'Bashundhara',
      rating: 4.9,
      reviews: 1543,
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=300&fit=crop',
      services: ['Multi-specialty', 'Transplant', 'Robotic Surgery'],
      verified: true
    }
  ],
  stats: [
    { icon: <Hospital size={50} className='text-white' />, label: 'Hospitals', value: '1,247', color: 'from-emerald-500 to-emerald-600', bg: 'from-emerald-50 to-emerald-100' },
    { icon: <User size={50} className='text-white' />, label: 'Doctors', value: '8,542', color: 'from-blue-500 to-blue-600', bg: 'from-blue-50 to-blue-100' },
    { icon: <Truck size={50} className='text-white' />, label: 'Ambulance Services', value: '342', color: 'from-purple-500 to-purple-600', bg: 'from-purple-50 to-purple-100' },
    { icon: <Droplets size={50} className='text-white' />, label: 'Blood Banks', value: '156', color: 'from-orange-500 to-orange-600', bg: 'from-orange-50 to-orange-100' }
  ],
  services: [
    { icon: <Hospital size={50} className='text-white' />, title: 'Hospitals', desc: 'Multi-specialty hospitals, emergency care, ICU services', color: 'blue', gradient: 'from-blue-500 to-blue-600' },
    { icon: <User size={50} className='text-white' />, title: 'Doctors', desc: 'Find specialist doctors by name, location or specialty', color: 'emerald', gradient: 'from-emerald-500 to-emerald-600' },
    { icon: <Calendar size={50} className='text-white' />, title: 'Appointments', desc: 'Book appointments online instantly with confirmed slots', color: 'purple', gradient: 'from-purple-500 to-purple-600' },
    { icon: <PhoneCallIcon size={50} className='text-white' />, title: 'Emergency', desc: '24/7 emergency contacts, ambulance & blood bank services', color: 'orange', gradient: 'from-orange-500 to-orange-600' }
  ]
};

export default function HomePage() {
  return (
    <div className="space-y-6 w-full">
      <HeroSection />
      <StatsSection mockData={mockData} />
      <ServicesGrid mockData={mockData} />
      <FeaturedFacilities mockData={mockData} />
      <EmergencySection />
    </div>
  )
}
