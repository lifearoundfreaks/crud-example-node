import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { ProfileEditor } from "../.."
import { useClientAPI } from '../../../hooks'
import style from './styles.module.css'

const ProfilesPage = () => {

    const [loading, setLoading] = useState(true)
    const [profilesData, setProfilesData] = useState([])
    const { getProfiles } = useClientAPI()

    const fetchProfiles = () => {
        setLoading(true)
        getProfiles().then(data => {
            setProfilesData(data)
            setLoading(false)
        })
    }
    // eslint-disable-next-line
    useEffect(() => fetchProfiles(), [])

    return loading ? <div className={style.loadingBox}>
        <CircularProgress className={style.progress} />
    </div> : <ProfileEditor
        fetchProfiles={fetchProfiles}
        profilesData={profilesData}
    />
}

export default ProfilesPage
