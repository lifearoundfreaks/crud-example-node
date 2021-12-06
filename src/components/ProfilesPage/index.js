import { CircularProgress, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { ProfileCard } from ".."
import { useClientAPI } from '../../hooks'
import AddProfile from './AddProfile'
import style from './styles.module.css'
import ProfileModal from './ProfileModal'

const ProfilesPage = () => {

    const [loading, setLoading] = useState(true)
    const [profilesData, setProfilesData] = useState([])
    const [initial, setInitial] = useState(undefined)
    const [modalOpen, setModalOpen] = useState(false)
    const { getProfiles } = useClientAPI()

    const fetchProfiles = () => {
        setLoading(true)
        getProfiles().then(data => {
            setProfilesData(data)
            setLoading(false)
        })
    }
    useEffect(() => fetchProfiles(), [])

    const setModalData = initialData => {
        setInitial(initialData)
        setModalOpen(true)
    }

    return loading ? <div className={style.loadingBox}><CircularProgress size="medium" /></div> : <>
        <h1>Profiles</h1>
        <Grid container spacing={2}>
            {profilesData.map(profile => <ProfileCard
                key={profile.id}
                profile={profile}
                fetchProfiles={fetchProfiles}
                setModalData={setModalData}
            />)}
            <AddProfile setModalData={setModalData} />
            <ProfileModal
                open={modalOpen}
                setOpen={setModalOpen}
                fetchProfiles={fetchProfiles}
                initial={initial}
            />
        </Grid>
    </>
}

export default ProfilesPage
