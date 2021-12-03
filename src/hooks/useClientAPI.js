import { useServerRequests } from '.'
import { API_ENDPOINT } from '../const'

const useClientAPI = () => {

    const { get, post } = useServerRequests()

    const logOut = () => post(`/${API_ENDPOINT}/session`, {
        logOut: true,
    })

    const logIn = (email, password) => post(`/${API_ENDPOINT}/session`, {
        email: email,
        password: password,
    })

    const getUser = () => get(`/${API_ENDPOINT}/session/`)

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

    return {
        logOut,
        logIn,
        getUser,
        registerUser,
    }
}

export default useClientAPI
