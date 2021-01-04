import React, { useCallback } from 'react';

import { useToggle } from '../../custom_hooks/useToggle';
import IconTextButton from '../../layout/buttons/IconTextButton';
import SubmitButton from '../../layout/buttons/SubmitButton';
import Password from '../inputs/Password';
import SelectInput from '../inputs/SelectInput';
import FormMultipleInput from '../inputs/FormMultipleInput';
import FormInput from '../inputs/FormInput';

const JoinForm = ({ inputs, setInputs, onChange, onSubmit, errors, validate, children }) => {
    const [open, toggle] = useToggle(false);

    const props = useCallback(
        label => {
            return {
                label,
                value: inputs[label],
                onChange,
                type: label === "email" ? "email" : "text",
                validate,
                error: errors[label],
                required: true
            }
        },
        [inputs]
    )

    if (!open && !inputs.googleAuth) {
        return (
            <>
                <FormInput {...props("email")} />
                <Password {...props("password")} />
                <Password {...props("confirmPassword")} />
                <IconTextButton title="continue" icon="fa fa-long-arrow-right" btn_class="join__continueButton" onClick={toggle} />
                {children}
            </>
        )
    }

    if (open || inputs.googleAuth) {
        return (
            <>
                <FormInput {...props("fullname")} />
                <FormInput {...props("username")} />
                <FormMultipleInput label="country" required="true" selected={inputs.country} onChange={country => console.log(country) || setInputs({
                    ...inputs,
                    country
                })} />
                <SelectInput {...props("role")} options={["designer", "buyer"]} />
                {!inputs.googleAuth && <IconTextButton onClick={toggle} title="go back" btn_class="join__backButton" icon="fa fa-long-arrow-left" />}
                <SubmitButton btn_class="join__submitButton" title="join" onSubmit={onSubmit} />
            </>
        )
    }

    return null
}

export default React.memo(JoinForm)
