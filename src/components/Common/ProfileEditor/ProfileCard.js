import {
    Grid,
    Stack,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import style from './styles.module.css'
import { useClientAPI } from "../../../hooks"

const ProfileCard = ({ profile, fetchProfiles, setModalData }) => {

    const { deleteProfile } = useClientAPI()

    const handleDelete = () => {
        deleteProfile(profile.id).then(() => fetchProfiles())
    }

    return <Grid item xs={6} md={3}><Card className={style.card}>
        <CardContent><Stack spacing={2}>
            <Typography variant="h5" className={style.cardSimpleText}>
                {profile.name}
            </Typography>
            <Typography variant="h5" className={style.cardSimpleText}>
                {profile.gender}
            </Typography>
            <Typography variant="h5" className={style.cardSimpleText}>
                {new Date(profile.birthdate).toLocaleDateString()}
            </Typography>
            <Typography variant="h5" className={style.cardSimpleText}>
                {profile.city}
            </Typography>
        </Stack></CardContent>
        <CardActions>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        className={style.cardAction}
                        onClick={() => setModalData(profile)}
                    >Edit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        className={style.cardAction}
                        onClick={handleDelete}
                    >Delete</Button>
                </Grid>
            </Grid>
        </CardActions>
    </Card></Grid>
}

export default ProfileCard
