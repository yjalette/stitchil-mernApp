import React from 'react';
import { Container } from 'react-bootstrap';
import ItemList from '../../../components/items/ItemList';

import useSlides from '../../../custom_hooks/useSlides';
import CustomModal from '../../../layout/CustomModal';
import ItemDetails from './ItemDetails';
import ItemSum from './ItemSum';

const ItemGrid = ({ values }) => {
    const { handleForward, handleBackward, activeIndex, setActiveIndex } = useSlides(0, values);
    return (
        <Container className="item__list grid-container">
            {values && values.length > 0 && <ItemList items={values} showItem={(item, index) => <ItemSum key={index}
                index={index}
                item={item}
                handleSlides={() => setActiveIndex(index)}
            >
                <CustomModal
                    modal_title={item.title}
                    modal_class="itemSlides slides"
                    btn_class="fa fa-angle-double-right customIcon">
                    <ItemDetails item={values[activeIndex]} onBackward={handleBackward} onForward={handleForward} />
                </CustomModal>
            </ItemSum>} />}
        </Container>
    )

}

export default ItemGrid;



