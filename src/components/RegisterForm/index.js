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
} from "../LoggedUser/slice"
import { useClientAPI } from "../../hooks"
import { useRoutes } from "../../hooks/useRoutes"

const RegisterForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const { routePaths } = useRoutes()

    const { registerUser } = useClientAPI()
    const user = useSelector(selectLoggedUser)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValidation = () => {
        const formErrors = {}
        if (password !== passwordRepeat) {
            formErrors.password = "Passwords do not match."
            formErrors.passwordRepeat = "Passwords do not match."
        }
        if (!name) formErrors.name = "This field is required."
        if (!email) formErrors.email = "This field is required."
        if (!password) formErrors.password = "This field is required."
        if (!passwordRepeat) formErrors.passwordRepeat = "This field is required."
        setFormErrors(formErrors)
        return !Object.keys(formErrors).length
    }

    const getServerError = (response) => response.errors?.length && response.errors[0]?.message

    const handleClick = () => {

        if (initialValidation()) {
            dispatch(setLoading())
            registerUser(name, email, password, isAdmin, true).then(data => {
                if (getServerError(data) === 'name must be unique') {
                    setFormErrors({ name: "Username already taken." })
                    dispatch(clearUser())
                }
                else if (getServerError(data) === 'email must be unique') {
                    setFormErrors({ email: "Email already in use." })
                    dispatch(clearUser())
                }
                else {
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
            onChange={e => setName(e.target.value)}
            error={!!formErrors.name}
            helperText={formErrors.name}
            value={name}
        />
        <TextField
            label="Email"
            onChange={e => setEmail(e.target.value)}
            error={!!formErrors.email}
            helperText={formErrors.email}
            value={email}
        />
        <TextField
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            error={!!formErrors.password}
            helperText={formErrors.password}
            value={password}
        />
        <TextField
            label="Repeat password"
            type="password"
            onChange={e => setPasswordRepeat(e.target.value)}
            error={!!formErrors.passwordRepeat}
            helperText={formErrors.passwordRepeat}
            value={passwordRepeat}
        />
        <FormControlLabel
            label="Is admin"
            control={<Checkbox onChange={event => setIsAdmin(event.target.checked)} />}
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
