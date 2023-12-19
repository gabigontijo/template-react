import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

import TextField from '@mui/material/TextField';

export default function NumberFormatField({ name, label, value, handleChange }) {
    return (
        <NumericFormat
            label={label}
            customInput={TextField}
            thousandSeparator="."
            fixedDecimalScale
            decimalSeparator=","
            prefix='R$ '
            allowNegative={false}
            decimalScale={2}
            value={value}
            onValueChange={(values) => handleChange({ target: { name, value: values.floatValue } })}
        />
    )
}

NumberFormatField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    handleChange: PropTypes.func,
};
