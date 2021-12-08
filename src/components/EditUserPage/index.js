import { useParams } from 'react-router'
import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { ProfileEditor } from ".."
import { useClientAPI } from '../../hooks'
import EditUserPanel from './EditUserPanel'
import EditUserModal from './EditUserModal'
import style from './styles.module.css'

const EditUserPage = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [profilesData, setProfilesData] = useState([])
    const { getUserWithProfiles } = useClientAPI()

    const fetchProfiles = () => {
        setLoading(true)
        getUserWithProfiles(id).then(data => {
            setUserData(data)
            setProfilesData(data?.Profiles)
            setLoading(false)
        })
    }
    useEffect(() => fetchProfiles(), [])

    return loading ? <div className={style.loadingBox}>
        <CircularProgress className={style.progress} />
    </div> : userData === null ? <h1>No such user</h1> : <>
        <EditUserPanel
            userData={userData}
            setLoading={setLoading}
            openEditModal={() => setModalOpen(true)}
        />
        <ProfileEditor
            fetchProfiles={fetchProfiles}
            profilesData={profilesData}
            userId={userData.id}
        />
        <EditUserModal
            userData={userData}
            open={modalOpen}
            setOpen={setModalOpen}
            setLoading={setLoading}
        />
    </>
}

export default EditUserPage
