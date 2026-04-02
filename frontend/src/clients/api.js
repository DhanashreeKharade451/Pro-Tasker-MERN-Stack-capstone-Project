import axios from 'axios'

export const userClient = axios.create({
    baseURL: 'http://localhost:3000/api/users'
})
