import { createSlice } from '@reduxjs/toolkit'

const loadingUser = {
    name: undefined,
    loading: true,
    loggedIn: false,
    isAdmin: false,
}
const anonymousUser = { ...loadingUser, loading: false }

const setUserData = (state, userData) => {
    state.username = userData.name
    state.isAdmin = userData.isAdmin || false
    state.loggedIn = userData.name !== undefined
    state.loading = userData.loading || false
}

export const loggedUserSlice = createSlice({
    name: 'loggedUser',
    initialState: loadingUser,
    reducers: {
        setUser: (state, action) => setUserData(state, action.payload),
        clearUser: (state) => setUserData(state, anonymousUser),
        setLoading: (state) => setUserData(state, loadingUser),
    },
})

export const {
    setUser,
    clearUser,
    setLoading,
} = loggedUserSlice.actions

export const selectLoggedUser = (state) => state.loggedUser

export default loggedUserSlice.reducer
