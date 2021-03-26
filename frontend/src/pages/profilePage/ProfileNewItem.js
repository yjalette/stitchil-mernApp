import React from 'react'
import { useParams } from 'react-router'
import ItemFormWrapper from '../../components/items/ItemFormWrapper'
import ItemOverviewCreate from '../../components/items/ItemOverviewCreate'

// export const form_names = {
//     "gigs": ["overview", "images", "variants", "publish"],
//     "portfolio": ["overview", "gallery", "options", "publish"]
// }

export const forms = {
    "gigs": { "gallery": <> </>, "variants": <> </>, "publish": <></> },
    "portfolio": { "gallery": <> </>, "options": <></>, "publish": <></> }
}

const isFormDisabled = (form_name) => {
    return form_name !== "overview" ? true : false
}

const ProfileNewItem = () => {
    const { group } = useParams();
    return <ItemFormWrapper isDisabled={isFormDisabled} forms={{
        "overview": <ItemOverviewCreate group={group} />,
        ...forms[group]
    }} />
}

export default ProfileNewItem
