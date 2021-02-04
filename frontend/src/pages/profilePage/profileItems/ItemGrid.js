import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import ProfileContext from '../../../context/Profile-context';
import ItemDelete from './ItemDelete';
import ItemUpdate from './ItemUpdate';
import CustomButton from '../../../layout/button/CustomButton';
import ItemList from '../../../components/items/ItemList';
import { highlights } from './helpers';
import SectionHeader from '../../../layout/SectionHeader';
import ItemCreate from './ItemCreate';
import ProfileReviews from '../ProfileReviews';


const ItemGrid = ({ values, updateItemCache, addItemCache, deleteItemCache }) => {
    const { section } = useParams();
    const { logged_in_user } = useContext(ProfileContext);

    if (section === "reviews") return <ProfileReviews values={values || []} addItemCache={addItemCache} />

    return (
        <>
            <SectionHeader title={`${section} (${values ? values.length : 0})`}> </SectionHeader>
            {logged_in_user && <ItemCreate addItemCache={addItemCache} overLimit={values && values.length > 5} />}
            {values && values.length > 0 && <ItemList items={values} getProps={(item, index) => {
                return {
                    itemId: item._id,
                    header: { title: item.title },
                    coverImage: item.coverImage || item.gallery[0],
                    highlights: highlights(item, section),
                    sideMenu: (<>
                        {logged_in_user ?
                            <>
                                <ItemUpdate item={item} index={index} updateItemCache={updateItemCache} />
                                <ItemDelete itemId={item._id} deleteItemCache={deleteItemCache} />

                            </>
                            : <CustomButton btn_class="btn-icon" icon="fa fa-heart" />}

                        {/* <CustomButton btn_class="btn-icon" icon="fa fa-angle-double-right" onClick={() => push(`/view-${section}-item/${item._id}`)} /> */}
                    </>
                    )
                }
            }} />}
        </>
    )

}

export default ItemGrid;
