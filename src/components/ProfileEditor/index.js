import { Grid } from "@mui/material"
import { useState } from "react"
import { ProfileCard } from ".."
import AddProfile from './AddProfile'
import ProfileModal from './ProfileModal'

const ProfilesPage = ({ fetchProfiles, profilesData, userId }) => {

    const [initial, setInitial] = useState(undefined)
    const [modalOpen, setModalOpen] = useState(false)

    const setModalData = initialData => {
        setInitial(initialData)
        setModalOpen(true)
    }

    return <>
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
                userId={userId}
            />
        </Grid>
    </>
}

export default ProfilesPage
