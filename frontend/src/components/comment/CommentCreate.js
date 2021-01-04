import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';

import AuthContext from '../../context/Auth-context';
import useForm from '../../custom_hooks/useForm';
import usePostData from '../../custom_hooks/usePostData';
import UserAvatar from '../../layout/media/UserAvatar';
import MessageForm from '../message/MessageForm';

const CommentCreate = ({ addComment, docId }) => {
    const { user } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "", subject: "" }, onSubmit);
    const { post } = usePostData("createComment", onPostCompleted);

    function onPostCompleted() {
        addComment({ message: inputs.message, sender: { profileImage: user.profileImage, username: user.username } });
        setInputs({ message: "", subject: "" });
    }

    function onSubmit() {
        post({ variables: { message: inputs.message, docId } })
    }

    console.log(inputs)

    return (
        <MessageForm onSubmit={handleSubmit} onChange={handleChange} message={inputs.message} msg_class="commentCreate">
            <Container className="commentItem__header">
                <UserAvatar profileImage={user.profileImage} username={user.username} />
            </Container>
        </MessageForm>

    )
}

export default CommentCreate;
