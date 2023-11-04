export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const numericPattern = /^[0-9]+$/;
export const generateRandomName = () => {
    let randomstring = Math.random().toString(36).slice(2);
    return randomstring;
}