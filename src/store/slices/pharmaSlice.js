import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pharmaService from '../../services/pharmaServices';

const { getAll } = pharmaService;
// Initial State
const initialState = {
    pharmacies: [],         // start empty
    allPharmacies: [],      // start empty
    selectedPharmacy: null,
    filters: {
        category: 'all',
        city: 'all',
        searchQuery: '',
    },
    loading: false,
    error: null,
};

// Async Thunks
export const fetchPharmacies = createAsyncThunk(
    'pharma/fetchPharmacies',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAll();  // async call
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const pharmaSlice = createSlice({
    name: 'pharma',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.filters.category = action.payload;
            applyFilters(state);
        },
        setCity: (state, action) => {
            state.filters.city = action.payload;
            applyFilters(state);
        },
        setSearchQuery: (state, action) => {
            state.filters.searchQuery = action.payload;
            applyFilters(state);
        },
        setSelectedPharmacy: (state, action) => {
            state.selectedPharmacy = action.payload;
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
            state.pharmacies = state.allPharmacies;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPharmacies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPharmacies.fulfilled, (state, action) => {
                state.loading = false;
                state.allPharmacies = action.payload;
                state.pharmacies = action.payload;
                applyFilters(state);
            })
            .addCase(fetchPharmacies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Helper function to apply filters
const applyFilters = (state) => {
    let filtered = state.allPharmacies;
    const { category, city, searchQuery } = state.filters;
    if (category !== 'all') {
        filtered = filtered.filter(pharmacy => pharmacy.category.toLowerCase() === category.toLowerCase());
    }
    if (city !== 'all') {
        filtered = filtered.filter(pharmacy => pharmacy.city.toLowerCase() === city.toLowerCase());
    }
    if (searchQuery) {
        filtered = filtered.filter(pharmacy =>
            pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pharmacy.area.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    state.pharmacies = filtered;
};

// Actions
export const {
    setCategory,
    setCity,
    setSearchQuery,
    setSelectedPharmacy,
    clearFilters
} = pharmaSlice.actions;

export default pharmaSlice.reducer;