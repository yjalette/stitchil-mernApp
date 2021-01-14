import React, { useEffect } from 'react'
import FormMultipleInput from '../../../components/inputs/FormMultipleInput'
import useForm from '../../../custom_hooks/useForm'

const FilterOptions = ({ inputs, setInputs }) => {
    // const { inputs, setInputs } = useForm({});

    // const { inputs, setInputs } = useForm({ category: [], style: [] });




    return (
        <div className="exploreFilter flex-center">
            <FormMultipleInput label="category" selected={inputs.category} onChange={value => setInputs({ ...inputs, category: value })} />
            <FormMultipleInput label="style" selected={inputs.style} onChange={value => setInputs({ ...inputs, style: value })} />
        </div>
    )
}

export default FilterOptions
