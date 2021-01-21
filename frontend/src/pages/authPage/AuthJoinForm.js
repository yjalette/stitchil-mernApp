import React, { useCallback } from 'react';

import { useToggle } from '../../custom_hooks/useToggle';
import Password from '../../components/inputs/Password';
import SelectInput from '../../components/inputs/SelectInput';
import FormMultipleInput from '../../components/inputs/FormMultipleInput';
import FormInput from '../../components/inputs/FormInput';
import CustomButton from '../../layout/button/CustomButton';

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
                <CustomButton icon="fa fa-long-arrow-right" onClick={toggle} btn_class="btn-icon btn-text join__continueButton">continue</CustomButton>
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

                {!inputs.googleAuth && <CustomButton onClick={toggle} btn_class="btn-icon btn-text join__backButton" icon="fa fa-long-arrow-left">go back</CustomButton>}

            </>
        )
    }

    return null
}

export default React.memo(AuthJoinForm)
