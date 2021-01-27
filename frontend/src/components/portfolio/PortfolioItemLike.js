import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/Auth-context'
import CustomButton from '../../layout/button/CustomButton';
import CustomOverlay from '../../layout/CustomOverlay';

const PortfolioItemLike = ({ likes, docId }) => {
    const [values, setValues] = useState([]);
    const { user } = useContext(AuthContext);
    // const { post, error } = usePostData("likePortfolioItem", onCompleted)

    useEffect(() => {
        if (likes) setValues(likes)
    }, [likes])

    function toggleLike() {
        if (values.includes(user.username)) setValues(values.filter(like => like !== user.username))
        else setValues([...values, user.username]);
        // post({ variables: { docId, username: user.username } })
    }
    console.log(values)
    function onCompleted() {

    }


    return (
        <CustomOverlay content={values} trigger={['hover', 'focus']} placement="bottom">
            <CustomButton
                onClick={toggleLike}
                btn_class="btn-icon-text"
                icon={`fa ${values.includes(user.username) ? "fa-thumbs-o-up" : "fa-thumbs-up"}`} >
                {values.length || 0}
            </CustomButton>
        </CustomOverlay>
    )
}

export default PortfolioItemLike
