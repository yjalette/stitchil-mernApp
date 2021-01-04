import React, { useContext } from 'react';

import "./style.css"

import OverlayCard from '../../layout/cards/OverlayCard';
import CardFooter from '../../layout/cards/CardFooter';
import CardBody from '../../layout/cards/CardBody';
import IconButton from '../../layout/buttons/IconButton';
import UserAvatar from '../user/UserAvatar';
import ProfileContext from '../../context/Profile-context';

const ItemSum = ({ item, onLeftBtn, onRightBtn, children }) => {
    const { logged_in_user } = useContext(ProfileContext);
    return (
        <OverlayCard
            coverImage={item.imageUrl}
            title={item.title || item.caption.title}
            rating={item.creator && item.creator.rating}
            card_class="item-card"
        >
            <CardBody>
                {item.creator && <UserAvatar username={item.creator.username} profileImage={item.creator.profileImage} />}
            </CardBody>
            <section className="item-card__highlights">
                {children}
            </section>
            <CardFooter>
                {logged_in_user ?
                    <IconButton icon_class="fa fa-edit" onClick={onLeftBtn} />
                    :
                    <IconButton icon_class="fa fa-heart" onClick={onLeftBtn} />}
                <IconButton icon_class="fa fa-angle-double-right " onClick={onRightBtn} />
            </CardFooter>
        </OverlayCard>
    )
}

export default ItemSum;
