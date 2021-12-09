import { Typography, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectLoggedUser } from "../LoggedUser/slice"
import style from './styles.module.css'

const UserCredentials = () => {

    const user = useSelector(selectLoggedUser)

    return <>
        <img src={process.env.PUBLIC_URL + (user.isAdmin ? '/adminAvatar.png' : '/avatar.png')} />
        <Typography
            variant="h6"
            noWrap
            component="div"
            className={style.username}
        >- {user.username}</Typography>
    </>
}

export default UserCredentials
