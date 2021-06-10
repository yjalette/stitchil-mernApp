import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { highlights } from './helpers';
import ProfileContext from './../../context/Profile-context';
import CustomButton from './../../layout/button/CustomButton';
import ProfileReviews from './ProfileReviews';
import ItemList from '../../components/items/ItemList';
import CustomPopover from '../../layout/CustomPopover';
import messages from '../../constants/messages'
import ButtonEdit from '../../layout/button/ButtonEdit';
import SectionHeader from '../../layout/SectionHeader';
import ItemOverviewCreate from '../../components/items/ItemOverviewCreate';
import dateHelper from '../../helpers/dateHelper';

const ProfileItems = ({ values }) => {
    const { logged_in_user } = useContext(ProfileContext);
    const { section } = useParams();
    const { push } = useHistory()

    const handleEdit = item => {
        return push(`/profile-item/${item.group}/draft/${item._id}/overview/`)
    }

    const activeValues = values && values.filter(val => val.active === true);
    const draftValues = logged_in_user && values && values.filter(val => val.active === false);

    return (
        <>
            <SectionHeader title={`${section} (${activeValues.length})`} >
                {logged_in_user
                    && values
                    && values.length > 20 ?
                    <CustomPopover
                        content="max 6 items"
                        trigger="click"
                        placement="left-end"
                        popover_class="warning">
                        <CustomButton
                            btn_class="btn-icon-text profileCreate-btn"
                            icon="fas fa-plus" />
                    </CustomPopover>
                    :
                    <ItemOverviewCreate />}
            </SectionHeader>
            <ItemList items={activeValues} getProps={(item, i) => {
                return {
                    itemId: item._id,
                    header: {
                        title: item.title
                    },
                    coverImage: item.coverImage || item.gallery[0],
                    highlights: highlights(item, section),
                    sideMenu: (
                        <>
                            {logged_in_user ?
                                <ButtonEdit onClick={() => handleEdit(item)} />
                                :
                                <CustomPopover
                                    content={messages.demo}
                                    trigger="click"
                                    placement="left-end"
                                    popover_class="warning">
                                    <CustomButton
                                        btn_class="btn-icon"
                                        icon="fa fa-heart" />
                                </CustomPopover>}
                        </>)
                }
            }} />
            {logged_in_user && <>
                <SectionHeader title={`Drafts (${draftValues.length})`} />
                {draftValues.map((item, index) => <CustomButton
                    key={index}
                    onClick={() => handleEdit(item)}
                    btn_class="btn-text profileSection_draft_btn">
                    {item.title}
                    <span>{dateHelper(item.updatedAt)}</span>
                </CustomButton>)}
            </>}
        </>
    )
}

export default ProfileItems;

