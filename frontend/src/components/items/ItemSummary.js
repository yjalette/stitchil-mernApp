import React from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './style.css';

import UserAvatar from '../../layout/media/UserAvatar';



const ItemSummary = ({ item, index, header, footer, handleClick, children }) => {
    const { pathname } = useLocation();
    const { section } = useParams()
    const { push } = useHistory();

    const onTitleClick = () => {
        if (pathname.includes("filter")) push({ pathname: `/profile/${item.creator.username}/${section === "talents" ? "portfolio" : section}` })
        if (pathname.includes("profile")) handleClick(index)
    }
    return (
        <Card className={`${!item && "item-new"} item  item-summary`}>
            {item &&
                <div className="item__img-wrapper">
                    <Card.Img src={item.url || item.coverImage || item.gallery[0].coverImage} className="item__img" alt="item image" />
                </div>}
            <Card.ImgOverlay className="item__overlay flex-center flex-column">
                <Card.Header className="item__header flex-center justify-content-between w-100">
                    {pathname.includes("filter") && item.creator && <UserAvatar username={item.creator.username} profileImage={item.creator.profileImage} rating={true} />}

                </Card.Header>
                <Card.Footer className="item__footer d-flex flex-column w-100" >
                    {item.title &&
                        <Card.Title className="item__title customLink">
                            <a href="#" name={item.title} index={index} onClick={onTitleClick}> {item.title}</a>
                        </Card.Title>}
                    <div className="item__footer_highlights">
                        {footer && footer(item)}
                    </div>
                </Card.Footer>
            </Card.ImgOverlay>
            {children}

        </Card>
    )
}



// {pathname.includes("explore") && item.creator && <Card.Header className="item__header">
//                 <UserAvatar username={item.creator.username} profileImage={item.creator.profileImage} />
//             </Card.Header>}


export default ItemSummary
