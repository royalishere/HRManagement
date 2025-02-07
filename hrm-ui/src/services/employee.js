import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees';

export async function createEmployee(employee) {
    return await axios.post(`${API_URL}/create`, employee);
}

export async function getAllEmployees() {
    return await axios.get(`${API_URL}`);
}

export async function getEmployeeById(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function  getEmployeeByEmail(email) {
    return await axios.get(`${API_URL}/email?email=${email}`);
}

export async function updateEmployeeBasicInfo(id, employee) {
    return await axios.put(`${API_URL}/${id}`, employee);
}

export async function updateEmployee(id, employee) {
    return await axios.put(`${API_URL}/info/${id}`, employee);
}