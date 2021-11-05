
import React, { useEffect, useState } from 'react';
import { Image, InputGroup, Container } from "react-bootstrap";
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import CustomButton from '../../layout/button/CustomButton';
import { useToggle } from '../../custom_hooks/useToggle';

const SortableItem = sortableElement(({ value, currIndex }) => <img src={value.url} className={`thumb order-${currIndex}`} />);

const SortableContainer = sortableContainer(({ children }) => {
    return console.log(children) || <div className="fileMultiUpdate__wrap">{children}</div>;
});

const FileMultiReorder = ({ prevFiles }) => {
    const [gallery, setGallery] = useState([]);
    const [reorderMode, toggleReorderMode] = useToggle(false);
    const [reorderedGallery, setReorderedGallery] = useState([]);
    const [deletedGalleryItems, setDeletedGalleryItems] = useState([]);

    useEffect(() => {
        if (prevFiles) setGallery(prevFiles)
    }, [prevFiles]);


    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newState = arrayMoveImmutable(gallery, newIndex, oldIndex)
        setGallery(newState);
        setReorderedGallery(newState)
    };

    const onSave = () => {
        console.log(deletedGalleryItems)
        console.log(reorderedGallery)
    }

    if (!reorderMode) return <CustomButton
        btn_class="btn-icon fas fa-reorder"
        onClick={onSave}
    />
    return (
        <div className="">
            <SortableContainer onSortEnd={onSortEnd}>
                {!!gallery.length &&
                    gallery.map((file, index) => {
                        // if (!deleteMode) return <img key={file._id} src={file.url} className={`thumb order-${index}`} />
                        return (
                            <div key={file._id} className={`fileMultiUpdate ${index === 0 && "cover"}`}>
                                {index === 0 && <span className="w-100 text-center">cover</span>}
                                <SortableItem
                                    key={file._id}
                                    index={index}
                                    currIndex={index}
                                    value={file} />
                            </div>
                        )
                    })
                }
            </SortableContainer>
            {reorderMode &&
                !!gallery.length
                &&
                <CustomButton
                    btn_class="btn-click my-5"
                    onClick={onSave}
                />
            }
        </div>
    )
}

export default FileMultiReorder



