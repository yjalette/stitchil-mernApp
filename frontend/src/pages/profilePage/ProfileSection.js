import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ProfileContext from './../../context/Profile-context';
import CustomButton from './../../layout/button/CustomButton';
import { highlights } from './helpers';
import { section_mutation } from "./graphql/mutations";
import ProfileReviews from './ProfileReviews';
import ItemCreate from '../../components/items/ItemCreate';
import ItemDelete from '../../components/items/ItemDelete';
import ItemUpdate from '../../components/items/ItemUpdate';
import ItemList from '../../components/items/ItemList';
import CustomPopover from '../../layout/CustomPopover';
import messages from '../../constants/messages'

const ProfileSection = ({ values, updateItemCache, addItemCache, deleteItemCache }) => {
    const { section } = useParams();
    const { push } = useHistory()
    const { logged_in_user } = useContext(ProfileContext);

    if (section === "reviews") return <ProfileReviews values={values || []} addItemCache={addItemCache} />

    return (
        <>
            {logged_in_user && values && values.length > 5 ?
                <CustomPopover content="max 6 items" trigger="click" placement="left-end" popover_class="warning">
                    <CustomButton btn_class="btn-icon profileCreate-btn" icon="fas fa-plus"></CustomButton>
                </CustomPopover>
                : <CustomButton
                    btn_class="btn-icon profileCreate-btn"
                    icon="fas fa-plus"
                    btn_otherProps={{
                        title: "create"
                    }}
                    onClick={() => push(`/create-item/${section}`)} />}

            <ItemList items={values} getProps={(item, index) => {
                return {
                    itemId: item._id,
                    header: { title: item.title },
                    coverImage: item.coverImage,
                    highlights: highlights(item, section),
                    sideMenu: (<>
                        {logged_in_user ?
                            <>
                                <ItemUpdate item={item} index={index} updateItemCache={updateItemCache} mutation={section_mutation[section].UPDATE} />
                                <ItemDelete itemId={item._id} deleteItemCache={deleteItemCache} mutation={section_mutation[section].DELETE} />
                            </>
                            :
                            <CustomPopover content={messages.demo} trigger="click" placement="left-end" popover_class="warning">
                                <CustomButton btn_class="btn-icon" icon="fa fa-heart" />
                            </CustomPopover>}
                    </>)
                }
            }} />

        </>
    )
}

export default ProfileSection;
