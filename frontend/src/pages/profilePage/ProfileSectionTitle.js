import React, { useContext } from 'react'
import ProfileContext from '../../context/Profile-context'

const ProfileSectionTitle = ({ title, children }) => {
    const { logged_in_user } = useContext(ProfileContext);
    return (
        <div className="profileTitle-wrapper flex-center">
            <h3 className="profileTitle gradient-text">{title}</h3>
            {logged_in_user && children}
            {/* {logged_in_user && <IconButton icon_class={icon_class} onClick={onClick} />} */}
        </div>
    )
}

export default ProfileSectionTitle
