import { Button } from "@mui/material"
import { useFormikContext } from "formik"

const SubmitButton = ({
    name,
    ...props
}) => {

    const { submitForm } = useFormikContext()

    return <Button {...props} onClick={submitForm} />
}

export default SubmitButton
