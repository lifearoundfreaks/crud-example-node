import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Button,
    Stack,
    CircularProgress,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { LogOutButton, CenteredBox } from '../'
import style from './styles.module.css'
import { useSelector } from 'react-redux'
import { selectLoggedUser } from "../LoggedUser/slice"
import NotLoggedInBox from '../NotLoggedInBox'

const UserInterface = ({ children }) => {

    const pages = [['Profiles', '/'], ['Dashboard', '/dashboard'], ['Users', '/users']]
    const user = useSelector(selectLoggedUser)

    return user.loading ? <CenteredBox><CircularProgress /></CenteredBox> :
        user.loggedIn ? <><AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >{user.username}</Typography>

                    <Box className={style.placeholderBox} />
                    <Stack direction="row" className={style.menuItems}>
                        {pages.map(([page, url], index) => (
                            <Button
                                key={index}
                                color="inherit"
                                component={Link}
                                to={url}
                            >{page}</Button>
                        ))}
                    </Stack>
                    <LogOutButton />
                </Toolbar>
            </Container>
        </AppBar ><Container>{children}</Container></> : <CenteredBox><NotLoggedInBox /></CenteredBox>
}

export default UserInterface
