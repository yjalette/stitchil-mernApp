import React from 'react'
import PageWrapper from '../../layout/PageWrapper'

const ProfileItemPage = ({ children }) => {
    return (
        <PageWrapper mod_class="profileItem">
            {children}
        </PageWrapper>
    )
}

export default ProfileItemPage