import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { SEND_CHAT_MESSAGE_MUTATION } from './graphql/mutations';
import useForm from '../../custom_hooks/useForm';
import useUpload from '../../custom_hooks/useUpload';
import AuthContext from '../../context/Auth-context';
import ChatContext from '../../context/Chat-context';
import MessageForm from '../message/MessageForm';
import { Image } from 'react-bootstrap';
import CustomButton from '../../layout/button/CustomButton';

const ChatSendMessage = () => {
    const { user } = useContext(AuthContext)
    const { chat, updateCache } = useContext(ChatContext)
    console.log(chat)
    const { files, clearUpload, getRootProps, getInputProps, uploadError, onUpload } = useUpload(3000000, 5);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(SEND_CHAT_MESSAGE_MUTATION, {
        onCompleted: async ({ sendChatMessage }) => {
            if (sendChatMessage) {
                updateCache(sendChatMessage)
                setInputs({ message: "" });
            }

        }
    });

    function onSubmit() {
        post({
            variables: {
                message: inputs.message,
                chatId: chat._id,
                from_username: user.username
            }
        })
    }

    return <MessageForm inputs={inputs} onChange={handleChange} onSubmit={handleSubmit} >
        <>

            <div {...getRootProps()} className="item-upload-wrapper">
                <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
                {files && files[0] &&
                    < div className="item-upload-wrapper">
                        <Image src={URL.createObjectURL(files[0])} className="fabricUpload__img" />
                        <CustomButton
                            btn_class="fas fa-times btn-icon-text red"
                            onClick={() => clearUpload(0)} />
                    </div>

                }
                <CustomButton
                    btn_class="fa fa-paperclip btn-icon-text "
                    onClick={() => onUpload(files)} />
            </div>
        </>
    </MessageForm>
}

export default ChatSendMessage;
