import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPLOAD_FILES_MUTATION } from './graphql/mutations';
import PictureZoom from '../pictures/PictureZoom';
import CustomButton from '../../layout/button/CustomButton';
import CustomModal from '../../layout/CustomModal';
import useUpload from '../../custom_hooks/useUpload';
import "./style.css"

const FileMultiUpload = ({ docId, overLimit, onCompleted }) => {
    const { files, clearUpload, getRootProps, getInputProps, uploadError } = useUpload(3000000, 5);
    const [post, { error }] = useMutation(UPLOAD_FILES_MUTATION, {
        onCompleted: async (data) => {
            if (data) {
                await onCompleted(data.uploadFiles)
                return clearUpload()
            }
        }
    })

    const handleSave = () => {
        post({
            variables: {
                docId,
                files
            }
        })
    }

    if (files && !!files.length) {
        return (
            <CustomModal
                modal_size="sm"
                modal_title="new uploads"
                displayWithoutBtn
                onClose={clearUpload}
            >
                <div className="fileList">
                    <div className="error">{uploadError}</div>
                    {files &&
                        files.map((file, index) =>
                            < div key={index} className="file-upload-wrapper">
                                <PictureZoom elem_class="fileUpload__img" url={URL.createObjectURL(file)} />
                                <CustomButton
                                    btn_class="fas fa-times btn-icon-text red m-auto"
                                    onClick={() => clearUpload(index)} >cancel</CustomButton>
                            </div>)}
                </div>
                <CustomButton
                    btn_class="btn-form mt-5"
                    onClick={handleSave}
                >save uploads</CustomButton>
            </CustomModal>
        )
    }
    return (

        // <Container>
        //     {saved && <ActionStatus status="success" />}
        //     {error && <ActionStatus status="error" />}
        // </Container>
        <>

            {!overLimit ?
                <div {...getRootProps()} className="file-upload-wrapper">
                    <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
                    {/* <div className="fileUpload__icon">
                    </div> */}
                    <CustomButton
                        btn_class="btn-icon fas fa-upload mx-2"
                        btn_otherProps={{
                            title: "upload"
                        }}
                    />

                </div>
                :
                <h5>you have reached the limit of uploads.</h5>
            }

        </>
    )
}

export default FileMultiUpload
