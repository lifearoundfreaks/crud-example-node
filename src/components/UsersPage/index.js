import {
    CircularProgress,
    Grid,
    Typography,
    Card,
    CardContent,
    Stack,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useClientAPI } from '../../hooks'
import { Link } from "react-router-dom"
import style from './styles.module.css'

const UsersPage = () => {

    const [loading, setLoading] = useState(true)
    const [usersData, setUsersData] = useState([])
    const { getUsers } = useClientAPI()

    useEffect(() => getUsers().then(data => {
        setUsersData(data)
        setLoading(false)
    }), [])

    return loading ? <div className={style.loadingBox}><CircularProgress className={style.progress} /></div> : <>
        <h1>Users</h1>
        <Grid container spacing={2}>
            {usersData.map(user => <Grid item xs={6} md={3}><Card className={style.card}>
                <CardContent
                    component={Link}
                    to={`/user/${user.id}`}
                >
                    <Stack spacing={2}>
                        <Typography variant="h5" className={style.cardSimpleText}>
                            {user.name}
                        </Typography>
                        <Typography className={style.cardSimpleText}>
                            {user.email}
                        </Typography>
                        <Typography className={style.cardSimpleText}>
                            {user.profilesCount} profiles
                        </Typography>
                    </Stack>
                </CardContent>
            </Card></Grid>)}
        </Grid>
    </>
}

export default UsersPage
