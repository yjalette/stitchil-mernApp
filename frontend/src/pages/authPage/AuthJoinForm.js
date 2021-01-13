import React, { useCallback } from 'react';

import { useToggle } from '../../custom_hooks/useToggle';
import IconTextButton from '../../layout/buttons/IconTextButton';
import SubmitButton from '../../layout/buttons/SubmitButton';
import Password from '../../components/inputs/Password';
import SelectInput from '../../components/inputs/SelectInput';
import FormMultipleInput from '../../components/inputs/FormMultipleInput';
import FormInput from '../../components/inputs/FormInput';

const AuthJoinForm = ({ inputs, setInputs, onChange, errors, validate, children }) => {
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
                <Password {...props("confirm_password")} />
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
                <FormMultipleInput label="country" required="true" selected={inputs.country} onChange={country => setInputs({
                    ...inputs,
                    country
                })} />
                <SelectInput {...props("role")} options={["designer", "buyer"]} />
                {!inputs.googleAuth && <IconTextButton onClick={toggle} title="go back" btn_class="join__backButton" icon="fa fa-long-arrow-left" />}

            </>
        )
    }

    return null
}

export default React.memo(AuthJoinForm)
