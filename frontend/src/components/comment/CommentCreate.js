import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Container } from 'react-bootstrap';

import AuthContext from '../../context/Auth-context';
import useForm from '../../custom_hooks/useForm';
import MessageForm from '../message/MessageForm';
import UserAvatar from '../user/UserAvatar';
import { CREATE_COMMENT_MUTATION } from './graphql/mutations';

const CommentCreate = ({ addComment, docId }) => {
    const { user } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "", subject: "" }, onSubmit);
    const [post] = useMutation(CREATE_COMMENT_MUTATION, {
        onCompleted: (data) => {
            addComment({ message: inputs.message, sender: { profileImage: user.profileImage, username: user.username } });
            setInputs({ message: "", subject: "" });
        }
    });

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
