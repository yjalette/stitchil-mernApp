import React from 'react'
import CustomAlert from '../../layout/CustomAlert'
import ItemSum from './ItemSum'
import "./style.css"

const ItemList = ({ items, getProps, emptyResultType }) => {
    // if (!items || items.length < 1) return <CustomAlert alert_variant="light" alert_class="clear">
    //     0 items  <i className="fa fa-frown-o" />
    // </CustomAlert>
    if (!items || items.length < 1) return <></>
    return (
        <div className="itemList">
            {items.map((item, index) => <ItemSum key={index} {...getProps(item, index)} />)}
        </div>
    )
}
export default ItemList
