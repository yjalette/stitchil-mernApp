import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useToggle } from '../../custom_hooks/useToggle';
import { UPLOAD_FILES_MUTATION } from './graphql/mutations';
import PictureZoom from '../pictures/PictureZoom';
import CustomButton from '../../layout/button/CustomButton';
import useUpload from '../../custom_hooks/useUpload';
import "./style.css"

const FileMultiUpload = ({ docId, overLimit, updateQuery }) => {
    const [saved, setSaved] = useToggle(false);
    const { files, clearUpload, getRootProps, getInputProps, uploadError } = useUpload(3000000, 5);
    const [post, { error }] = useMutation(UPLOAD_FILES_MUTATION, {
        onCompleted: async (data) => {
            if (data) {
                updateQuery && updateQuery(data)
                setSaved(true)
            }
        }
    })

    const handleSave = () => {
        console.log(docId, files)
        post({
            variables: {
                docId,
                files
            }
        })
    }
    return (

        // <Container>
        //     {saved && <ActionStatus status="success" />}
        //     {error && <ActionStatus status="error" />}
        // </Container>
        <>
            <div className="error">{uploadError}</div>
            <div className="fileList">
                {files &&
                    files.map((file, index) =>
                        < div key={index} className="file-upload-wrapper">
                            <PictureZoom elem_class="fileUpload__img" url={URL.createObjectURL(file)} />
                            <CustomButton
                                btn_class="fas fa-times btn-icon-text red m-auto"
                                onClick={() => clearUpload(index)} >cancel</CustomButton>
                        </div>)}
                {!overLimit &&
                    <div {...getRootProps()} className="file-upload-wrapper">
                        <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
                        <div className="fileUpload__icon">
                        </div>
                    </div>}
            </div>
            {files &&
                !!files.length &&
                <CustomButton
                    btn_class="btn-form mt-5"
                    onClick={handleSave}
                >save </CustomButton>}
        </>
    )
}

export default FileMultiUpload
