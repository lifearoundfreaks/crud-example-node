import { Card, Grid, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import style from './styles.module.css'

const AddProfile = ({ setModalData }) => {

    return <Grid item xs={6} md={3}><Card className={style.card}>
        <IconButton
            color="primary"
            aria-label="add to shopping cart"
            className={style.addButton}
            onClick={() => setModalData(undefined)}
        >
            <AddIcon fontSize="large" />
        </IconButton>
        
    </Card></Grid>
}

export default AddProfile
