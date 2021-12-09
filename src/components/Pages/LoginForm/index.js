import {
    Button,
    Stack,
    TextField,
    CircularProgress,
    FormControl,
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
    'email',
    'password',
]

const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [formErrors, setFormErrors] = useState({})
    const { logIn } = useClientAPI()

    const user = useSelector(selectLoggedUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { routePaths } = useRoutes()

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

    const getServerErrors = error => error === "No such user." ?
        { email: error } : { password: error }

    const handleClick = () => {
        if (initialValidation()) {
            dispatch(setLoading())
            logIn(formData.email, formData.password).then(data => {
                if (data.name) {
                    dispatch(setUser(data))
                    navigate(routePaths.home)
                }
                else {
                    dispatch(clearUser())
                    setFormErrors(getServerErrors(data.error))
                }
            })
        }
    }

    return user.loading ? <CircularProgress /> : <Stack
        component="form"
        spacing={2}
    >
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
        <FormControl><Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={handleClick}>Sign in</Button>
            <Button
                variant="outlined"
                size="large"
                to={routePaths.register}
                component={Link}
            >Sign Up</Button>
        </Stack></FormControl>
    </Stack>
}

export default LoginForm
