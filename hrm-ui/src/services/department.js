import axios from 'axios';

const API_URL = 'http://localhost:8080/api/departments';

export async function getAllDepartments() {
    return await axios.get(`${API_URL}`);
}

export async function getDepartmentByName(name) {
    return await axios.get(`${API_URL}/${name}`);
}

export async function addEmpToDepartment(name, employeeId) {
    return await axios.put(`${API_URL}/${name}/add?employeeId=${employeeId}`);
}

export async function removeEmpFromDepartment(name, employeeId) {
    return await axios.put(`${API_URL}/${name}/remove?employeeId=${employeeId}`);
}