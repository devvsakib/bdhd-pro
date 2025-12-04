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
