import { Button, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import styles from './styles.module.css'
import { useClientAPI } from "../../hooks"
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, clearUser, selectLoggedUser } from "../LoggedUser/slice"

const LogOutButton = () => {

    const { logOut } = useClientAPI()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedUser)

    const handleClick = () => {
        dispatch(setLoading())
        logOut().then(() => {
            dispatch(clearUser())
            navigate("/")
        })
    }

    return <Button
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        className={styles.logOutButton}
    >{user.loading ? <CircularProgress size={25} color="inherit" /> : "Log out"}</Button>
}

export default LogOutButton
