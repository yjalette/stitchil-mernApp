import React, { useEffect } from 'react';
import { useState } from 'react';
import { Image } from "react-bootstrap";
import CustomButton from '../../layout/button/CustomButton';
import ItemUpload from './ItemUpload';

const ItemGalleryUpdate = ({ prevFiles, coverImage }) => {
    const [newCover, setNewCover] = useState("");
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        if (prevFiles) setGallery(prevFiles)
    }, [prevFiles]);


    const handleDelete = url => {
        setGallery(gallery.filter(img => img !== url))
    }

    if (!prevFiles || prevFiles.length < 1) return <ItemUpload action="create" />

    return (
        <ItemUpload action="update" otherVars={{
            gallery
        }}>
            {gallery && gallery.map((item, index) => {
                return (
                    <div key={index} className={`${item === newCover && "item-cover"} item-upload-wrapper`}>
                        <Image className="itemUpload__img itemUpdate-prevImg" src={item} alt="file" />
                        <CustomButton
                            btn_class="btn-text itemUpdate__overlay-btn"
                            btn_otherProps={{
                                title: item !== newCover ? "set as a cover" : "",
                                name: "coverImage",
                                value: item,
                                disabled: item === newCover
                            }}
                            onClick={() => setNewCover(item)}>cover</CustomButton>
                        {item !== newCover && <CustomButton
                            btn_class="fas fa-times btn-icon-text btn-red pt-1"
                            onClick={() => handleDelete(item)} />}
                    </div>
                )
            })}
        </ItemUpload>
    )
}



export default ItemGalleryUpdate
