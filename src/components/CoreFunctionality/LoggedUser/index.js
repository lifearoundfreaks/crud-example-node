import { useDispatch } from 'react-redux'
import { useEffect } from "react"
import { useClientAPI } from '../../../hooks'
import { setUser } from './slice';

const LoggedUser = () => {

    const dispatch = useDispatch()
    const { getUser } = useClientAPI()
    
    useEffect(() => {
        getUser().then(user => {
            dispatch(setUser(user))
        })
    }, [getUser, dispatch])
    return null
}

export default LoggedUser
