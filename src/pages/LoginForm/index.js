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
} from "../../components/coreFunctionality/LoggedUser/slice"
import { useClientAPI } from "../../hooks"
import { useRoutes } from "../../hooks/useRoutes"
import {
    object as yupObject,
    string,
} from 'yup'
import {
    ValidatedTextField as TextField,
    SubmitButton,
} from "../../components"
import { Formik } from "formik"

const INITIAL_VALUES = {
    email: "",
    password: "",
}

const FORM_VALIDATION = yupObject().shape({
    email: string().email("Invalid email address.").required("This field is required."),
    password: string().required("This field is required."),
})

const LoginForm = () => {

    const { logIn } = useClientAPI()

    const user = useSelector(selectLoggedUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { routePaths } = useRoutes()

    const getServerErrors = error => error === "No such user." ?
        { email: error } : { password: error }

    const handleSubmit = ({ email, password }, { setErrors }) => {
        dispatch(setLoading())
        logIn(email, password).then(data => {
            if (data.name) {
                dispatch(setUser(data))
                navigate(routePaths.home)
            }
            else {
                dispatch(clearUser())
                setErrors(getServerErrors(data.error))
            }
        })
    }

    return <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
    >{user.loading ? <CircularProgress /> :
        <Stack component="form" spacing={2}>
            <TextField label="Email" name="email" />
            <TextField label="Password" name="password" type="password" />
            <FormControl><Stack spacing={2} direction="row">
                <SubmitButton variant="contained" size="large">Sign in</SubmitButton>
                <Button
                    variant="outlined"
                    size="large"
                    to={routePaths.register}
                    component={Link}
                >Sign Up</Button>
            </Stack></FormControl>
        </Stack>}
    </Formik>
}

export default LoginForm
