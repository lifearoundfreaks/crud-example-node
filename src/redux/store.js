import { configureStore } from '@reduxjs/toolkit'
import loggedUserReducer from '../components/CoreFunctionality/LoggedUser/slice'

export const store = configureStore({
    reducer: {
        loggedUser: loggedUserReducer,
    },
})

export default store
