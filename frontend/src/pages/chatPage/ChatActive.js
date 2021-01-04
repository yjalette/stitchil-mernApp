import React, { useRef, useContext, useEffect, useState } from 'react'

import MessageItem from '../../components/message/MessageItem'
import AuthContext from '../../context/Auth-context';

const ChatActive = ({ chat }) => {
    const divRef = useRef(null);
    const { user } = useContext(AuthContext);
    // const [chat, setChat] = useState(null)

    // useEffect(() => {
    //     if (currChat) setChat(currChat)
    // }, [currChat])

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    return (

        <section className="chatActive__messages">
            {chat && chat.messages
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((msg, i) => (
                    <div className="chatActive__msg__wrapper" key={i}>
                        < MessageItem item={msg} comp_class={`${msg.sender.username === user.username && "chatActive-user"} chatActive__msg`} />
                    </div>
                ))}
            <div ref={divRef} />
        </section>


    )
}

export default ChatActive
