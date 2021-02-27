import React, { useRef, useContext, useEffect, useState } from 'react'

import MessageItem from '../../components/message/MessageItem'
import AuthContext from '../../context/Auth-context';

import { UPDATE_CHAT_MUTATION } from './graphql/mutations'
import MessageGrid from '../../components/message/MessageGrid';
import { CHATS_QUERY } from './graphql/queries';
import MessageData from '../../components/message/MessageData';
import MessageCreate from '../../components/message/MessageCreate';

const ChatActive = ({ chat, addMessage }) => {
    // const divRef = useRef(null);
    // const { user } = useContext(AuthContext);
    // const [chat, setChat] = useState(null)

    // useEffect(() => {
    //     if (currChat) setChat(currChat)
    // }, [currChat])

    // useEffect(() => {
    //     divRef.current.scrollIntoView({ behavior: 'smooth' });
    // });


    return <MessageData docId={chat._id}>
        <MessageCreate otherVariables={{ docId: chat._id }} query={UPDATE_CHAT_MUTATION} onMessageSent={addMessage} />
    </MessageData>
}

export default ChatActive

{/* <>
<section className="chatActive__messages">
    {chat && chat.messages
        // .sort((a, b) => a.createdAt - b.createdAt)
        .map((msg, i) => (
            <div className="chatActive__msg__wrapper" key={i}>
                < MessageItem item={msg} comp_class={`${msg.sender.username === user.username && "chatActive-user"} chatActive__msg`} />
            </div>
        ))}
    <div ref={divRef} />
</section>

</> */}
