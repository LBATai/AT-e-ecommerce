import axios from 'axios';

export const signIn  = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/user/sign-in`, data)
    return res.data;
}
export const signUp  = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/user/sign-up`, data)
    return res.data;
}
export const getDetailsUser  = async (id, access_token) => {
    // console.log('Fetching details for user ID:', id);
    // console.log('Using token:', access_token);
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/user/get-detailsUser/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data;
}