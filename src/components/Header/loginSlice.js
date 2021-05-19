import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'login',
    initialState: {
        openLoginForm: false,
    },
    reducers: {
        clickOpen(state) {
            state.openLoginForm = true;
        },
        clickClose(state) {
            state.openLoginForm = false;
        },
    },
})

const { actions, reducer } = userSlice;
export const { clickClose, clickOpen} = actions
export default reducer;
