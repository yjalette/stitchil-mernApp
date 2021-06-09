import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router';
import AuthContext from '../../context/Auth-context';
import { LOGOUT_MUTATION } from './graphql/mutations';
import { useToggle } from '../../custom_hooks/useToggle';
import CustomModal from '../../layout/CustomModal';
import AuthLogin from './AuthLogin';
import SectionWrapper from '../../layout/SectionWrapper';
import PageWrapper from '../../layout/PageWrapper';

const AuthLogout = ({ history }) => {
    const [logout, setLogout] = useToggle(false);
    const [post] = useMutation(LOGOUT_MUTATION)
    const authContext = useContext(AuthContext);

    const handleClick = () => {
        post();
        authContext.logout();
        localStorage.removeItem('user')
        setLogout(true)
    }

    useEffect(() => {
        handleClick()
    }, [])

    return (
        <PageWrapper>
            <SectionWrapper>
                <CustomModal
                    modal_size="md"
                    modal_title="please login to continue"
                    onClose={() => history.push('/')}
                    displayWithoutBtn >
                    <AuthLogin />
                </CustomModal>
            </SectionWrapper>
        </PageWrapper>
    )
}

export default withRouter(AuthLogout);
