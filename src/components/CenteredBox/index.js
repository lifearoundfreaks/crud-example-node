import { Paper } from "@mui/material"
import styles from './styles.module.css'

const CenteredBox = ({ children }) => {
    return (
        <div className={styles.parentWrapper}><div className={styles.middleBox}>
            <Paper className={styles.contents}>
                {children}
            </Paper>
        </div></div>
    )
}

export default CenteredBox
