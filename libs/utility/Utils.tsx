import doctor from 'assets/icon/doctor.png';
import nurse from 'assets/icon/nurse.png';
import healer from 'assets/icon/healer.png';
import clinic from 'assets/icon/clinic.png';
import physio from 'assets/icon/physio.png';
import doctorOnline from 'assets/icon/doctorOnline.png';

export const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const numericPattern = /^[0-9]+$/;
export const generateRandomName = () => {
  let randomstring = Math.random().toString(36).slice(2);
  return randomstring;
};

export const getProviderImage = (type: string) => {
  const image = type.includes('Doctor')
    ? doctor
    : type.includes('Nurse')
    ? nurse
    : type.includes('Healer') || type.includes('Alternative')
    ? healer
    : type.includes('Physio')
    ? physio
    : type.includes('Clinics')
    ? clinic
    : doctorOnline;
  return image;
};
