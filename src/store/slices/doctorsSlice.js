import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import doctorService from '../../services/doctorService';

const { getAll } = doctorService;

const initialState = {
    doctors: [],
    allDoctors: [],
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
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAll();  // async call
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchDoctorById = createAsyncThunk(
    'doctors/fetchDoctorById',
    async (id, { rejectWithValue }) => {
        try {
             const response = await getAll();
            const doctor = response.data.find(d => d.id === parseInt(id));
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