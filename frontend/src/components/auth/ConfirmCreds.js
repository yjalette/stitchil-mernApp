import React from 'react'
import { Modal } from 'react-bootstrap'

import CustomModal from '../../layout/CustomModal'
import LoginForm from './Login'

const ConfirmCreds = () => {
    return (
        <CustomModal
            modal_class="auth"
            modal_size="sm"
            modal_title="Login to continue"
            displayWithoutBtn={true}
        >
            <LoginForm confirmed={true} />
        </CustomModal>
    )
}

export default ConfirmCreds
