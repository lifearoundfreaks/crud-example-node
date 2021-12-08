import {
    Backdrop,
    Modal,
    Fade,
    Button,
    Stack,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material"
import { useState } from "react"
import { useClientAPI } from "../../hooks"
import style from './styles.module.css'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const ProfileModal = ({
    open,
    setOpen,
    fetchProfiles,
    initial,
    userId,
}) => {

    const [name, setName] = useState(null)
    const [gender, setGender] = useState(null)
    const [birthdate, setBirthdate] = useState(null)
    const [city, setCity] = useState(null)

    const [formErrors, setFormErrors] = useState({})

    const { createProfile, updateProfile } = useClientAPI()

    const initialValidation = () => {
        const formErrors = {}
        if (!name && !initial?.name) formErrors.name = "This field is required."
        if (!city && !initial?.city) formErrors.city = "This field is required."
        setFormErrors(formErrors)
        return !Object.keys(formErrors).length
    }

    const handleGenderChoice = (event) => {
        event.preventDefault()
        setGender(event.target.value)
    }

    const handleClose = () => {
        setOpen(false)
        setName(null)
        setGender(null)
        setBirthdate(null)
        setCity(null)
    }

    const handleClick = () => {

        if (initialValidation()) {
            const promise = initial ?
                updateProfile(
                    initial.id,
                    name || initial.name,
                    gender || initial.gender,
                    birthdate || initial.birthdate,
                    city || initial.city,
                ) :
                createProfile(
                    name,
                    gender || "male",
                    birthdate || Date.now(),
                    city,
                    userId,
                )
            promise.then(
                () => {
                    handleClose()
                    fetchProfiles()
                }
            )
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
                className={style.addModal}
            >
                <Fade in={open}>
                    <Stack
                        component="form"
                        spacing={2}
                        className={style.addModalContents}
                    >
                        <TextField
                            label="Name"
                            onChange={e => setName(e.target.value)}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                            value={name || initial?.name || ""}
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                onChange={handleGenderChoice}
                                value={gender || initial?.gender || "male"}
                                row
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Birth date"
                                value={birthdate || initial?.birthdate || Date.now()}
                                onChange={setBirthdate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            label="City"
                            onChange={e => setCity(e.target.value)}
                            error={!!formErrors.city}
                            helperText={formErrors.city}
                            value={city || initial?.city || ""}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleClick}
                        >{initial ? "Update" : "Create"} profile</Button>
                    </Stack>
                </Fade>
            </Modal>
        </div>
    )
}

export default ProfileModal
