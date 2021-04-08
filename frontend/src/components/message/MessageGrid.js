import React, { useContext, useRef, useEffect } from 'react'
import MessageItem from './MessageItem';
import AuthContext from '../../context/Auth-context';
import CustomAlert from '../../layout/CustomAlert';

const MessageGrid = ({ messages, children }) => {
    const { user } = useContext(AuthContext);
    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });
    return (
        <>
            <div className="messages">
                {messages && messages.length > 0 ? messages
                    // .sort((a, b) => a.createdAt - b.createdAt)
                    .map((msg, i) => (
                        <div className="messages__msg__wrapper" key={i}>
                            < MessageItem item={msg} comp_class={`${msg.sender === user.username && "messageItem-user"}`} />
                        </div>
                    ))
                    :
                    <CustomAlert alert_variant="info" alert_class="messages__alert">
                        <span>no message history yet</span>
                    </CustomAlert>
                }
                <div ref={divRef} />
            </div>
            {children}
        </>
    )
}

export default MessageGrid
