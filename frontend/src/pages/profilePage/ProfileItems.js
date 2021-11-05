import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { highlights } from './helpers';
import ProfileContext from './../../context/Profile-context';
import CustomButton from './../../layout/button/CustomButton';
import ProfileReviews from './ProfileReviews';
import ItemList from '../../components/items/ItemList';
import CustomPopover from '../../layout/CustomPopover';
import messages from '../../constants/messages'
import SectionHeader from '../../layout/SectionHeader';
import ItemOverviewCreate from '../../components/items/ItemOverviewCreate';
import dateHelper from '../../helpers/dateHelper';
import BoxWrapper from '../../layout/BoxWrapper';
import ListItem from '../../layout/ListItem';
import OverlayCard from '../../layout/card/OverlayCard';

const ProfileItems = ({ values }) => {
    const { logged_in_user } = useContext(ProfileContext);
    const { section } = useParams();
    const { push } = useHistory()

    const handleEdit = item => {
        return push(`/profile-item/${item.group}/draft/${item._id}/overview/`)
        // return push(`/profile-item/${item.group}/view/${item._id}/`)
    }
    console.log(values)
    return (
        <>
            {/* <SectionHeader title={`${section} (${activeValues.length})`} /> */}
            {values &&
                !!values.length &&
                values.map(item => {
                    return <OverlayCard
                        key={item._id}
                        card_props={{
                            title: item.details.title
                        }}
                    ></OverlayCard>
                })
            }

        </>
    )
}

export default ProfileItems;


// {logged_in_user
//     && values
//     && values.length > 20 ?
//     <CustomPopover
//         content="max 6 items"
//         trigger="click"
//         placement="left-end"
//         popover_class="warning">
//         <CustomButton
//             btn_class="btn-icon-text profileCreate-btn"
//             icon="fas fa-plus" />
//     </CustomPopover>
//     :
//     <ItemOverviewCreate />}