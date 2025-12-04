import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockDoctors = [
    {
        id: 1,
        name: 'Dr. Ahmed Hassan',
        specialty: 'Cardiologist',
        qualification: 'MBBS, FCPS (Cardiology), MD',
        experience: 15,
        chamber: 'Square Hospital',
        schedule: 'Sat-Thu: 5:00 PM - 8:00 PM',
        fee: 1500,
        rating: 4.9,
        reviews: 432,
        verified: true,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop'
    },
    {
        id: 2,
        name: 'Dr. Farhana Rahman',
        specialty: 'Gynecologist',
        qualification: 'MBBS, FCPS (Gynecology)',
        experience: 12,
        chamber: 'United Hospital',
        schedule: 'Sun-Thu: 4:00 PM - 7:00 PM',
        fee: 1200,
        rating: 4.8,
        reviews: 289,
        verified: true,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop'
    },
    {
        id: 3,
        name: 'Dr. Kamal Hossain',
        specialty: 'Neurologist',
        qualification: 'MBBS, FCPS, FRCP',
        experience: 18,
        chamber: 'Apollo Hospital',
        schedule: 'Everyday: 6:00 PM - 9:00 PM',
        fee: 2000,
        rating: 4.9,
        reviews: 567,
        verified: true,
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop'
    },
    {
        id: 4,
        name: 'Dr. Nusrat Jahan',
        specialty: 'Pediatrician',
        qualification: 'MBBS, FCPS (Pediatrics)',
        experience: 10,
        chamber: 'Popular Diagnostic',
        schedule: 'Sat-Thu: 3:00 PM - 6:00 PM',
        fee: 1000,
        rating: 4.7,
        reviews: 324,
        verified: true,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop'
    }
];

const initialState = {
    doctors: mockDoctors,
    allDoctors: mockDoctors,
    selectedDoctor: null,
    filters: {
        specialty: 'all',
        searchQuery: '',
    },
    loading: false,
    error: null,
};

export const fetchDoctors = createAsyncThunk(
    'doctors/fetchDoctors',
    async (filters, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockDoctors;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchDoctorById = createAsyncThunk(
    'doctors/fetchDoctorById',
    async (id, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            const doctor = mockDoctors.find(d => d.id === parseInt(id));
            if (!doctor) throw new Error('Doctor not found');
            return doctor;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        setSpecialty: (state, action) => {
            state.filters.specialty = action.payload;
            applyFilters(state);
        },
        setDoctorSearchQuery: (state, action) => {
            state.filters.searchQuery = action.payload;
            applyFilters(state);
        },
        setSelectedDoctor: (state, action) => {
            state.selectedDoctor = action.payload;
        },
        clearDoctorFilters: (state) => {
            state.filters = initialState.filters;
            state.doctors = state.allDoctors;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.allDoctors = action.payload;
                state.doctors = action.payload;
                applyFilters(state);
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchDoctorById.fulfilled, (state, action) => {
                state.selectedDoctor = action.payload;
            });
    },
});

function applyFilters(state) {
    let filtered = [...state.allDoctors];

    if (state.filters.specialty !== 'all') {
        filtered = filtered.filter(d => d.specialty === state.filters.specialty);
    }

    if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(d =>
            d.name.toLowerCase().includes(query) ||
            d.specialty.toLowerCase().includes(query)
        );
    }

    state.doctors = filtered;
}

export const {
    setSpecialty,
    setDoctorSearchQuery,
    setSelectedDoctor,
    clearDoctorFilters,
} = doctorsSlice.actions;

export default doctorsSlice.reducer;