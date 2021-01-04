import React from 'react';
import { Form } from 'react-bootstrap';

import FormInput from '../inputs/FormInput';
import Location from '../inputs/Location';
import SubmitButton from '../../layout/buttons/SubmitButton';

const initState = { username: "", email: "", fullname: "", location: { address: "", apt: "", city: "", state: "", zipCode: "" } }


const UpdateAccount = ({ inputs, setInputs, errors, handleChange, handleSubmit }) => {
    return (
        <div className="account">
            {Object.keys(initState).map(key => {
                return (
                    <Form key={key} className="page__box">
                        {key !== "location" && <FormInput label={key} onChange={handleChange} error={errors && errors[key]} value={inputs[key]} type={key === "email" ? "email" : "text"} />}
                        {key === "location" && <Location inputs={inputs} setInputs={setInputs} />}
                        <SubmitButton onSubmit={(e) => handleSubmit(e, { [key]: inputs[key] })} title="save" />
                    </Form>
                )
            })}
        </div>
    )
}

export default UpdateAccount
