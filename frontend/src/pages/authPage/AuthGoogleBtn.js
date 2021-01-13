import React from 'react';
import GoogleLogin from 'react-google-login';
import VerLine from '../../layout/VerLine';

const AuthGoogleBtn = ({ responseGoogle, responseFailure }) => (
    <section className="auth__google-wrapper">
        <VerLine text="or" />
        <div className="flex-center auth__google">
            <GoogleLogin
                clientId="560298780464-ek19t38smr3brkp2ckku7smdkdhv28rn.apps.googleusercontent.com"
                buttonText={`continue with google`}
                onSuccess={responseGoogle}
                onFailure={responseFailure}
                cookiePolicy='single_host_origin'
                className="auth__google-btn"
            />
        </div>

    </section>
)

export default AuthGoogleBtn