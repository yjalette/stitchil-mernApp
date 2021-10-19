import React from 'react'
import { Image } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import { SEND_USER_MESSAGE_MUTATION } from './graphql/mutations'
import useForm from '../../custom_hooks/useForm'
import useUpload from '../../custom_hooks/useUpload'
import CustomModal from '../../layout/CustomModal'
import MessageForm from '../message/MessageForm'
import CustomButton from '../../layout/button/CustomButton'

const UserSendMessage = ({ to_username }) => {
    const { files, clearUpload, getRootProps, getInputProps, uploadError, onUpload } = useUpload(3000000, 5);
    const { inputs, setInputs, handleChange, handleSubmit } = useForm({ message: "" }, onSubmit);
    const [post] = useMutation(SEND_USER_MESSAGE_MUTATION, {
        onCompleted: data => {
            if (data) {
                setInputs({ message: "" })
                clearUpload();
            }
        }
    })

    function onSubmit() {
        post({
            variables: {
                message: inputs.message,
                attachments: files,
                to_username
            }
        })
    }


    return (
        <CustomModal
            btn_class="btn-icon fas fa-comment"
            modal_title={`message ${to_username}`}
            modal_size="md"
        >
            <MessageForm inputs={inputs} onChange={handleChange} onSubmit={handleSubmit} >
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
        </CustomModal>
    )
}

export default UserSendMessage
