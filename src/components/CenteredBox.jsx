import { Paper } from "@mui/material"

const CenteredBox = ({children}) => {
    return (
        <div className="App" style={{ height: "100%" }}>
            <div style={{
                display: "table",
                margin: "0 auto",
                height: "100%",
            }}><div style={{
                display: "table-cell",
                verticalAlign: "middle",
            }}>
                    <Paper style={{
                        padding: "2em",
                    }}>
                        {children}
                    </Paper>
                </div></div>
        </div>
    )
}

export default CenteredBox
