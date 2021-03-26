import React from 'react';
import ItemToggle from '../components/items/ItemToggle';
import './style.css'

const ListItem = ({ field, icon, content, maxWords, item_class }) => (
    <div className={`listItem ${item_class}`}>
        {field && <span className="listItem__field">{field}</span>}
        {icon && <i className={`${icon} listItem__icon`} alt="list icon" />}
        {content ? !maxWords ?
            <span className="listItem__content">{Array.isArray(content) ? content.join(", ") : content}</span>
            : <span className="listItem__content">
                {content.slice(0, maxWords)}
                <ItemToggle>{content.slice(maxWords, content.length)}</ItemToggle>
            </span>
            : <></>}
    </div>
)

export default ListItem
