import React from 'react'
import DesignerSum from '../../components/designer/DesignerSum';
import DesignerUpdate from '../../components/designer/DesignerUpdate';
import { useToggle } from '../../custom_hooks/useToggle';
import ProfileSectionTitle from './ProfileSectionTitle'

const ProfilePortfolioIntro = ({ designerInfo }) => {
    const [editMode, toggleEditMode] = useToggle(false);

    if (editMode) return <DesignerUpdate designerInfo={designerInfo} toggleEditMode={toggleEditMode} />

    return (
        <>
            <ProfileSectionTitle title="About Designer" onClick={toggleEditMode} icon_class="fa fa-edit" />
            <DesignerSum designerInfo={designerInfo && designerInfo} />
        </>
    )

}

export default ProfilePortfolioIntro
