import { CenteredBox, UserInterface } from "../.."
import {
    HashRouter as Router,
    Routes as RouterRoutes,
    Route,
} from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectLoggedUser } from "../LoggedUser/slice"
import { useRoutes } from "../../../hooks/useRoutes"

const Routes = () => {

    const user = useSelector(selectLoggedUser)
    const { routes } = useRoutes()

    return <Router><RouterRoutes>
        {routes.accountRoutes.map(({ path, Component }, index) => {
            return <Route path={path} key={index} element={
                <CenteredBox><Component /></CenteredBox>
            } />
        })}
        {user.isAdmin ? routes.adminRoutes.map(({ path, Component }, index) => {
            return <Route path={path} key={index} element={
                <UserInterface><Component /></UserInterface>
            } />
        }) : null}
        {routes.userRoutes.map(({ path, Component }, index) => {
            return <Route path={path} key={index} element={
                <UserInterface><Component /></UserInterface>
            } />
        })}
    </RouterRoutes></Router>
}

export default Routes
