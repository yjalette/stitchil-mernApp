import React from 'react';
import { FormControl } from 'react-bootstrap';
import InputMask from 'react-input-mask';

const MaskInput = ({ mask_input, mask_name, mask_class, value, onChange }) => (
    <InputMask mask={mask_input} className={mask_class} onChange={onChange} name={mask_name} value={value} type="tel" >
        {(inputProps) => <FormControl {...inputProps} />}
    </InputMask>
)

export default MaskInput;

