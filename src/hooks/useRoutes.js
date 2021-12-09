import {
    RegisterForm,
    LoginForm,
    ProfilesPage,
    DashboardPage,
    UsersPage,
    EditUserPage,
} from "../components"

export const useRoutes = () => {

    const routePaths = {
        register: '/register',
        login: '/login',
        dashboard: '/dashboard',
        users: '/users',
        editUser: '/user/:id',
        home: '/',
    }

    return {
        routePaths, routes: {
            accountRoutes: [
                {
                    path: routePaths.register,
                    Component: RegisterForm,
                },
                {
                    path: routePaths.login,
                    Component: LoginForm,
                },
            ],
            adminRoutes: [
                {
                    path: routePaths.dashboard,
                    Component: DashboardPage,
                },
                {
                    path: routePaths.users,
                    Component: UsersPage,
                },
                {
                    path: routePaths.editUser,
                    Component: EditUserPage,
                },
            ],
            userRoutes: [
                {
                    path: routePaths.home,
                    Component: ProfilesPage,
                },
            ],
        }
    }
}
