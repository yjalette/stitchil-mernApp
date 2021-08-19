import React from 'react'
import CustomPopover from '../../layout/CustomPopover'
import ListItem from '../../layout/ListItem'

const FabricItem = ({ fabric, mod_class, selectFabric }) => {
    return (
        <div className={`fabricItem fabricItem--${mod_class}`}>
            <CustomPopover
                placement="top"
                mod_class="fabricItem"
                content={
                    <>
                        <img
                            src={fabric.image}
                            onClick={selectFabric && selectFabric}
                            className="fabricItem__img" alt="fabric image" />
                        <ListItem field="name" content={fabric.name} />
                        <ListItem field="color" content={fabric.color} />
                        <ListItem field="content" content={fabric.content} />
                    </>
                }
            >
                <img
                    src={fabric.image}
                    onClick={selectFabric && selectFabric}
                    className="fabricItem__img" alt="fabric image" />
            </CustomPopover>
        </div>

    )
}

export default FabricItem
