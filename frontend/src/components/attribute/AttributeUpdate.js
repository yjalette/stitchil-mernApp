import React, { useEffect, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { ATRRIBUTE_UPDATE_MUTATION } from './graphql/mutations';
import { attributes } from '../../constants/attributes/attributes'
import useForm from '../../custom_hooks/useForm'
import CustomForm from '../../layout/CustomForm';
import SelectInput from '../inputs/SelectInput';
import FormGroup from '../inputs/FormGroup';

const AttributeUpdate = ({ attribute, listingType, productType }) => {
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({}, onSubmit);
    const [update] = useMutation(ATRRIBUTE_UPDATE_MUTATION);

    useEffect(() => {
        if (attribute) {
            setInputs(attribute)
        }
    }, [attribute]);

    function onSubmit() {
        update({
            variables: {
                attributeValue: inputs.attributeValue,
                attributeId: attribute._id
            }
        })
    }
    if (!attribute) return <div>load</div>
    return (
        <CustomForm
            submitTitle="update"
            onSubmit={handleSubmit}>
            {inputs.attributeName && <FormGroup
                label={inputs.attributeName.replace("_", " ")}
                input_component={
                    <SelectInput
                        input_props={{
                            name: "attributeValue",
                            onChange: handleChange,
                            value: inputs.attributeValue
                        }}
                        defaultValue={inputs.attributeValue}
                        options={attributes[listingType][productType][inputs.attributeName].options}
                    />
                }
            />}
        </CustomForm>
    )
}

export default AttributeUpdate
