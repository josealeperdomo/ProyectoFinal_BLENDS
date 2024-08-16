import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://sa.backendprueba.xyz:3001",
});

export default axiosInstance