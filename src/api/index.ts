import axios from "axios";

const apiAxios = axios.create({
    baseURL: "/api",
    timeout: 10000,
    withCredentials: true,
});

// response interceptor for 401 error
apiAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirect to login
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default apiAxios;