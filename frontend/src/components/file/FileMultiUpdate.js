
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { useToggle } from '../../custom_hooks/useToggle';
import { UPDATE_FILES_MUTATION } from './graphql/mutations';
import CustomButton from '../../layout/button/CustomButton';

const SortableItem = sortableElement(({ value, currIndex }) => <img src={value.url} className={`thumb order-${currIndex}`} />);

const SortableContainer = sortableContainer(({ children }) => {
    return console.log(children) || <div className="fileMultiUpdate__wrap">{children}</div>;
});

const FileMultiUpdate = ({ docId, prevFiles, onDeleteCompleted }) => {
    const [gallery, setGallery] = useState([]);
    const [editMode, toggleEditMode] = useToggle(false);
    const [reorderedGallery, setReorderedGallery] = useState([])
    const [post] = useMutation(UPDATE_FILES_MUTATION);

    useEffect(() => {
        if (prevFiles) setGallery(prevFiles)
    }, [prevFiles]);

    const toggleDelete = id => {
        // console.log(deletedGalleryItems.some(fileId => fileId === id))
        // if (deletedGalleryItems.some(fileId => fileId === id)) {
        //     return setDeletedGalleryItems(
        //         deletedGalleryItems.filter(fileId => fileId !== id)
        //     )
        // }
        // else return setDeletedGalleryItems([
        //     ...deletedGalleryItems,
        //     id
        // ])
        // // setTimeout(() => {
        // //     onDeleteCompleted(id)
        // // }, 5000)
        setGallery(
            gallery.filter(file => file._id !== id)
        )
    }
    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newState = arrayMoveImmutable(gallery, newIndex, oldIndex)
        setGallery(newState);
        setReorderedGallery(newState)
    };

    const onSave = () => {
        let updatedFilesIds;
        if (reorderedGallery.length !== gallery.length) {
            updatedFilesIds = gallery.map(file => {
                return file._id
            })
        }
        if (reorderedGallery.length === gallery.length) {
            updatedFilesIds = reorderedGallery.map(file => {
                return file._id
            })
        }
        return post({
            variables: {
                updatedFilesIds,
                docId
            }
        })
    }

    return (
        <div className="">
            <h6 className="d-flex">
                Gallery
                <CustomButton
                    btn_class="btn-icon fas fa-edit mx-2"
                    onClick={toggleEditMode}
                >
                </CustomButton>
            </h6>
            <SortableContainer onSortEnd={onSortEnd}>
                {!!gallery.length &&
                    gallery.map((file, index) => {
                        if (!editMode) return <img
                            key={file._id}
                            src={file.url}
                            className={`thumb order-${index}`} />
                        return (
                            <div key={file._id} className={`fileMultiUpdate ${index === 0 && "cover"}`}>
                                {index === 0 && <span className="w-100 text-center">cover</span>}
                                <SortableItem
                                    key={file._id}
                                    index={index}
                                    currIndex={index}
                                    value={file} />
                                {editMode &&
                                    gallery.length > 1 &&
                                    <CustomButton
                                        btn_class="btn-icon-text m-auto fas fa-times red"
                                        onClick={() => toggleDelete(file._id)}
                                    >
                                        delete
                                    </CustomButton>}
                            </div>
                        )
                    })
                }
            </SortableContainer>
            {editMode &&
                !!gallery.length
                &&
                <CustomButton
                    btn_class="btn-click my-5"
                    onClick={onSave}
                >
                    save changes
                </CustomButton>
            }
        </div>
    )
}

export default FileMultiUpdate



