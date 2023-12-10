import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'global', 
    initialState: {
        mode: '',
        color: '',
        language: 'vi',
        loading: false
    },
    reducers: {
        setMode: (state, action) => {
            return {
                ...state,
                mode: action.payload
            }
        },
        setLoading:(state, action) =>{
            state.loading = action.payload
        },

        setColor: (state, action) => {
            return {
                ...state,
                color: action.payload
            }
        },

        getTheme: state => {
            return state
        },

        setLanguage: (state, action) => {
            localStorage.setItem('i18n', action.payload)
            return {
                ...state,
                language: action.payload
            }
        }
    }
})

export default globalSlice