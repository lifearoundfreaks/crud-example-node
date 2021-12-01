import { Button, CircularProgress, Stack } from "@mui/material"
import { CenteredBox, RegisterForm, LoginForm, UserTable } from "./components"
import './App.css'
import {
    HashRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom"
import { useEffect, useState } from "react"

const LoggedInTemporaryBox = () => {

    const [username, setUsername] = useState(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/session').then(response => {
            return response.json()
        }).then(data => {
            setUsername(data.username)
            setLoading(false)
        })
    }, [])
    
    const logOut = () => {
        setLoading(true)
        fetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({
                logOut: true
            }),
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            setUsername(undefined)
            setLoading(false)
        })
    }

    return loading ? <CircularProgress /> : <>
        <p style={{ margin: "0 0 2em", textAlign: "center" }}>{
            username === undefined ?
                "Currently not logged in." :
                `Currently logged in as ${username}.`
        }</p>
        {username ? <Button
            variant="contained"
            size="large"
            onClick={logOut}
            style={{ width: "100%" }}
        >Log out</Button>
            : <Stack spacing={2} direction="row">
                <Link to="/register" style={{ textDecoration: "none" }}><Button
                    variant="contained"
                    size="large"
                >Register</Button></Link>
                <Link to="/login" style={{ textDecoration: "none" }}><Button
                    variant="outlined"
                    size="large"
                >Log in</Button></Link>
            </Stack>}
    </>
}

const App = () => {
    return (
        <div className="App" style={{ height: "100%" }}>
            <Router>
                <Routes>
                    <Route path="/register" element={
                        <CenteredBox><RegisterForm /></CenteredBox>
                    } />
                    <Route path="/login" element={
                        <CenteredBox><LoginForm /></CenteredBox>
                    } />
                    <Route path="/userpanel" element={
                        <UserTable />
                    } />
                    <Route path="/" element={
                        <CenteredBox><LoggedInTemporaryBox /></CenteredBox>
                    } />
                </Routes>
            </Router>
        </div>
    )
}

export default App
