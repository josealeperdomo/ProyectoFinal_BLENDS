import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://estudiantes12.backendprueba.xyz",
});

export default axiosInstance