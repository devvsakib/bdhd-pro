export const APP_NAME = 'BD Healthcare Directory'

export const CATEGORIES = {
    ALL: 'all',
    HOSPITAL: 'Hospital',
    DIAGNOSTIC: 'Diagnostic',
    CLINIC: 'Clinic',
    PHARMACY: 'Pharmacy'
};

export const CITIES = [
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barishal',
    'Rangpur',
    'Mymensingh'
];

export const SPECIALTIES = [
    'Cardiologist',
    'Neurologist',
    'Pediatrician',
    'Gynecologist',
    'Orthopedic',
    'Dermatologist',
    'ENT Specialist',
    'Psychiatrist',
    'Ophthalmologist'
];

export const EMERGENCY_NUMBERS = [
    { name: 'National Emergency', number: '999' },
    { name: 'Fire Service', number: '16163' },
    { name: 'Police', number: '100' }
];

export default {
    CATEGORIES,
    CITIES,
    SPECIALTIES,
    EMERGENCY_NUMBERS
};