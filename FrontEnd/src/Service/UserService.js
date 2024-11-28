import axios from 'axios';

axios.defaults.withCredentials = true;
export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, // Bắt buộc để gửi và nhận cookies
});

export const signIn  = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/user/sign-in`, data)
    return res.data;
}
export const signUp  = async (data) => {
    console.log('data',data)
    const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/user/sign-up`, data)
    return res.data;
}
export const getDetailsUser  = async (id, access_token) => {
    console.log('userservice acctoken:', id, access_token)
    const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL_BACKEND}/user/get-detailsUser/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data;
}
export const deleteUser = async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL_BACKEND}/user/delete-user/${id}`)
    return res.data;
}
export const getAllUser  = async () => {
    // console.log('userservice acctoken:', id, access_token)
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/user/getAllUser`)
    return res.data;
}
export const refreshToken = async () => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/refresh-token`,
        {   baseURL: import.meta.env.VITE_API_URL_BACKEND,
            withCredentials: true 
        } 
    );
    return res.data;
}
export const signOut = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/user/sign-out`);
    return res.data;
}
export const updateUser  = async (id, access_token, data) => {
    console.log('acctoken:', access_token, )
    const res = await axiosJWT.put(`${import.meta.env.VITE_API_URL_BACKEND}/user/update-user/${id}`,data,{
    headers: {
        token: `Bearer ${access_token}`,
    }
})
return res.data;
}
