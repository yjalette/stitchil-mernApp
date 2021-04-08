import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import SectionHeader from '../../layout/SectionHeader'
import SectionWrapper from '../../layout/SectionWrapper'
import mutations from './graphql/mutations'
import CustomButton from '../../layout/button/CustomButton'
import CustomAlert from '../../layout/CustomAlert'
import { useToggle } from '../../custom_hooks/useToggle'

const ItemPublish = ({ children, validate }) => {
    const [published, setPublished] = useToggle(false)
    const { itemId } = useParams()
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

    return (
        <>
            {!published ?
                <SectionHeader title="please review below and publish when you're ready " />
                : <CustomAlert variant="success" alert_heading="Item was successfully published" />}
            {children}
            <SectionWrapper >
                <CustomButton
                    btn_class="btn-click"
                    btn_otherProps={{
                        disabled: !validate()
                    }}
                    onClick={handleClick}
                >publish</CustomButton>
            </SectionWrapper>
        </>
    )
}

export default ItemPublish
