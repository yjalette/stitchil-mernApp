import React from 'react';
import { Image } from "react-bootstrap";
import PictureZoom from '../../../components/pictures/PictureZoom';

const ItemUpload = ({ files, prevFiles, clearUpload, getRootProps, getInputProps }) => {
    console.log(files)
    return (
        <>
            <div className="itemUpload__list">
                {prevFiles && prevFiles.map((prevFile, index) => <Image key={index} className="itemUpload__img itemUpload__prev" src={prevFile} alt="file" />)}
                < div {...getRootProps()} className="itemUpload__wrapper">
                    {files && files.map((file, index) => <div key={index} className="itemUpload">
                        {console.log(typeof file)}
                        <PictureZoom elem_class="itemUpload__img" imageUrl={URL.createObjectURL(file)} />
                        <i className="fa fa-close itemFile__cancel" onClick={() => clearUpload(index)} />
                    </div>)}
                    <div className="itemUpload__box">
                        <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
                        <Image src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/upload-icon_eqsr6c.svg" className="upload__icon" alt="icon upload" />
                    </div>
                </div>

                {/* {isDragReject && <InlineAlert variant="warning" content="File type not accepted, sorry!" />}
            {isFileTooLarge && <InlineAlert variant="warning" content="File is too large" />} */}

            </div>

        </>
    )
}

export default ItemUpload
