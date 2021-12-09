import { Button, Stack, CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectLoggedUser } from "../LoggedUser/slice"
import { useRoutes } from "../../../hooks/useRoutes"
import styles from './styles.module.css'

const NotLoggedInBox = () => {

    const user = useSelector(selectLoggedUser)
    const { routePaths } = useRoutes()

    return user.loading ? <CircularProgress /> : <>
        <p className={styles.notLoggedInText}>Currently not logged in.</p>
        <Stack spacing={2} direction="row">
            <Button
                variant="contained"
                size="large"
                to={routePaths.register}
                component={Link}
            >Sign up</Button>
            <Button
                variant="outlined"
                size="large"
                to={routePaths.login}
                component={Link}
            >Sign in</Button>
        </Stack>
    </>
}

export default NotLoggedInBox
