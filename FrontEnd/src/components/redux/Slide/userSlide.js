import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    access_token: '',
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {name, email, access_token} = action.payload
            console.log('acction',action)
        },
    },
})

export const { updateUser } = userSlide.actions

export default userSlide.reducer