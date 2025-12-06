const getAll = async () => {
    return {
        data: [{
            id: 21,
            name: 'Lazz Pharma',
            category: 'Pharmacy',
            city: 'Dhaka',
            area: 'Dhanmondi',
            address: 'House 5, Road 2, Dhanmondi, Dhaka',
            phone: '01777-700800',
            email: 'info@lazzpharma.com',
            website: 'www.lazzpharma.com',
            rating: 4.6,
            reviews: 456,
            image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=300&fit=crop',
            services: ['Prescription Medicines', 'OTC Drugs', 'Healthcare Products', 'Home Delivery', 'Online Ordering'],
            hours: '24/7',
            verified: true,
            featured: true,
            homeDelivery: true,
            onlineOrdering: true,
            description: 'Lazz Pharma is a leading pharmacy chain in Bangladesh providing quality medicines and healthcare products.',
            branches: ['Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur']
        },
        {
            id: 22,
            name: 'Meditrina Pharma',
            category: 'Pharmacy',
            city: 'Dhaka',
            area: 'Gulshan',
            address: 'House 45, Road 11, Gulshan 1, Dhaka',
            phone: '01777-111111',
            email: 'info@meditrina.com.bd',
            rating: 4.7,
            reviews: 567,
            image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop',
            services: ['Medicines', 'Medical Equipment', 'Baby Care', 'Vitamins & Supplements', 'Home Delivery'],
            hours: '8:00 AM - 11:00 PM',
            verified: true,
            homeDelivery: true,
            onlineOrdering: true,
            description: 'Meditrina Pharma offers a wide range of pharmaceutical products and healthcare services.',
            branches: ['Gulshan', 'Banani', 'Dhanmondi']
        }]
    }
}

export default { getAll }