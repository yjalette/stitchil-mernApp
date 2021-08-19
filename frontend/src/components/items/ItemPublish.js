import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory, useParams } from 'react-router'
import { useToggle } from '../../custom_hooks/useToggle'
import mutations from './graphql/mutations'
import CustomButton from '../../layout/button/CustomButton'
import CustomAlert from '../../layout/CustomAlert'
import GroupButton from '../../layout/button/GroupButton'
import ItemDelete from './ItemDelete'

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
                    Item was successfully published!
                </CustomAlert>
                <CustomButton
                    btn_class="btn-click flex-center"
                    onClick={handleClick}
                >view item</CustomButton>
            </>
        )
    }

    return (
        <>
            {children}
            {/* <BoxWrapper > */}
            <GroupButton group_class="itemPublish__buttons">
                <ItemDelete group="gig" />
                <CustomButton
                    btn_class="btn-click"
                    btn_otherProps={{
                        disabled: !published && !validate()
                    }}
                    onClick={handleClick}
                >publish</CustomButton>
            </GroupButton>

            {/* </BoxWrapper> */}
        </>
    )
}

export default ItemPublish
