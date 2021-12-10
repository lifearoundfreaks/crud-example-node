import { Button, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import styles from './styles.module.css'
import { useClientAPI } from "../../../hooks"
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, clearUser, selectLoggedUser } from "../../coreFunctionality/LoggedUser/slice"
import { useRoutes } from "../../../hooks/useRoutes"

const LogoutButton = () => {

    const { logOut } = useClientAPI()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedUser)
    const { routePaths } = useRoutes()

    const handleClick = () => {
        dispatch(setLoading())
        logOut().then(() => {
            dispatch(clearUser())
            navigate(routePaths.home)
        })
    }

    return <Button
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        className={styles.logOutButton}
    >{user.loading ? <CircularProgress size={25} color="inherit" /> : "Log out"}</Button>
}

export default LogoutButton
