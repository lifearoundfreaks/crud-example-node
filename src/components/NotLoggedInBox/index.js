import { Button, Stack, CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import { selectLoggedUser } from "../LoggedUser/slice"

const NotLoggedInBox = () => {

    const user = useSelector(selectLoggedUser)

    return user.loading ? <CircularProgress /> : <>
        <p className={styles.notLoggedInText}>Currently not logged in.</p>
        <Stack spacing={2} direction="row">
            <Button
                variant="contained"
                size="large"
                to="/register"
                component={Link}
            >Sign up</Button>
            <Button
                variant="outlined"
                size="large"
                to="/login"
                component={Link}
            >Sign in</Button>
        </Stack>
    </>
}

export default NotLoggedInBox
