import React, { useEffect, useRef } from 'react'
import CustomAlert from '../../layout/CustomAlert';
import ChatMessageItem from './ChatMessageItem';

const ChatGrid = ({ messages, onMessageDelete, children }) => {
    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);
    return (
        <section className="messages__container">
            <div className="messages">
                {messages && messages.length > 0 ? messages
                    // .sort((a, b) => a.createdAt - b.createdAt)
                    .map((msg, i) => <ChatMessageItem key={i}
                        item={msg}
                        onMessageDelete={onMessageDelete} />)
                    : <CustomAlert alert_variant="info" alert_class="messages__alert">
                        <span>no message history yet</span>
                    </CustomAlert>
                }
                <div ref={divRef} />
            </div>
            {children}
        </section>
    )
}

export default ChatGrid



