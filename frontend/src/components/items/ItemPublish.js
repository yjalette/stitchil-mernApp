import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory, useParams } from 'react-router'
import SectionHeader from '../../layout/SectionHeader'
import SectionWrapper from '../../layout/SectionWrapper'
import mutations from './graphql/mutations'
import CustomButton from '../../layout/button/CustomButton'
import CustomAlert from '../../layout/CustomAlert'
import { useToggle } from '../../custom_hooks/useToggle'
import BoxWrapper from '../../layout/BoxWrapper'
import GroupButton from '../../layout/button/GroupButton'

const ItemPublish = ({ children, validate }) => {
    const [published, setPublished] = useToggle(false)
    const { itemId } = useParams();
    const { push } = useHistory()
    const [post] = useMutation(mutations['PUBLISH'], {
        onCompleted: data => {
            if (data.publish_item) {
                setPublished(true)
            }
        }
    });

    const handleClick = () => {
        return post({ variables: { itemId } })
    }

    if (published) {
        return (
            <>
                <CustomAlert variant="success" >
                    Item was successfully published
                </CustomAlert>
                <CustomButton
                    btn_class="btn-click d-flex m-auto"
                    onClick={handleClick}
                >view item</CustomButton>
            </>
        )
    }

    return (
        <>
            {children}
            <BoxWrapper >
                <CustomButton
                    btn_class="btn-click float-right"
                    btn_otherProps={{
                        disabled: !published && !validate()
                    }}
                    onClick={handleClick}
                >publish</CustomButton>
            </BoxWrapper>
        </>
    )
}

export default ItemPublish
