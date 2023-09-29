import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (key: string, value: string | {}) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log('kml', value, key)
    } catch (error) {
        console.error('Error storing data:', error);
    }
};

const getData = async (key: string) => {
    try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
            console.log('Data retrieved:', JSON.parse(data));
            return JSON.parse(data);
        } else {
            // Key doesn't exist in storage
            return null;
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};

const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing data:', error);
    }
};

const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing data:', error);
    }
};

export { storeData, getData, removeData, clearAllData };
