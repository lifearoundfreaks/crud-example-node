import {
    CenteredBox,
    RegisterForm,
    LoginForm,
    ProfilesPage,
    DashboardPage,
    UsersPage,
    UserInterface,
    EditUserPage,
} from "../"
import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectLoggedUser } from "../LoggedUser/slice"

const SiteRoutes = () => {

    const user = useSelector(selectLoggedUser)

    return <Router><Routes>
        <Route path="/register" element={
            <CenteredBox><RegisterForm /></CenteredBox>
        } />
        <Route path="/login" element={
            <CenteredBox><LoginForm /></CenteredBox>
        } />
        {user.isAdmin ? <>
            <Route path="/dashboard" element={
                <UserInterface><DashboardPage /></UserInterface>
            } />
            <Route path="/users" element={
                <UserInterface><UsersPage /></UserInterface>
            } />
            <Route path="/user/:id" element={
                <UserInterface><EditUserPage /></UserInterface>
            } />
        </> : null}
        <Route path="/" element={
            <UserInterface><ProfilesPage /></UserInterface>
        } />
    </Routes></Router>
}

export default SiteRoutes
