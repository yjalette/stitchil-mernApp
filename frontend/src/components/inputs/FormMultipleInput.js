import React from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import { Form } from 'react-bootstrap';
import options from '../../constants/options';


const FormMultipleInput = ({ label, selected, onChange, multiple, error, allowNew, required }) => (
    <Form.Group className="field-wrapper multipleInput" >
        {label && <Form.Label className="formLabel">{label}{required && "*"}</Form.Label>}
        < Typeahead
            id={label}
            labelKey={label}
            onChange={(value) => console.log(value) || onChange(label, !allowNew ? value : value.map(elem => elem[label] || elem))}
            options={options[label] || []}
            selected={selected && selected.length > 0 ? selected : []}
            // defaultInputValue={selected && selected.length > 0 ? selected.join(" ") : ""}
            allowNew={allowNew}
            newSelectionPrefix={allowNew && "+ "}
            multiple={multiple}
        // inputProps={{
        //     required
        // }}
        />
        {error && <span className="error">{error}</span>}
    </Form.Group>
)

export default FormMultipleInput

