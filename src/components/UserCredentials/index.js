import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectLoggedUser } from "../LoggedUser/slice"

const UserCredentials = () => {

    const user = useSelector(selectLoggedUser)

    return <Typography
        variant="h6"
        noWrap
        component="div"
    >{user.username}</Typography>
}

export default UserCredentials
