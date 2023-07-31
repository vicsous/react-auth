import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
const baseURL = import.meta.env.VITE_REACT_APP_API_URI;

const accessToken = localStorage.getItem('accessToken') || null;

if(accessToken === 'undefined') {
    localStorage.removeItem('accessToken')
}

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${accessToken || ''}`}
})


axiosInstance.interceptors.request.use(async req => {
    if (!accessToken) return req;
    const isExpired = dayjs.unix(jwtDecode(accessToken).exp).diff(dayjs()) < 1;
    if(isExpired) {
        const response = await axios.post(baseURL + '/api/refresh', null, { withCredentials:  true })
        localStorage.setItem('accessToken', response.data.newAccessToken)
        req.headers.Authorization = `Bearer ${response.data.newAccessToken}`
        return req
    } else {
        return req
    }
})

export default axiosInstance