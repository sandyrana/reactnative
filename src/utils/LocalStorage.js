import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DETAILS = 'user_details';


export const getUserDetails = async () => {
  try {
    const userDetails = await AsyncStorage.getItem(USER_DETAILS)
    return userDetails != null ? JSON.parse(userDetails) : null;
  } catch (e) {
    // error reading value
  }
}


export const setUserDetails = async (value) => {
  try {
    await AsyncStorage.setItem(USER_DETAILS, JSON.stringify(value))
  } catch (e) {
    // saving error
  }
}

export const logout = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};
