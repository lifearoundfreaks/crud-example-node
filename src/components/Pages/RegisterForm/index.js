import {
    Button,
    Stack,
    CircularProgress,
    FormControl,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {
    setLoading,
    setUser,
    clearUser,
    selectLoggedUser,
} from "../../CoreFunctionality/LoggedUser/slice"
import { useClientAPI } from "../../../hooks"
import { useRoutes } from "../../../hooks/useRoutes"
import {
    object as yupObject,
    ref as yupRef,
    string,
    boolean,
} from 'yup'
import {
    ValidatedTextField as TextField,
    SubmitButton,
    FormCheckbox,
} from "../.."
import { Formik } from "formik"

const INITIAL_VALUES = {
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    isAdmin: false,
}

const FORM_VALIDATION = yupObject().shape({
    name: string().required("This field is required."),
    email: string().email("Invalid email address.").required("This field is required."),
    password: string().required("This field is required."),
    passwordRepeat: string().required("This field is required.").oneOf(
        [yupRef('password'), null], "Passwords do not match."
    ),
    isAdmin: boolean(),
})

const RegisterForm = () => {

    const { routePaths } = useRoutes()

    const { registerUser } = useClientAPI()
    const user = useSelector(selectLoggedUser)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getServerErrors = response => ({
        'name must be unique': { name: "Username already taken." },
        'email must be unique': { email: "Email already in use." },
    }[response.errors?.length && response.errors[0].message])

    const handleSubmit = ({ name, email, password, isAdmin }, { setErrors }) => {
        dispatch(setLoading())
        registerUser(name, email, password, isAdmin, true).then(data => {
            const serverErrors = getServerErrors(data)
            if (serverErrors) {
                setErrors(serverErrors)
                dispatch(clearUser())
            } else {
                dispatch(setUser(data))
                navigate(routePaths.home)
            }
        })
    }

    return <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
    >{user.loading ? <CircularProgress /> :
        <Stack
            component="form"
            spacing={2}
        >
            <TextField label="Name" name="name" />
            <TextField label="Email" name="email" />
            <TextField label="Password" name="password" type="password" />
            <TextField label="Repeat password" name="passwordRepeat" type="password" />
            <FormCheckbox name="isAdmin" label="Is admin" />
            <FormControl><Stack spacing={2} direction="row">
                <SubmitButton variant="contained" size="large">Sign Up</SubmitButton>
                <Button
                    variant="outlined"
                    size="large"
                    to={routePaths.login}
                    component={Link}
                >Sign in</Button>
            </Stack></FormControl>
        </Stack>}
    </Formik>
}

export default RegisterForm
