import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

import TextField from '@mui/material/TextField';

export default function PercentFormatField({ label, name, value, handleChange }) {
    return (
        <NumericFormat
            fullWidth
            label={label}
            customInput={TextField}
            suffix="%"
            allowNegative={false}
            decimalScale={2}
            value={value}
            onValueChange={(values) => handleChange({ target: { name, value: values.floatValue } })}
        />
    )
}

PercentFormatField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    handleChange: PropTypes.func,
};
