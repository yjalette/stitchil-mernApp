import React, { useContext } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import ProfileItemContext from '../../../context/ProfileItem-context';
import CustomModal from '../../layout/CustomModal';

const ItemSlides = ({ items, item, activeIndex, handleBackward, handleForward }) => {
    const { comp } = useContext(ProfileItemContext);

    return (
        <CustomModal
            modal_title={item.title}
            modal_class="itemSlides slides"
            modal_footer={
                <>
                    {item && <div className="slides__controls">
                        <i className="fa fa-angle-left " onClick={handleBackward}></i>
                        <i className="fa fa-angle-right " onClick={handleForward}></i>
                    </div>}
                </>
            }
            btn_class="fa fa-angle-double-right btn-icon">
            <Row className="slides__item ">
                <Col lg={8} className="slides__col">
                    {/* <Image src={item.imageUrl} className="slides__img" /> */}
                    <PictureZoom elem_class="slides__img" imgageUrl={item.imageUrl} />
                    {/* <ImageZoom img_class="slides__img" img_src={item.imageUrl} /> */}
                </Col>
                <Col lg={4} className="slides__col">
                    {comp.ItemDetailsComp(item, activeIndex)}
                </Col>
            </Row>
            {/* <Item item={items[activeIndex]} index={activeIndex} /> */}
        </CustomModal>

    )
}

ItemSlides.defaultProps = {
    currentIndex: 0
}

// <CustomModal
// modal_title={items[activeIndex].title}
// modal_class="itemSlides slides"
// modal_footer={
//     <>
//         {items && items.length > 1 && <div className="slides__controls">
//             <i className="fa fa-angle-left " onClick={handleBackward}></i>
//             <i className="fa fa-angle-right " onClick={handleForward}></i>
//         </div>}
//     </>
// }
// btn_class="fa fa-angle-double-right btn-icon">
// <Row className="slides__item ">
//     <Col lg={8} className="slides__col">
//         <Image src={items[activeIndex].imageUrl} className="slides__img" />
//         {/* <ImageZoom img_class="slides__img" img_src={item.imageUrl} /> */}
//     </Col>
//     <Col lg={4} className="slides__col">
//         {comp.ItemDetailsComp(items[activeIndex], activeIndex)}
//     </Col>
// </Row>
// {/* <Item item={items[activeIndex]} index={activeIndex} /> */}
// </CustomModal>

export default ItemSlides;

const Item = (item, index) => {
    const { comp } = useContext(ProfileItemContext);

    return (
        <Row className="slides__item ">
            <Col lg={8} className="slides__col">
                <Image src={item.imageUrl} className="slides__img" />
                {/* <ImageZoom img_class="slides__img" img_src={item.imageUrl} /> */}
            </Col>
            <Col lg={4} className="slides__col">
                {comp.ItemDetailsComp(item, index)}
            </Col>
        </Row>
    )
}