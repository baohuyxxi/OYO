import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current:  JSON.parse(localStorage.getItem('user') || null),
        settings: false
    },
    reducers: {
        signup(state, action) {
        },
        signin(state, action) {
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            localStorage.setItem('user', JSON.stringify(action.payload.infoUserResponse))
            state.current= action.payload.infoUserResponse
        },
        setProfile(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload.data))
        },
        logout(state) {
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            state.current = null
        },
        editInfo(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.current =  JSON.parse(localStorage.getItem('user') || null)
        },
        updateHost(state) {
            state.settings = true
        },
        refreshToken(state, action){
            localStorage.setItem('accessToken', action.payload.accessToken)
        }
    },
   
})

export default userSlice