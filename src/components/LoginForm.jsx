import { Button, Stack, TextField, CircularProgress } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const RegisterForm = () => {
    const [nameOrEmail, setNameOrEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const initialValidation = () => {
        const formErrors = {}
        if (!nameOrEmail) formErrors.nameOrEmail = "This field is required."
        if (!password) formErrors.password = "This field is required."
        setFormErrors(formErrors)
        return !Object.keys(formErrors).length
    }

    const logIn = () => {
        if (initialValidation()) {
            setLoading(true)
            fetch('/api/session', {
                method: 'POST',
                body: JSON.stringify({
                    nameOrEmail: nameOrEmail,
                    password: password,
                }),
                headers: { 'Content-Type': 'application/json' },
            }).then(response => {
                return response.json()
            }).then(data => {
                setLoading(false)
                if (data.success)
                    navigate("/")
                else setFormErrors(data.error === "No such user." ? {
                    nameOrEmail: data.error
                } : { password: data.error })
            })
        }
    }

    return loading ? <CircularProgress /> : <Stack
        component="form"
        spacing={2}
    >
        <TextField
            label="Email or username"
            onChange={e => setNameOrEmail(e.target.value)}
            error={!!formErrors.nameOrEmail}
            helperText={formErrors.nameOrEmail}
            value={nameOrEmail}
        />
        <TextField
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            error={!!formErrors.password}
            helperText={formErrors.password}
            value={password}
        />
        <Stack spacing={2} direction="row" style={{ marginTop: "2em" }}>
            <Button variant="contained" size="large" onClick={logIn}>Log in</Button>
            <Link to="/register" style={{ textDecoration: "none" }}><Button
                variant="outlined"
                size="large"
            >Register</Button></Link>
        </Stack>
    </Stack>
}

export default RegisterForm
