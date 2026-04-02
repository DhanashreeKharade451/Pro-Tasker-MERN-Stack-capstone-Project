import axios from 'axios'

export const userClient = axios.create({
    baseURL: 'http://localhost:3000/api/users'
})








// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// export default API;