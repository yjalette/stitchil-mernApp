import React from 'react'

import "./style.css"
import ListItem from '../../layout/ListItem'
import CommentData from '../comment/CommentData'
import PortfolioItemLike from './PortfolioItemLike'

const PortfolioItemDetails = ({ item }) => {
    return (
        <div className="portfolioDetails">
            <section className="portfolioDetails__topCol">
                <div className="portfolioDetails__cap pb-3">
                    <ListItem field="title: " content={item.title} />
                    <ListItem field="description: " content={item.description} />
                </div>
                <div className="portfolioDetails__likes ">
                    <PortfolioItemLike docId={item._id} likes={item.likes || []} />
                </div>
            </section>
            <CommentData docId={item._id} />
        </div>
    )
}

export default PortfolioItemDetails
