import React from 'react'
import CustomAlert from '../../layout/CustomAlert'
import ItemSum from './ItemSum'
import "./style.css"

const ItemList = ({ items, getProps }) => {
    if (!items || items.length < 1) {
        return (
            <CustomAlert
                alert_variant="light"
                alert_class="itemAlert clear text-center">
                no items yet
            </CustomAlert>
        )
    }
    return (
        <div className="itemList">
            {items.map((item, index) => <ItemSum key={index} {...getProps(item, index)} />)}
        </div>
    )
}
export default ItemList
