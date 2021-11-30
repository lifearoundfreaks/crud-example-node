import { useState, useEffect } from "react"
import { DataGrid, GridOverlay } from '@mui/x-data-grid'
import {
    Button,
    TextField,
    Stack,
    Snackbar,
    LinearProgress,
} from "@mui/material"


const CustomLoadingOverlay = () => {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    )
}

const UserTable = () => {

    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [serverError, setServerError] = useState("")

    const fetchUsers = () => {
        setLoading(true)
        fetch('/api/users').then((response) => {
            return response.json()
        }).then(data => {
            setTimeout(() => {
                setRows(data)
                setLoading(false)
            })
        })
    }

    useEffect(() => fetchUsers(), [])

    const addUser = () => {
        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                name: newName,
                email: newEmail,
                password: newPassword,
            }),
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data.errors?.length) setServerError(data.errors[0].message)
            else fetchUsers()
        })
    }

    const removeUsers = () => {
        fetch('/api/users', {
            method: 'DELETE',
            body: JSON.stringify({ ids: selectedIds }),
            headers: { 'Content-Type': 'application/json'},
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data.errors?.length) setServerError(data.errors[0].message)
            else fetchUsers()
        })
    }

    return <>
        <Snackbar
            open={!!serverError}
            autoHideDuration={6000}
            onClose={() => setServerError("")}
            message={serverError}
        />
        <Stack direction="row" spacing={2} style={{ margin: 10 }}>
            <TextField label="Name" onChange={e => setNewName(e.target.value)} />
            <TextField label="Email" onChange={e => setNewEmail(e.target.value)} />
            <TextField label="Password" onChange={e => setNewPassword(e.target.value)} />
            <Button
                onClick={addUser}
                disabled={!newName || !newEmail || !newPassword}
            >Add user</Button>
            <Button
                onClick={removeUsers}
                disabled={!selectedIds.length}
                color="error"
            >Remove selected</Button>
        </Stack>

        <DataGrid
            loading={loading}
            columns={[
                { field: 'id', headerName: 'ID' },
                { field: 'name', headerName: 'Name', width: 300 },
                { field: 'email', headerName: 'Email', width: 300 },
                { field: 'password', headerName: 'Password', width: 300 },
            ]}
            rows={rows}
            autoHeight
            checkboxSelection
            onSelectionModelChange={itm => setSelectedIds(itm)}
            components={{
                LoadingOverlay: CustomLoadingOverlay,
            }}
        />
    </>
}

export default UserTable
