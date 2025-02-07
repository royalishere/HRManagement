import axios from 'axios';

const API_URL = 'http://localhost:8080/api/points';

export async function initializePoints() {
    return await axios.get(`${API_URL}/initialize-points`);
}

export async function getAllPoints() {
    return await axios.get(`${API_URL}/getAllPoints`);
}

export async function getPointById(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function addPoint(email, points) {
    return await axios.post(`${API_URL}/add?email=${email}&points=${points}`);
}

export async function transferPoint(emailFrom, emailTo, points) {
    return await axios.post(`${API_URL}/transfer-point?emailFrom=${emailFrom}&emailTo=${emailTo}&points=${points}`);
}

export async function redeemReward(id, rewardPoints) {
    return await axios.post(`${API_URL}/reward?id=${id}&rewardPoints=${rewardPoints}`);
}