import React from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import { getNames } from 'country-list';
import { Form } from 'react-bootstrap';
import { skills, experience, category, styles, fabrics } from '../../constants/options';
import languages from '../../constants/languages'

const options = { skills, styles, experience, country: getNames(), category, fabrics, keywords: [], languages };

const FormMultipleInput = ({ label, selected, onChange, multiple, error, allowNew }) => (
    <Form.Group className="field-wrapper multipleInput" >
        {label && <Form.Label className="formLabel">{label}</Form.Label>}
        < Typeahead
            id={label}
            labelKey={label}
            onChange={(value) => console.log(value) || onChange(label, !allowNew ? value : value.map(elem => elem[label] || elem))}
            options={options[label] || []}
            selected={selected && selected.length > 0 ? selected : []}
            allowNew={allowNew ? true : false}
            newSelectionPrefix={allowNew && "+ "}
            multiple={multiple ? true : false}
        />
        {error && <span className="error">{error}</span>}
    </Form.Group>
)

export default FormMultipleInput

