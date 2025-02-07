import axios from 'axios';

const API_URL = 'http://localhost:8080/api/rewards';

export async function getAllRewards() {
    return await axios.get(`${API_URL}`);
}