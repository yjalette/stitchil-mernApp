import React, { useEffect, useState } from 'react';

import "./style.css"
import useGetData from '../../custom_hooks/useGetData';
import MessageItem from './MessageItem';

const MessageData = ({ docId, messages_class }) => {
    const { getData, resData } = useGetData("getmessages");
    const [values, setValues] = useState([])

    useEffect(() => {
        if (docId) getData({ variables: { docId } })
    }, [docId]);


    useEffect(() => {
        if (resData) setValues(resData.getMessages)
    }, [resData]);

    const handleNewMessage = newMessage => {
        setValues([
            newMessage,
            ...values
        ])
    }

    return (
        <div className={`${messages_class} messages`}>
            <div className="message__list">
                {values && values.length > 0 && values.map((item, index) => <MessageItem key={index} item={item} />)}
            </div>
            {/* <MessageCreate docId={docId} addMessage={handleNewMessage} /> */}
        </div>
    )
}

export default MessageData;


