import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
} from "@mui/material"
import { useField, useFormikContext } from "formik"

const FormCheckbox = ({
    name,
    label,
    ...props
}) => {

    const [field] = useField(name)
    const { setFieldValue } = useFormikContext()

    return <FormControl><FormGroup>
        <FormControlLabel label={label} control={<Checkbox {...field} onChange={
            event => setFieldValue(name, event.target.checked)
        } />} {...props} />
    </FormGroup></FormControl>
}

export default FormCheckbox
