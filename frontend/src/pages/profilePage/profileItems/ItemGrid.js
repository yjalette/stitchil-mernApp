import React, { useEffect, useContext } from 'react';
import { Container, Card } from 'react-bootstrap';

import ProfileContext from '../../../context/Profile-context';
import ItemDelete from './ItemDelete';
import ProfileItemContext from '../../../context/ProfileItem-context';
import ItemUpdate from './ItemUpdate';
import CustomButton from '../../../layout/button/CustomButton';
import ItemList from '../../../components/items/ItemList';
import useSlides from '../../../custom_hooks/useSlides';
import CustomModal from '../../../layout/CustomModal';
import ItemDetails from './ItemDetails';
import { useToggle } from '../../../custom_hooks/useToggle';

const ItemGrid = ({ values }) => {
    const [open, toggle] = useToggle(false)
    const { handleForward, handleBackward, activeIndex, setActiveIndex } = useSlides(0, values);
    const { logged_in_user } = useContext(ProfileContext);
    const { comp } = useContext(ProfileItemContext);

    // useEffect(() => {
    //     if (index) handleSlides(index);
    // }, [index]);

    const handleSlides = index => {
        setActiveIndex(index);
        toggle();
    }

    return (
        <Container className="item__grid">
            {values && values.length > 0 && <ItemList items={values} getProps={(item, index) => {
                return {
                    title: item.title,
                    imageUrl: item.imageUrl,
                    body: comp.highlights(item),
                    footer: (
                        <>
                            {
                                logged_in_user ?
                                    <>
                                        < ItemUpdate item={item} index={index} />
                                        <ItemDelete itemId={item._id} />
                                    </>
                                    :
                                    <CustomButton btn_class="btn-icon" icon="fa fa-heart" />}
                            <CustomButton btn_class="btn-icon" icon="fa fa-angle-double-right" onClick={() => handleSlides(index)} />
                            {open && <CustomModal
                                modal_title={values[activeIndex].title}
                                modal_class="itemSlides slides"
                                displayWithoutBtn={true}>
                                <ItemDetails item={values[activeIndex]} onBackward={handleBackward} onForward={handleForward} />
                            </CustomModal>}
                        </>
                    )
                }
            }} />}



        </Container >
    )

}

export default ItemGrid;




// key={index}

// item={item}
// onClick={() => setActiveIndex(index)}
// card_footer={
//     <>
//         {logged_in_user ?
//             <>
//                 <ItemUpdate item={item} index={index} />
//                 <ItemDelete itemId={item._id} />
//             </>
//             :
//             <CustomButton btn_class="btn-icon" icon="fa fa-heart" />}
//     </>
// }



