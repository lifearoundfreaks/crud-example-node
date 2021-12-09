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
import { useClientAPI } from "../../../hooks"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { clearUser } from "../../CoreFunctionality/LoggedUser/slice"
import { useRoutes } from "../../../hooks/useRoutes"
import style from './styles.module.css'

const REQUIRED_FIELDS = [
    'name',
    'email',
]

const EditUserModal = ({
    userData,
    open,
    setOpen,
    setLoading,
}) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        isAdmin: false,
    })

    const [formErrors, setFormErrors] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { routePaths } = useRoutes()

    const { updateUser } = useClientAPI()

    const setFormValue = (field, value) => setFormData({ ...formData, [field]: value })

    const gerFieldRequiredErrors = () => Object.fromEntries(REQUIRED_FIELDS.filter(
        requiredField => !formData[requiredField]
    ).map(requiredField => [
        requiredField, "This field is required."
    ]))

    const initialValidation = () => {
        const formErrors = gerFieldRequiredErrors()
        setFormErrors(formErrors)
        return !Object.keys(formErrors).length
    }

    const handleClick = () => {

        if (initialValidation()) {
            setLoading(true)
            updateUser(
                userData.id,
                formData.name,
                formData.email,
                formData.isAdmin,
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
                            onChange={e => setFormValue("name", e.target.value)}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                            defaultValue={formData.name}
                        />
                        <TextField
                            label="Email"
                            onChange={e => setFormValue("email", e.target.value)}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            defaultValue={formData.email}
                        />
                        <FormControlLabel
                            label="Is admin"
                            control={<Checkbox
                                checked={formData.isAdmin}
                                onChange={event => setFormValue("isAdmin", event.target.checked)}
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
