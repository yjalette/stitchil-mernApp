import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap';

import ProfileContext from '../../../context/Profile-context';
import OverlayCard from '../../../layout/cards/OverlayCard';
import CardFooter from '../../../layout/cards/CardFooter';
import IconButton from '../../../layout/buttons/IconButton';
import ItemDelete from './ItemDelete';
import ProfileItemContext from '../../../context/ProfileItem-context';
import ItemUpdate from './ItemUpdate';

const ItemSum = ({ item, index, handleSlides, children }) => {
    const { logged_in_user } = useContext(ProfileContext);
    const { comp } = useContext(ProfileItemContext);

    useEffect(() => {
        if (index) handleSlides(index);
    }, [index])


    return (
        <OverlayCard
            coverImage={item.imageUrl}
            title={item.title}
            card_class="item itemSum"
        >
            <Card.Body className="itemSum__body">
                {comp.highlights(item)}
            </Card.Body>
            <CardFooter card_class="itemSum__footer flex-center flex-column justify-content-between w-100">
                {logged_in_user ?
                    <>
                        <ItemUpdate item={item} index={index} />
                        <ItemDelete itemId={item._id} />
                    </>
                    :
                    <IconButton icon_class="fa fa-heart" />}
                {children}
            </CardFooter>
        </OverlayCard>
    )
}


export default React.memo(ItemSum);
