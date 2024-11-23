import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    access_token: '',
    id: '',
    avatar: '', 
    isAdmin: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {name = '', email = '',phone = '', age = '', address = '', _id = '' ,access_token = '', avatar = '', isAdmin} = action.payload
            state.id = _id  // Add _id to the state if it exists in the API response
            state.name = name
            state.email = email
            state.phone = phone
            state.age = age
            state.address = address
            state.avatar = avatar  
            state.access_token = access_token
            state.isAdmin = isAdmin  
        },
        resetUser: (state) => {
            state.id = ''  
            state.name = ''
            state.email = ''
            state.phone = ''
            state.age = ''
            state.address = ''
            state.avatar = ''  
            state.access_token = ''
            state.isAdmin = false  
        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer