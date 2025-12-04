import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from '../store/store';

import MainLayout from '../components/layout/MainLayout';

import HomePage from '../pages/HomePage';
import FacilitiesPage from '../pages/FacilitiesPage';
import FacilityDetailsPage from '../pages/FacilityDetailsPage';
import DoctorsPage from '../pages/DoctorsPage';
import DoctorProfilePage from '../pages/DoctorProfilePage';
import EmergencyPage from '../pages/EmergencyPage';
import AboutPage from '../pages/AboutPage';
import AppointmentPage from '../pages/AppointmentPage';
import MyAppointmentsPage from '../pages/MyAppointmentsPage';
import NotFoundPage from '../pages/NotFoundPage';

function AppRoutes() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="facilities" element={<FacilitiesPage />} />
            <Route path="facilities/:id" element={<FacilityDetailsPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="doctors/:id" element={<DoctorProfilePage />} />
            <Route path="emergency" element={<EmergencyPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="appointments/book" element={<AppointmentPage />} />
            <Route path="my-appointments" element={<MyAppointmentsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              fontWeight: 'bold',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default AppRoutes;