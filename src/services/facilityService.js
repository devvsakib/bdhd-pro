import api from './api'

const getAll = async () => {
  return {
    data: [
      {
        id: 1,
        name: 'Square Hospital',
        category: 'Hospital',
        city: 'Dhaka',
        area: 'Panthapath',
        address: '18/F, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka 1205',
        phone: '02-8159457',
        email: 'info@squarehospital.com',
        rating: 4.8,
        reviews: 1247,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop',
        services: ['Emergency 24/7', 'ICU', 'CCU', 'Surgery', 'Cardiology', 'Neurology'],
        specialties: ['Cardiac Surgery', 'Neurosurgery', 'Cancer Treatment'],
        hours: '24/7',
        verified: true,
        featured: true,
        beds: 450,
        doctors: 280,
        insurance: ['Meghna', 'Green Delta', 'Pragati'],
        description: 'Square Hospital is one of the leading tertiary care hospitals in Bangladesh.'
      },
      {
        id: 2,
        name: 'United Hospital',
        category: 'Hospital',
        city: 'Dhaka',
        area: 'Gulshan',
        address: 'Plot 15, Road 71, Gulshan, Dhaka 1212',
        phone: '02-8836000',
        email: 'info@unitedhospital.com',
        rating: 4.7,
        reviews: 982,
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop',
        services: ['Emergency', 'Cancer Treatment', 'Heart Surgery', 'Orthopedics'],
        specialties: ['Oncology', 'Cardiology', 'Orthopedics'],
        hours: '24/7',
        verified: true,
        featured: true,
        beds: 350,
        doctors: 220,
        insurance: ['Meghna', 'Popular', 'United']
      },
      {
        id: 3,
        name: 'Apollo Hospitals Dhaka',
        category: 'Hospital',
        city: 'Dhaka',
        area: 'Bashundhara',
        address: 'Plot 81, Block E, Bashundhara R/A, Dhaka 1229',
        phone: '10678',
        email: 'info@apollodhaka.com',
        rating: 4.9,
        reviews: 1543,
        image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=300&fit=crop',
        services: ['Multi-specialty', 'Emergency', 'Critical Care', 'Transplant'],
        specialties: ['Liver Transplant', 'Kidney Transplant', 'Robotic Surgery'],
        hours: '24/7',
        verified: true,
        featured: true,
        beds: 470,
        doctors: 310
      },
      {
        id: 4,
        name: 'Popular Diagnostic Centre',
        category: 'Diagnostic',
        city: 'Dhaka',
        area: 'Dhanmondi',
        address: 'House 16, Road 2, Dhanmondi, Dhaka 1205',
        phone: '09666787801',
        rating: 4.6,
        reviews: 2341,
        image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=400&h=300&fit=crop',
        services: ['Blood Test', 'X-Ray', 'CT Scan', 'MRI', 'Ultrasound'],
        hours: '8:00 AM - 10:00 PM',
        verified: true
      },
      {
        id: 5,
        name: 'Ibn Sina Diagnostic Centre',
        category: 'Diagnostic',
        city: 'Dhaka',
        area: 'Dhanmondi',
        address: 'House 48, Road 9/A, Dhanmondi, Dhaka 1209',
        phone: '02-9661034',
        rating: 4.5,
        reviews: 1876,
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=300&fit=crop',
        services: ['Pathology', 'Radiology', 'ECG', 'Endoscopy'],
        hours: '7:00 AM - 11:00 PM',
        verified: true
      },
      {
        id: 6,
        name: 'Labaid Diagnostic',
        category: 'Diagnostic',
        city: 'Dhaka',
        area: 'Dhanmondi',
        address: 'House 06, Road 04, Dhanmondi, Dhaka 1205',
        phone: '10606',
        rating: 4.7,
        reviews: 3124,
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop',
        services: ['Lab Tests', 'Imaging', 'Health Checkup', 'COVID-19 Test'],
        hours: '24/7',
        verified: true,
        featured: true
      }
    ]
  }
}

export default { getAll }
