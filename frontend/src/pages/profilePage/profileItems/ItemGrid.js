import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ProfileContext from '../../../context/Profile-context';
import ItemDelete from './ItemDelete';
import ItemUpdate from './ItemUpdate';
import CustomButton from '../../../layout/button/CustomButton';
import ItemList from '../../../components/items/ItemList';
import { highlights } from './helpers';
import SectionHeader from '../../../layout/SectionHeader';
import ItemCreate from './ItemCreate';
import ReviewGrid from '../profileReview/ReviewGrid';

const ItemGrid = ({ values, updateItemCache, addItemCache, deleteItemCache }) => {
    const { section } = useParams();
    const { push } = useHistory()
    const { logged_in_user } = useContext(ProfileContext);

    if (section === "reviews") return <ReviewGrid values={values || []} addItemCache={addItemCache} />
    return (
        <>
            <SectionHeader title={section}>
                {logged_in_user && <ItemCreate addItemCache={addItemCache} overLimit={values && values.length > 5} />}
            </SectionHeader>
            {values && values.length > 0 && <ItemList items={values} getProps={(item, index) => {
                return {
                    header: { title: item.title },
                    // coverImage: item.coverImage,
                    highlights: highlights(item, section),
                    sideMenu: (<>
                        {logged_in_user ?
                            <>
                                <ItemUpdate item={item} index={index} updateItemCache={updateItemCache} />
                                <ItemDelete itemId={item._id} deleteItemCache={deleteItemCache} />

                            </>
                            : <CustomButton btn_class="btn-icon" icon="fa fa-heart" />}

                        <CustomButton btn_class="btn-icon" icon="fa fa-angle-double-right" onClick={() => push(`/view-${section}-item/${item._id}`)} />
                    </>
                    )
                }
            }} />}
        </>
    )

}

export default ItemGrid;


// return {
//     title: item.title,
//     imageUrl: item.imageUrl,
//     body: <ItemHighlights highlights={highlights(item, section)} />,
//     footer: (<>
//         {logged_in_user ?
//             <GroupButton>
//                 <ItemUpdate item={item} index={index} updateItemCache={updateItemCache} />
//                 <ItemDelete itemId={item._id} deleteItemCache={deleteItemCache} />
//             </GroupButton>
//             : <CustomButton btn_class="btn-icon" icon="fa fa-heart" />}

//         <CustomButton btn_class="btn-icon" icon="fa fa-angle-double-right" onClick={() => showDetails(item._id)} />
//     </>
//     )
// }