import { useState,useEffect } from "react"
import { useClientAPI } from "../../hooks"
import {
    CircularProgress,
    Grid,
    CardContent,
    Stack,
    Typography,
    Card,
} from "@mui/material"
import style from './styles.module.css'

const DashboardPage = () => {
    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState([])
    const { getDashboard } = useClientAPI()

    useEffect(() => {
        getDashboard().then(data => {
            setDashboardData(data)
            setLoading(false)
        })
    }, [getDashboard])

    return loading ? <div className={style.loadingBox}><CircularProgress className={style.progress} /></div> : <>
        <h1>Dashboard</h1>
        <Grid container spacing={2}>
            <Grid item xs={4}><Card className={style.card}>
                <CardContent><Stack spacing={2}>
                    <Typography variant="h5" className={style.cardSimpleText}>
                        Users
                    </Typography>
                    <Typography variant="h4" className={style.cardSimpleText}>
                        {dashboardData.userCount}
                    </Typography>
                </Stack></CardContent>
            </Card></Grid>
            <Grid item xs={4}><Card className={style.card}>
                <CardContent><Stack spacing={2}>
                    <Typography variant="h5" className={style.cardSimpleText}>
                        Profiles
                    </Typography>
                    <Typography variant="h4" className={style.cardSimpleText}>
                        {dashboardData.profileCount}
                    </Typography>
                </Stack></CardContent>
            </Card></Grid>
            <Grid item xs={4}><Card className={style.card}>
                <CardContent><Stack spacing={2}>
                    <Typography variant="h5" className={style.cardSimpleText}>
                        Profiles over 18
                    </Typography>
                    <Typography variant="h4" className={style.cardSimpleText}>
                        {dashboardData.adultrofileCount}
                    </Typography>
                </Stack></CardContent>
            </Card></Grid>
        </Grid>
    </>
}

export default DashboardPage
