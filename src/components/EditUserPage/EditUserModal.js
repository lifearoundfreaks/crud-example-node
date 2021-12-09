import {
    Backdrop,
    Modal,
    Fade,
    Button,
    Stack,
    TextField,
    FormControlLabel,
    Checkbox,
} from "@mui/material"
import { useState } from "react"
import { useClientAPI } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { clearUser } from "../LoggedUser/slice"
import { useRoutes } from "../../hooks/useRoutes"
import style from './styles.module.css'

const EditUserModal = ({
    userData,
    open,
    setOpen,
    setLoading,
}) => {

    const [name, setName] = useState(userData.name)
    const [email, setEmail] = useState(userData.email)
    const [isAdmin, setIsAdmin] = useState(userData.isAdmin)

    const [formErrors, setFormErrors] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { routePaths } = useRoutes()

    const { updateUser } = useClientAPI()

    const initialValidation = () => {
        const formErrors = {}
        if (!name) formErrors.name = "This field is required."
        if (!email) formErrors.city = "This field is required."
        setFormErrors(formErrors)
        return !Object.keys(formErrors).length
    }

    const handleClick = () => {

        if (initialValidation()) {
            setLoading(true)
            updateUser(
                userData.id,
                name,
                email,
                isAdmin,
            ).then(data => {
                if (data.logOut) {
                    dispatch(clearUser())
                    navigate(routePaths.home)
                } else navigate(routePaths.users)
            })
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
                className={style.userModal}
            >
                <Fade in={open}>
                    <Stack
                        component="form"
                        spacing={2}
                        className={style.userModalContents}
                    >
                        <TextField
                            label="Name"
                            onChange={e => setName(e.target.value)}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                            defaultValue={name}
                        />
                        <TextField
                            label="Email"
                            onChange={e => setEmail(e.target.value)}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            defaultValue={email}
                        />
                        <FormControlLabel
                            label="Is admin"
                            control={<Checkbox
                                checked={isAdmin}
                                onChange={event => setIsAdmin(event.target.checked)}
                            />}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleClick}
                        >Update user</Button>
                    </Stack>
                </Fade>
            </Modal>
        </div>
    )
}

export default EditUserModal
