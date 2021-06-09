import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Container } from 'react-bootstrap';

import AuthContext from '../../context/Auth-context';
import useForm from '../../custom_hooks/useForm';
// import MessageForm from '../message/MessageForm';
import UserAvatar from '../user/UserAvatar';
import { CREATE_COMMENT_MUTATION } from './graphql/mutations';

const CommentCreate = ({ mutation, otherVariables, OnCommentSent, children }) => {
    const { user } = useContext(AuthContext);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(mutation || CREATE_COMMENT_MUTATION, {
        onCompleted: (data) => {
            if (OnCommentSent) OnCommentSent(data);
            setInputs({ message: "" });
        }
    });

    function onSubmit() {
        post({
            variables: {
                message: inputs.message,
                ...otherVariables
            }
        })
    }

    return (<div>comment crwate</div>
        // <MessageForm
        //     onSubmit={handleSubmit}
        //     onChange={handleChange}
        //     inputs={inputs}
        //     msg_class="commentCreate">
        //     <Container className="commentItem__header">
        //         <UserAvatar
        //             profileImage={user.profileImage}
        //             username={user.username}
        //         />
        //     </Container>
        //     {children}
        // </MessageForm>

    )
}

export default CommentCreate;
