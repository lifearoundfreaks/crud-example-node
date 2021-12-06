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
        logIn=false,
    ) => post(`/${API_ENDPOINT}/users`, {
        name: name,
        email: email,
        password: password,
        logIn: logIn,
    })

    const createProfile = (
        name,
        gender,
        birthdate,
        city,
    ) => post(`/${API_ENDPOINT}/profiles`, {
        name: name,
        gender: gender,
        birthdate: birthdate,
        city: city,
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

    const deleteProfile = id => deleteById(
        `/${API_ENDPOINT}/profiles/`, id
    )

    return {
        logOut,
        logIn,
        getUser,
        registerUser,
        getProfiles,
        createProfile,
        updateProfile,
        deleteProfile,
    }
}

export default useClientAPI
