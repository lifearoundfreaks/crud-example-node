import { Button, Stack, TextField, CircularProgress } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const RegisterForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

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

    const registerUser = () => {

        if (initialValidation()) {
            setLoading(true)
            fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    logIn: true,
                }),
                headers: { 'Content-Type': 'application/json' },
            }).then(response => {
                return response.json()
            }).then(data => {
                setLoading(false)
                if (getServerError(data) === 'name must be unique')
                    setFormErrors({ name: "Username already taken." })
                else if (getServerError(data) === 'email must be unique')
                    setFormErrors({ email: "Email already in use." })
                else
                    navigate("/")
            })
        }
    }

    return loading ? <CircularProgress /> : <Stack
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
        <Stack spacing={2} direction="row" style={{ marginTop: "2em" }}>
            <Button variant="contained" size="large" onClick={registerUser}>Register</Button>
            <Link to="/login" style={{ textDecoration: "none" }}><Button
                variant="outlined"
                size="large"
            >Log in</Button></Link>
        </Stack>
    </Stack>
}

export default RegisterForm
