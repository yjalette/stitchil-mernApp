import React from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import options from '../../constants/options';

const FormTypeahead = ({ name, value, onChange, multiple, allowNew }) => console.log(name) || (
    < Typeahead
        id={name}
        labelKey={name}
        onChange={(value) => onChange(name, !allowNew ? value : value.map(elem => elem[name] || elem))}
        options={options[name] || []}
        selected={value && value.length > 0 ? value : []}
        // defaultInputValue={selected && selected.length > 0 ? selected.join(" ") : ""}
        allowNew={allowNew}
        newSelectionPrefix={allowNew && "+ "}
        multiple={multiple}
    />
)

export default FormTypeahead

