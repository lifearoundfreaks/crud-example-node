import { Typography, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectLoggedUser } from "../LoggedUser/slice"
import avatar from '../../../assets/png/avatar.png'
import adminAvatar from '../../../assets/png/adminAvatar.png'
import style from './styles.module.css'

const UserCredentials = () => {

    const user = useSelector(selectLoggedUser)

    return <>
        <img src={user.isAdmin ? adminAvatar : avatar} />
        <Typography
            variant="h6"
            noWrap
            component="div"
            className={style.username}
        >- {user.username}</Typography>
    </>
}

export default UserCredentials
