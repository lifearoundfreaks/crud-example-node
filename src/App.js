import {
    CenteredBox,
    RegisterForm,
    LoginForm,
    ProfilesPage,
    DashboardPage,
    UsersPage,
    LoggedUser,
    UserInterface,
} from "./components"
import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import './App.css'

const App = () => {
    return (
        <div className="App">
            <LoggedUser />
            <Router>
                <Routes>
                    <Route path="/register" element={
                        <CenteredBox><RegisterForm /></CenteredBox>
                    } />
                    <Route path="/login" element={
                        <CenteredBox><LoginForm /></CenteredBox>
                    } />
                    <Route path="/dashboard" element={
                        <UserInterface><DashboardPage /></UserInterface>
                    } />
                    <Route path="/users" element={
                        <UserInterface><UsersPage /></UserInterface>
                    } />
                    <Route path="/" element={
                        <UserInterface><ProfilesPage /></UserInterface>
                    } />
                </Routes>
            </Router>
        </div>
    )
}

export default App
