import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/Header/userSlice';
import loginReducer from '../components/Header/loginSlice';

const rootReducer = {
    user: userReducer,
    login: loginReducer
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;