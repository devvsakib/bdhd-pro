import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import facilityService from '../../services/facilityService';

const { getAll } = facilityService;

// Initial State
const initialState = {
  facilities: [],         // start empty
  allFacilities: [],      // start empty
  selectedFacility: null,
  filters: {
    category: 'all',
    city: 'all',
    searchQuery: '',
  },
  loading: false,
  error: null,
};

// Async Thunks
export const fetchFacilities = createAsyncThunk(
  'facilities/fetchFacilities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAll();  // async call
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFacilityById = createAsyncThunk(
  'facilities/fetchFacilityById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAll();
      const facility = response.data.find(f => f.id === parseInt(id));
      if (!facility) throw new Error('Facility not found');
      return facility;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const facilitiesSlice = createSlice({
  name: 'facilities',
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
    setSelectedFacility: (state, action) => {
      state.selectedFacility = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.facilities = state.allFacilities;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.allFacilities = action.payload;
        state.facilities = action.payload;
        applyFilters(state);
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFacilityById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFacilityById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFacility = action.payload;
      })
      .addCase(fetchFacilityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Helper
function applyFilters(state) {
  let filtered = [...state.allFacilities];

  if (state.filters.category !== 'all') {
    filtered = filtered.filter(f => f.category === state.filters.category);
  }
  if (state.filters.city !== 'all') {
    filtered = filtered.filter(f => f.city === state.filters.city);
  }
  if (state.filters.searchQuery) {
    const query = state.filters.searchQuery.toLowerCase();
    filtered = filtered.filter(f =>
      f.name.toLowerCase().includes(query) ||
      f.area.toLowerCase().includes(query) ||
      f.services?.some(s => s.toLowerCase().includes(query))
    );
  }

  state.facilities = filtered;
}

export const {
  setCategory,
  setCity,
  setSearchQuery,
  setSelectedFacility,
  clearFilters,
} = facilitiesSlice.actions;

export default facilitiesSlice.reducer;
