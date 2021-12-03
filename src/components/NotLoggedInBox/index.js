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
            <Link to="/register" className={styles.linkButton}><Button
                variant="contained"
                size="large"
            >Register</Button></Link>
            <Link to="/login" className={styles.linkButton}><Button
                variant="outlined"
                size="large"
            >Log in</Button></Link>
        </Stack>
    </>
}

export default NotLoggedInBox
