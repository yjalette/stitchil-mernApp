import React from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import { getNames } from 'country-list';
import { Form } from 'react-bootstrap';

import { skills, experience, category, style, fabric } from '../../constants/options';


const options = { skills, style, experience, country: getNames(), category, style, fabric, keywords: [] };

const FormMultipleInput = ({ label, selected, onChange, multiple, error, allowNew }) => {
    console.log(label, selected)
    return (
        <Form.Group className="field-wrapper multipleInput" >
            {label && <Form.Label className="formLabel">{label}</Form.Label>}
            < Typeahead
                id={label}
                labelKey={label || ""}
                onChange={onChange}
                options={options[label] || []}
                selected={selected || []}
                allowNew={allowNew ? true : false}
                newSelectionPrefix={allowNew && "add: "}
                multiple={multiple ? true : false}
            />
            {error && <span className="error">{error}</span>}
        </Form.Group>
    )
}

export default FormMultipleInput

