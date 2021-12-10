import { TextField } from "@mui/material"
import { useField } from "formik"

const ValidatedTextField = ({
    name,
    ...props
}) => {

    const [field, meta] = useField(name)

    const errorMessage = meta && meta.touched && meta.error
    const combinedProps = {
        ...field, ...props, ...(
            errorMessage ? { error: !!errorMessage, helperText: errorMessage } : {}
        )
    }

    return <TextField {...combinedProps} />
}

export default ValidatedTextField
