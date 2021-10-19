import { useMutation } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import useForm from '../../custom_hooks/useForm'
import AttributesForm from './AttributesForm'
import { ATRRIBUTES_CREATE_MUTATION } from './graphql/mutations'
import { attributes } from '../../constants/attributes/attributes'

const AttributesCreate = ({ garment_type }) => {
    const [post] = useMutation(ATRRIBUTES_CREATE_MUTATION);
    const { inputs, setInputs } = useForm([]);

    useEffect(() => {
        if (garment_type) {
            setInputs(
                Object.keys(attributes[garment_type])
                    .map(k => {
                        return {
                            [k]: ""
                        }
                    })
            )
        }
    }, [garment_type])

    function onSubmit() {

    }

    console.log(inputs)

    return <AttributesForm values={inputs} garment_type={garment_type} />
}

export default AttributesCreate
