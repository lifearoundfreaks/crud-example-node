import {
    Button,
    Stack,
    TextField,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Checkbox,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {
    setLoading,
    setUser,
    clearUser,
    selectLoggedUser,
} from "../../CoreFunctionality/LoggedUser/slice"
import { useClientAPI } from "../../../hooks"
import { useRoutes } from "../../../hooks/useRoutes"

const REQUIRED_FIELDS = [
    'name',
    'email',
    'password',
    'passwordRepeat',
]

const RegisterForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordRepeat: "",
        isAdmin: false,
    })
    const [formErrors, setFormErrors] = useState({})
    const { routePaths } = useRoutes()

    const { registerUser } = useClientAPI()
    const user = useSelector(selectLoggedUser)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const setFormValue = (field, value) => setFormData({ ...formData, [field]: value })

    const getPasswordErrors = () => formData.password !== formData.passwordRepeat ? {
        password: "Passwords do not match.",
        passwordRepeat: "Passwords do not match.",
    } : {}

    const gerFieldRequiredErrors = () => Object.fromEntries(REQUIRED_FIELDS.filter(
        requiredField => !formData[requiredField]
    ).map(requiredField => [
        requiredField, "This field is required."
    ]))

    const initialValidation = () => {
        const formErrors = {
            ...getPasswordErrors(),
            ...gerFieldRequiredErrors(),
        }
        setFormErrors(formErrors)
        return !Object.keys(formErrors).length
    }

    const getServerErrors = response => ({
        'name must be unique': { name: "Username already taken." },
        'email must be unique': { name: "Email already in use." },
    }[response.errors?.length && response.errors[0].message])

    const handleClick = () => {

        if (initialValidation()) {
            dispatch(setLoading())
            registerUser(
                formData.name,
                formData.email,
                formData.password,
                formData.isAdmin,
                true,
            ).then(data => {
                const serverErrors = getServerErrors(data)
                if (serverErrors) {
                    setFormErrors(serverErrors)
                    dispatch(clearUser())
                } else {
                    dispatch(setUser(data))
                    navigate(routePaths.home)
                }
            })
        }
    }

    return user.loading ? <CircularProgress /> : <Stack
        component="form"
        spacing={2}
    >
        <TextField
            label="Name"
            onChange={e => setFormValue("name", e.target.value)}
            error={!!formErrors.name}
            helperText={formErrors.name}
            value={formData.name}
        />
        <TextField
            label="Email"
            onChange={e => setFormValue("email", e.target.value)}
            error={!!formErrors.email}
            helperText={formErrors.email}
            value={formData.email}
        />
        <TextField
            label="Password"
            type="password"
            onChange={e => setFormValue("password", e.target.value)}
            error={!!formErrors.password}
            helperText={formErrors.password}
            value={formData.password}
        />
        <TextField
            label="Repeat password"
            type="password"
            onChange={e => setFormValue("passwordRepeat", e.target.value)}
            error={!!formErrors.passwordRepeat}
            helperText={formErrors.passwordRepeat}
            value={formData.passwordRepeat}
        />
        <FormControlLabel
            label="Is admin"
            control={<Checkbox
                checked={formData.isAdmin}
                onChange={event => setFormValue("isAdmin", event.target.checked)}
            />}
        />
        <FormControl><Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={handleClick}>Sign Up</Button>
            <Button
                variant="outlined"
                size="large"
                to={routePaths.login}
                component={Link}
            >Sign in</Button>
        </Stack></FormControl>
    </Stack>
}

export default RegisterForm
