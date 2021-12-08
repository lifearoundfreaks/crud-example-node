import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Button,
    Stack,
    CircularProgress,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { LogOutButton, CenteredBox, UserCredentials } from '../'
import style from './styles.module.css'
import { useSelector } from 'react-redux'
import { selectLoggedUser } from "../LoggedUser/slice"
import NotLoggedInBox from '../NotLoggedInBox'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import BarChartIcon from '@mui/icons-material/BarChart'
import GroupIcon from '@mui/icons-material/Group'

const UserInterface = ({ children }) => {

    const user = useSelector(selectLoggedUser)

    return user.loading ? <CenteredBox><CircularProgress /></CenteredBox> :
        user.loggedIn ? <><AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <UserCredentials />

                    <Box className={style.placeholderBox} />
                    {user.isAdmin ? <Stack direction="row" className={style.menuItems}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                            startIcon={<PersonPinCircleIcon />}
                        >Profiles</Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/dashboard"
                            startIcon={<BarChartIcon />}
                        >Dashboard</Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/users"
                            startIcon={<GroupIcon />}
                        >Users</Button>
                    </Stack> : null}
                    <LogOutButton />
                </Toolbar>
            </Container>
        </AppBar ><Container>{children}</Container></> : <CenteredBox><NotLoggedInBox /></CenteredBox>
}

export default UserInterface
