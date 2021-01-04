import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/Auth-context'
import usePostData from '../../custom_hooks/usePostData';
import IconTextButton from '../../layout/buttons/IconTextButton';
import CustomOverlay from '../../layout/CustomOverlay';

const PortfolioItemLike = ({ likes, docId }) => {
    const [values, setValues] = useState([]);
    const { user } = useContext(AuthContext);
    const { post, error } = usePostData("likePortfolioItem", onCompleted)

    useEffect(() => {
        if (likes) setValues(likes)
    }, [likes])

    function toggleLike() {
        if (values.includes(user.username)) setValues(values.filter(like => like !== user.username))
        else setValues([...values, user.username]);
        post({ variables: { docId, username: user.username } })
    }
    console.log(values)
    function onCompleted() {

    }


    return (
        <CustomOverlay content={values} trigger={['hover', 'focus']} placement="bottom">
            <IconTextButton
                onClick={toggleLike}
                title={values.length || 0}
                btn_class=""
                icon={`fa ${values.includes(user.username) ? "fa-thumbs-o-up" : "fa-thumbs-up"}`} />
        </CustomOverlay>
    )
}

export default PortfolioItemLike
