import React from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import { getNames } from 'country-list';
import { Form } from 'react-bootstrap';

import { skills, experience, category, styles, fabrics } from '../../constants/options';
import languages from '../../constants/languages'

const options = { skills, styles, experience, country: getNames(), category, styles, fabrics, keywords: [], languages };

const FormMultipleInput = ({ label, selected, onChange, multiple, error, allowNew }) => {
    return (
        <Form.Group className="field-wrapper multipleInput" >
            {label && <Form.Label className="formLabel">{label}</Form.Label>}
            < Typeahead
                id={label}
                labelKey={label}
                onChange={onChange}
                options={options[label] || []}
                selected={selected && selected.length > 0 ? selected : []}
                allowNew={allowNew ? true : false}
                newSelectionPrefix={allowNew && "add: "}
                multiple={multiple ? true : false}
            />
            {error && <span className="error">{error}</span>}
        </Form.Group>
    )
}

export default FormMultipleInput

