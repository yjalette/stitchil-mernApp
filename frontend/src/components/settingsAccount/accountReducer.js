import React from 'react';

import FormInput from '../inputs/FormInput';
import FormMultipleInput from '../inputs/FormMultipleInput';

export const accountReducer = (state, action, bau) => {
    console.log(state, action, bau)
    switch (action.type) {
        case "USERNAME": {
            return (inputs, onChange) => <FormInput label="username" value={inputs.username} onChange={onChange} />
        }
        // case "FULLNAME": (inputs, onChange) => <FormInput label="fullname" value={inputs.fullname} onChange={onChange} />
        // case "LANGUAGES": return (inputs, onChange) => <FormMultipleInput label="languages" selected={inputs.languages} multiple={true}  onChange={value => onChange({target: value})} />
        // case "COUNTRY": (inputs, onChange) => <FormMultipleInput label="country" selected={inputs.country} onChange={value => onChange({target: value})} />
        default: return
        }


       
}
