import doctorService from '../services/doctorService'
import facilityService from '../services/facilityService'

export const selectDoctorsByFacilityName = async (facilityName) => {
    if (!facilityName) return []
    const norm = (s) => (s || '').toString().trim().toLowerCase()
    const target = norm(facilityName)

    try {
        const res = await doctorService.getAll()
        const allDoctors = res?.data ?? []
        return allDoctors.filter((doc) => norm(doc.chamber) === target)
    } catch (err) {
        console.error('Failed to fetch doctors', err)
        return []
    }
}

export const selectFacilityByDoctorId = async (doctorId) => {
    if (!doctorId) return [];

    try {
        const [docRes, facRes] = await Promise.all([doctorService.getAll(), facilityService.getAll()]);
        const allDoctors = docRes?.data ?? [];
        const allFacilities = facRes?.data ?? [];

        const doctor = allDoctors.find(d => String(d.id) === String(doctorId));
        if (!doctor) return [];

        // if facilityIds exist on doctor -> return those facilities
        if (Array.isArray(doctor.facilityIds) && doctor.facilityIds.length > 0) {
            const ids = doctor.facilityIds.map(Number);
            return allFacilities.filter(f => ids.includes(Number(f.id)));
        }

        // fallback: try to match chamber name to facility name (normalized)
        const norm = (s) => (s || '').toString().trim().toLowerCase();
        const docChamber = norm(doctor.chamber);
        const matched = allFacilities.filter(f => norm(f.name) === docChamber || norm(f.name).includes(docChamber) || docChamber.includes(norm(f.name)));
        return matched;
    } catch (err) {
        console.error('selectFacilityByDoctorId failed', err);
        return [];
    }
}; 