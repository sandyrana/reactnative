// import axios from 'react-native-axios';
//const URL = 'http://192.168.1.101/grocerystore/';
 //const URL = 'https://megagrocerystore.000webhostapp.com/';
//  const URL = 'http://localhost/RestApi';
//  const URL = "http://1a80-103-148-144-194.ngrok.io/RestApi"
const URL ="https://sandeep-rana.000webhostapp.com/RestApi/"

export const BASE_URL = URL;

// const API = async config => {
  
//   axios.interceptors.response.use(
//     response => {
//       return response;
//     },
//     function(error) {
//       if (!error.response) {
//         error.response = {
//           data: 'net work error',
//           status: 500,
//         };
//       }
//       if (error.response.status === 401) {
//         console.log('Unauthorised');
//       }
//       return Promise.reject(error);
//     },
//   );
//   config.baseURL = URL;
//   return axios(config);
// };
// export default API;
