import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap';
import MessageItem from './MessageItem';
import "./style.css"

const MessageList = ({ messages }) => {
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <Container className="messages">
                {messages && messages.length > 0 ? messages
                    // .sort((a, b) => a.createdAt - b.createdAt)
                    .map((msg, i) => <MessageItem key={i} item={msg} />)
                    : <></>
                }
                <div ref={divRef} />
            </Container>
        </>
    )
}

export default MessageList
