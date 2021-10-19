import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { Container, Image } from 'react-bootstrap';
import { SEND_MESSAGE_MUTATION } from './graphql/mutations';
import useForm from '../../custom_hooks/useForm';
import useUpload from '../../custom_hooks/useUpload';
import AuthContext from '../../context/Auth-context';
import ChatContext from '../../context/Chat-context';
import MessageForm from './MessageForm';
import CustomButton from '../../layout/button/CustomButton';

const MessageSend = ({ chatId }) => {
    const { user } = useContext(AuthContext)
    const { files, clearUpload, getRootProps, getInputProps, uploadError, onUpload } = useUpload(3000000, 5);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(SEND_MESSAGE_MUTATION, {
        onCompleted: async ({ sendMessage }) => {
            if (sendMessage) {
                setInputs({ message: "" });
                clearUpload();
            }

        }
    });

    function onSubmit() {
        post({
            variables: {
                message: inputs.message,
                attachments: files,
                chatId
            }
        })
    }

    console.log(files)

    return <MessageForm inputs={inputs} onChange={handleChange} onSubmit={handleSubmit} >
        <div {...getRootProps()} className="item-upload-wrapper pl-5 pt-3">
            <CustomButton
                btn_class="fa fa-paperclip btn-icon-text align-self-start "
            >attach</CustomButton>
            <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
            <div className="d-flex">
                {files &&
                    files[0] &&
                    files.map((file, index) =>
                        < div key={index} className="item-upload-wrapper">
                            <Image src={URL.createObjectURL(file)} className="message__img--thumb" />
                            <CustomButton
                                btn_class="fas fa-times btn-icon-text red"
                                onClick={() => clearUpload(index)} />
                        </div>
                    )
                }
            </div>
        </div>
    </MessageForm>
}

export default MessageSend;




// import React, { useContext } from 'react';
// import { useMutation } from '@apollo/react-hooks';
// import { useParams } from 'react-router';
// import { SEND_CHAT_MESSAGE_MUTATION } from './graphql/mutations';
// import useForm from '../../custom_hooks/useForm';
// import MessageSendForm from './MessageSendForm';
// import AuthContext from '../../context/Auth-context';

// const MessageSend = ({ chatId, updateCacheNewChat }) => {
//     const { user } = useContext(AuthContext)
//     const { username } = useParams();
//     const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
//     const [post] = useMutation(SEND_CHAT_MESSAGE_MUTATION, {
//         onCompleted: async ({ send_chat_message }) => {
//             if (send_chat_message) {
//                 if (!chatId) updateCacheNewChat({
//                     _id: send_chat_message.chatId,
//                     chatId: send_chat_message.chatId,
//                     member: username,
//                     lastMessages: [send_chat_message]
//                 })
//                 setInputs({ message: "" });
//             }

//         }
//     });

//     function onSubmit() {
//         post({
//             variables: {
//                 message: inputs.message,
//                 chatId,
//                 to_username: username,
//                 from_username: user.username
//             }
//         })
//     }

//     return <MessageSendForm
//         inputs={inputs}
//         onChange={handleChange}
//         onSubmit={handleSubmit} />
// }

// export default MessageSend;
