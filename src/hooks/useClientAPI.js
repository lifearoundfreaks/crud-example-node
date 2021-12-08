import { useServerRequests } from '.'
import { API_ENDPOINT } from '../const'

const useClientAPI = () => {

    const { get, post, put, deleteById } = useServerRequests()

    const logOut = () => post(`/${API_ENDPOINT}/session`, {
        logOut: true,
    })

    const logIn = (email, password) => post(`/${API_ENDPOINT}/session`, {
        email: email,
        password: password,
    })

    const getUser = () => get(`/${API_ENDPOINT}/session`)

    const getProfiles = () => get(`/${API_ENDPOINT}/profiles`)

    const registerUser = (
        name,
        email,
        password,
        isAdmin,
        logIn = false,
    ) => post(`/${API_ENDPOINT}/users`, {
        name: name,
        email: email,
        password: password,
        logIn: logIn,
        isAdmin: isAdmin,
    })

    const createProfile = (
        name,
        gender,
        birthdate,
        city,
        userId,
    ) => post(`/${API_ENDPOINT}/profiles`, {
        name: name,
        gender: gender,
        birthdate: birthdate,
        city: city,
        ...(userId ? { userId } : {}),
    })

    const updateProfile = (
        id,
        name,
        gender,
        birthdate,
        city,
    ) => put(`/${API_ENDPOINT}/profiles/`, {
        name: name,
        gender: gender,
        birthdate: birthdate,
        city: city,
    }, id)

    const updateUser = (
        id,
        name,
        email,
        isAdmin,
    ) => put(`/${API_ENDPOINT}/users/`, {
        name: name,
        email: email,
        isAdmin: isAdmin,
    }, id)

    const deleteProfile = id => deleteById(
        `/${API_ENDPOINT}/profiles/`, id
    )

    const deleteUser = id => deleteById(
        `/${API_ENDPOINT}/users/`, id
    )

    const getDashboard = () => get(`/${API_ENDPOINT}/dashboard`)

    const getUsers = () => get(`/${API_ENDPOINT}/users`)

    const getUserWithProfiles = id => get(`/${API_ENDPOINT}/users/${id}/profiles`)

    return {
        logOut,
        logIn,
        getUser,
        registerUser,
        getProfiles,
        createProfile,
        updateProfile,
        updateUser,
        deleteProfile,
        deleteUser,
        getDashboard,
        getUsers,
        getUserWithProfiles,
    }
}

export default useClientAPI
