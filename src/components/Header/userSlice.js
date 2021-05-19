import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
        accessToken: JSON.parse(localStorage.getItem('access-token')) || '',
        petsList: JSON.parse(localStorage.getItem('petsList')) || [],
    },
    reducers: {
        updateCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        updateAccessToken(state, action) {
            state.accessToken = action.payload
        },
        updatePetsList(state, action) {
            state.petsList = action.payload
        },
        clear(state) {
            state.currentUser = {}
            state.accessToken = ''
            state.petsList = []
        }
    },
})

const { actions, reducer } = userSlice;
export const {updateCurrentUser, clear, updateAccessToken, updatePetsList} = actions
export default reducer;
