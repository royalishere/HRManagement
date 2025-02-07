import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export async function getUserInfo (id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function login (User) {
    return await axios.post(`${API_URL}/login`, User);
}

export function logout () {
    //
}

export async function changePassword (id, oldPassword, newPassword) {
    return await axios.post(`${API_URL}/change-password?id=${id}&oldPassword=${oldPassword}&newPassword=${newPassword}`);
}