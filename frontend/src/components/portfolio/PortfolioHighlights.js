import React from 'react'

import MessageSum from '../message/MessageSum';
import PortfolioItemLike from './PortfolioItemLike';

const PortfolioHighlights = ({ item }) => {
    return (
        <div className="portfolioHighlights">
            <h6>{item.likes.length}<i className="fa fa-thumbs-up ml-2" /></h6>
            {/* <PortfolioItemLike likes={item.likes} docId={item._id} /> */}
        </div>
    )
}

export default PortfolioHighlights