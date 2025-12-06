const KEY = 'bd_healthcare_appointments_v1';

export function getAppointmentsFromLocalStorage() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (err) {
        console.error('Failed to read appointments from localStorage', err);
        return [];
    }
}

export function saveAppointmentToLocalStorage(appointment) {
    try {
        const existing = getAppointmentsFromLocalStorage();
        const merged = [appointment, ...existing];
        localStorage.setItem(KEY, JSON.stringify(merged));
        return merged;
    } catch (err) {
        console.error('Failed to save appointment to localStorage', err);
        return null;
    }
}

export function updateAppointmentInLocalStorage(id, updates) {
    try {
        const existing = getAppointmentsFromLocalStorage();
        const updated = existing.map(appt =>
            appt.id === id ? { ...appt, ...updates } : appt
        );
        localStorage.setItem(KEY, JSON.stringify(updated));
        return updated;
    } catch (err) {
        console.error('Failed to update appointment in localStorage', err);
        return null;
    }
}

export function deleteAppointmentFromLocalStorage(id) {
    try {
        const existing = getAppointmentsFromLocalStorage();
        const filtered = existing.filter(appt => appt.id !== id);
        localStorage.setItem(KEY, JSON.stringify(filtered));
        return filtered;
    } catch (err) {
        console.error('Failed to delete appointment from localStorage', err);
        return null;
    }
}
