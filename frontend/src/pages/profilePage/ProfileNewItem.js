import React from 'react'
import { useParams } from 'react-router'
import ItemFormWrapper from '../../components/items/ItemFormWrapper'
import ItemOverviewCreate from '../../components/items/ItemOverviewCreate'
import { useToggle } from '../../custom_hooks/useToggle'
import CustomButton from '../../layout/button/CustomButton'
import CustomModal from '../../layout/CustomModal'

export const forms = {
    "gigs": { "gallery": <> </>, "variants": <> </>, "publish": <></> },
    "portfolio": { "gallery": <> </>, "options": <></>, "publish": <></> }
}

const isFormDisabled = (form_name) => {
    return form_name !== "overview" ? true : false
}

const ProfileNewItem = () => {
    const { group } = useParams();
    const [open, toggle] = useToggle(false)

    if (!open) return <CustomButton
        btn_class="btn-icon profileCreate-btn"
        icon="fas fa-plus"
        onClick={toggle}
        btn_otherProps={{
            title: "create"
        }} />

    return (
        <CustomModal
            displayWithoutBtn>
            <ItemOverviewCreate group={group} />
        </CustomModal>
    )
}

export default ProfileNewItem

// return <ItemFormWrapper isDisabled={isFormDisabled} forms={{
//     "overview": <ItemOverviewCreate group={group} />,
//     ...forms[group]
// }} />