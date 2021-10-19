import React, { useEffect } from 'react';
import { useState } from 'react';
import { Image } from "react-bootstrap";
import FileDelete from './FileDelete';

const FileMultiUpdate = ({ prevFiles, updateQuery }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (prevFiles) setFiles(prevFiles)
    }, [prevFiles]);

    const handleDelete = id => {
        setFiles(files
            .filter(file => file._id !== id)
        )
    }

    return (
        <div className="fileMultiUpdate__wrap">
            {files &&
                files.length > 0 &&
                files.map((file, index) => {
                    return (
                        <div key={file._id} className="fileMultiUpdate" >
                            <Image src={file.url} className="thumb" alt="files img" />
                            <FileDelete
                                index={index}
                                public_id={file.public_id}
                                onDelete={() => handleDelete(file._id)}
                            />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default FileMultiUpdate
