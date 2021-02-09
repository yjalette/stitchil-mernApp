import React from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import { getNames } from 'country-list';
import { Form } from 'react-bootstrap';
import { skills, experience, category, styles, fabrics } from '../../constants/options';
import languages from '../../constants/languages'

const options = { skills, styles, experience, country: getNames(), category, fabrics, keywords: [], languages };

const FormMultipleInput = ({ label, selected, onChange, multiple, error, allowNew, required }) => (
    <Form.Group className="field-wrapper multipleInput" >
        {label && <Form.Label className="formLabel">{label}{required && "*"}</Form.Label>}
        < Typeahead
            id={label}
            labelKey={label}
            onChange={(value) => onChange(label, !allowNew ? value : value.map(elem => elem[label] || elem))}
            options={options[label] || []}
            selected={selected && selected.length > 0 ? selected : []}
            allowNew={allowNew}
            newSelectionPrefix={allowNew && "+ "}
            multiple={multiple}
            inputProps={{ required }}
        />
        {error && <span className="error">{error}</span>}
    </Form.Group>
)

export default FormMultipleInput

