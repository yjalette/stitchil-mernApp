import React from 'react'
import PageWrapper from '../../layout/PageWrapper'

const ProfileItemPage = ({ children }) => {
    return (
        <PageWrapper page_class="profile-item">
            {children}
        </PageWrapper>
    )
}

export default ProfileItemPage