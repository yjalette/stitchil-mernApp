import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router';
import { ATRRIBUTES_CREATE_MUTATION } from './graphql/mutations'
import { attributes } from '../../constants/attributes/attributes'
import useForm from '../../custom_hooks/useForm'
import FormGroup from '../inputs/FormGroup'
import SelectInput from '../inputs/SelectInput'
import CustomForm from '../../layout/CustomForm'

const AttributesListCreate = ({ productType, updateQuery }) => {
    const { listingId } = useParams();
    const { inputs, setInputs, handleSubmit } = useForm([], onSubmit);
    const [post] = useMutation(ATRRIBUTES_CREATE_MUTATION, {
        onCompleted: data => {
            if (data) {
                updateQuery(prev => {
                    return {
                        listing: {
                            ...prev.listing,
                            attributes: data.createAttributes
                        }
                    }
                })
            }
        }
    });

    useEffect(() => {
        if (productType) {
            setInputs(
                Object.keys(attributes[productType])
                    .map(k => {
                        return {
                            attributeName: k,
                            attributeValue: ""
                        }
                    })
            )
        }
    }, [productType])

    const handleChange = (e) => {
        const newState = [...inputs];
        const index = inputs.findIndex(obj => obj.attributeName === e.target.name)
        newState.splice(index, 1, {
            attributeName: e.target.name,
            attributeValue: e.target.value
        })
        setInputs(newState)
    }

    function onSubmit() {
        console.log(inputs)
        post({
            variables: {
                attributesListInput: inputs,
                listingId
            }
        })
    }

    return (
        <CustomForm
            submitTitle="save attributes"
            onSubmit={handleSubmit}>
            {inputs.map(attr => {
                return <FormGroup
                    key={attr["attributeName"]}
                    label={attr["attributeName"].replace("_", " ")}
                    input_component={<SelectInput
                        input_props={{
                            onChange: handleChange,
                            name: attr["attributeName"],
                        }}
                        defaultValue={"n/a"}
                        options={attributes[productType][attr.attributeName].options}
                    />}
                />
            })}
        </CustomForm>
    )
}

export default AttributesListCreate
