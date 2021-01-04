import React, { useEffect, useContext } from 'react';
import { Image } from 'react-bootstrap'

import usePostData from '../../custom_hooks/usePostData';
import useUpload from '../../custom_hooks/useUpload';
import ProfileContext from '../../context/Profile-context';
import { useToggle } from '../../custom_hooks/useToggle';
import GroupButton from '../../layout/buttons/GroupButton';
import IconButton from '../../layout/buttons/IconButton';
import IconTextButton from '../../layout/buttons/IconTextButton';

const defaultImg = "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105102/background/buttons_nd9vx1.jpg"

const UserImage = ({ src, image_type }) => {
    const { logged_in_user } = useContext(ProfileContext)
    const { file, clearUpload, getRootProps, getInputProps } = useUpload();
    const [showButtons, setShowButtons] = useToggle(false);
    const { post, error } = usePostData("uploadprofileimage")

    useEffect(() => {
        if (file) setShowButtons(true);
    }, [file])


    const handleCancel = () => {
        clearUpload();
        setShowButtons(false)
    }

    const handleSave = () => {
        post({ variables: { file, image_type } });
        !error ? setShowButtons(false) : console.log(error)
    }

    if (!logged_in_user) return <Image src={src || defaultImg} className={image_type} />

    return (
        <div className={`${image_type}__wrapper userImage-wrapper`}>
            <Image className={image_type} src={file ? URL.createObjectURL(file) : src || defaultImg} alt="file" />
            {!showButtons ? <div {...getRootProps()} className="userImage__box flex-center">
                <input {...getInputProps({ className: 'dropzone' })} />
                <IconTextButton icon="fa fa-camera" />
            </div>
                :
                <GroupButton group_class="userImage__box justify-content-end">
                    <IconButton icon_class="fa fa-check" onClick={handleSave} />
                    <IconButton icon_class="fa fa-close redIcon" onClick={handleCancel} />
                </GroupButton>
            }

        </div>
    )
}


export default UserImage



