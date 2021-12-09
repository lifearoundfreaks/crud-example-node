import {
    Typography,
    Stack,
    IconButton,
} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useClientAPI } from "../../../hooks"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { clearUser } from "../../CoreFunctionality/LoggedUser/slice"
import { useRoutes } from "../../../hooks/useRoutes"
import style from './styles.module.css'

const EditUserPanel = ({ userData, setLoading, openEditModal }) => {

    const { deleteUser } = useClientAPI()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { routePaths } = useRoutes()

    const handleDelete = () => {
        setLoading(true)
        deleteUser(userData.id).then(data => {
            if (data.logOut) {
                dispatch(clearUser())
                navigate(routePaths.home)
            } else navigate(routePaths.users)
        })
    }

    return <Stack spacing={2} className={style.editUserPanel}>
        <Typography variant="h5" className={style.editUserText}>
            {userData.name}
        </Typography>
        <Typography variant="h5" className={style.editUserText}>
            {userData.email}
        </Typography>
        <Typography className={style.editUserText}>
            {userData.isAdmin ? "admin" : "user"}
        </Typography>
        <Stack spacing={2} direction="row" className={style.userButtons}>
            <IconButton size="small" onClick={openEditModal}><EditIcon /></IconButton>
            <IconButton size="small" onClick={handleDelete}><DeleteIcon /></IconButton>
        </Stack>
    </Stack>
}

export default EditUserPanel
