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
} from "../LoggedUser/slice"
import { useClientAPI } from "../../hooks"

const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formErrors, setFormErrors] = useState({})
    const { logIn } = useClientAPI()

    const user = useSelector(selectLoggedUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValidation = () => {
        const formErrors = {}
        if (!email) formErrors.email = "This field is required."
        if (!password) formErrors.password = "This field is required."
        setFormErrors(formErrors)
        return !Object.keys(formErrors).length
    }

    const handleClick = () => {
        if (initialValidation()) {
            dispatch(setLoading())
            logIn(email, password).then(data => {
                if (data.name) {
                    dispatch(setUser(data))
                    navigate("/")
                }
                else {
                    dispatch(clearUser())
                    setFormErrors(data.error === "No such user." ? {
                        email: data.error
                    } : { password: data.error })
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
        <FormControl><Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={handleClick}>Sign in</Button>
            <Button
                variant="outlined"
                size="large"
                to="/register"
                component={Link}
            >Sign Up</Button>
        </Stack></FormControl>
    </Stack>
}

export default LoginForm
