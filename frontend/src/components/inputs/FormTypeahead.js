import React from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import options from '../../constants/options';

const FormTypeahead = ({ name, value, onChange, multiple, allowNew, required }) => {
    const handleChange = (newValue) => {
        const result = !allowNew ? newValue : newValue.map(elem => elem[name])
        onChange(name, result)
    }

    return (
        < Typeahead
            id={name}
            labelKey={name}
            onChange={handleChange}
            options={options[name] || []}
            selected={value || []}
            allowNew={allowNew}
            newSelectionPrefix={allowNew && "+ "}
            multiple={multiple}
            inputProps={{
                required
            }}
        />
    )
}

export default FormTypeahead

