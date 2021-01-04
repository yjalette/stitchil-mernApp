import React from 'react';
import { Form } from 'react-bootstrap';

const RangeInput = ({ min, max, onChange }) => {
    return (
        <div className="range">
            <Form className="range__form flex-center">
                <Form.Group className="field-wrapper m-0">
                    <Form.Label className="">min</Form.Label>
                    <Form.Control className="user-input mr-2" type="number" name="minPrice" value={min} onChange={onChange} custom />
                    <Form.Label className="">max</Form.Label>
                    <Form.Control className="user-input" type="number" name="maxPrice" value={max} onChange={onChange} custom />
                </Form.Group>
            </Form>
        </div>
    )
}

export default RangeInput


