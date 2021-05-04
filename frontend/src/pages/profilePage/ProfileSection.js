import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { highlights } from './helpers';
import ProfileContext from './../../context/Profile-context';
import CustomButton from './../../layout/button/CustomButton';
import ProfileReviews from './ProfileReviews';
import ItemList from '../../components/items/ItemList';
import CustomPopover from '../../layout/CustomPopover';
import messages from '../../constants/messages'


const ProfileSection = ({ values, addItemCache }) => {
    const { logged_in_user } = useContext(ProfileContext);
    const { section } = useParams();
    const { push } = useHistory()

    if (section === "reviews") {
        return <ProfileReviews
            values={values || []}
            addItemCache={addItemCache} />
    }
    return (
        <>

            <ItemList items={values} getProps={(item, i) => {
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
                                <CustomButton
                                    btn_class="btn-icon profileCreate-btn"
                                    icon="fas fa-pencil-alt"
                                    btn_otherProps={{
                                        title: "edit"
                                    }}
                                    onClick={() => {
                                        return push(`/profile-item/${item.group}/draft/${item._id}/overview/`)
                                    }} />
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
        </>
    )
}

export default ProfileSection;

