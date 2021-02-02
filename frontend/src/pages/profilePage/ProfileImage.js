import React, { useEffect, useContext } from 'react';
import { Image } from 'react-bootstrap'

import useUpload from '../../custom_hooks/useUpload';
import ProfileContext from '../../context/Profile-context';
import { useToggle } from '../../custom_hooks/useToggle';
import GroupButton from '../../layout/button/GroupButton';
import CustomButton from '../../layout/button/CustomButton';
import useMutationHook from '../../custom_hooks/useMutationHook';
import { UPLOAD_PROFILE_IMAGE_MUTATION } from './graphql/mutations';

const defaultImg = "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105102/background/buttons_nd9vx1.jpg"

const ProfileImage = ({ src, image_type }) => {
    const { logged_in_user } = useContext(ProfileContext)
    const { files, clearUpload, getRootProps, getInputProps } = useUpload();
    const [showButtons, setShowButtons] = useToggle(false);
    const { post, error } = useMutationHook(UPLOAD_PROFILE_IMAGE_MUTATION)

    useEffect(() => {
        if (files) setShowButtons(true);
    }, [files])


    const handleCancel = () => {
        clearUpload();
        setShowButtons(false)
    }

    const handleSave = () => {
        post({ variables: { file: files[0], image_type } });
        !error ? setShowButtons(false) : console.log(error)
    }

    if (!logged_in_user) return <Image src={src || defaultImg} className={image_type} />

    return (
        <div className={`${image_type}__wrapper userImage-wrapper`}>
            <Image className={image_type} src={files ? URL.createObjectURL(files[0]) : src || defaultImg} alt="files" />
            {!showButtons ? <div {...getRootProps()} className="userImage__box flex-center">
                <input {...getInputProps({ className: 'dropzone' })} />
                <CustomButton icon="fa fa-camera" btn_class="btn-icon" />
            </div>
                :
                <GroupButton group_class="userImage__box justify-content-end">
                    <CustomButton icon="fa fa-check mr-2" btn_class="btn-icon" onClick={handleSave} />
                    <CustomButton icon="fa fa-close" btn_class="btn-icon btn-icon-red" onClick={handleCancel} />
                </GroupButton>
            }

        </div>
    )
}


export default ProfileImage



