import React from 'react';
import { Form, Col } from 'react-bootstrap';

import FormMultipleInput from './FormMultipleInput';
import MaskInput from './MaskInput';

const Location = ({ inputs, setInputs }) => {

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            location: {
                ...inputs.location,
                [name]: value
            }
        });


    }

    return (
        <section className="address">
            <Form.Row>
                <Form.Group className="field-wrapper" as={Col} xs={10}>
                    <Form.Label>address</Form.Label>
                    <Form.Control onChange={handleChange} name="address" value={inputs.location.address || ""} className="user-input" />
                </Form.Group >
                <Form.Group className="field-wrapper" as={Col} xs={2}>
                    <Form.Label>apt</Form.Label>
                    <Form.Control onChange={handleChange} name="apt" value={inputs.location.apt || ""} className="user-input" />
                </Form.Group >
            </Form.Row>
            <Form.Row>
                <Form.Group className="field-wrapper" as={Col}>
                    <Form.Label>city</Form.Label>
                    <Form.Control type="text" name="city" value={inputs.location.city || ""} onChange={handleChange} className="user-input" />
                </Form.Group>
                <Form.Group className="field-wrapper" as={Col}>
                    <Form.Label>state</Form.Label>
                    <FormMultipleInput onChange={(value) => handleChange({ target: { value: value.join(""), name: "state" } })} label="state" value={inputs.location.state || ""} className="user-input" />
                </Form.Group>
                <Form.Group className="field-wrapper" as={Col}>
                    <Form.Label>zip code</Form.Label>
                    <MaskInput onChange={handleChange} mask_name="zipcode" value={inputs.location.zipCode || ""} mask_class="user-input" />
                </Form.Group>
            </Form.Row>
        </section>
    )
}

export default Location



// {showDistance && <Form.Group className="field-wrapper flex-center">
// <Form.Label className="w-100 text-right ">sort by distance</Form.Label>
// <Form.Control className="w-auto border" as="select" name="distance" value={inputs.location.distance} onChange={handleChange}>
//     <option>25</option>
//     <option>50</option>
//     <option>100</option>
// </Form.Control>
// </Form.Group>}