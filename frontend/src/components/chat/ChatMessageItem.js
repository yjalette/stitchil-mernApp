import React, { useContext } from 'react'
import { Media } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks';
import { DELETE_CHAT_MESSAGE_MUTATION } from './graphql/mutations';
import CustomButton from '../../layout/button/CustomButton';
import AuthContext from '../../context/Auth-context';
import dateHelper from '../../helpers/dateHelper';
import CustomDropdown from '../../layout/CustomDropdown';

const ChatMessageItem = ({ item, onMessageDelete }) => {
    const { user } = useContext(AuthContext);
    const logged_in_user = item.sender.username === user.username
    const [post] = useMutation(DELETE_CHAT_MESSAGE_MUTATION);

    const handleDelete = (messageId) => {
        post({
            variables: { messageId }
        })
        onMessageDelete(messageId)
    }
    return (
        <div className="messageItem__wrapper">
            <Media className={`messageItem ${logged_in_user && "sender"}`}>
                <Media.Body className="messageItem__body">
                    <span className="messageItem__msg">{item.message}</span>
                    {logged_in_user &&
                        <CustomDropdown
                            menu_class="messageItem_menu"
                            btn_class="btn-icon-text fas fa-ellipsis-h"
                            items={["delete"]}
                            dropdown_item={(dropdown_item) =>
                                <CustomButton
                                    key={dropdown_item}
                                    btn_class="btn-text red"
                                    onClick={() => handleDelete(item._id)}>
                                    {dropdown_item}
                                </CustomButton>}
                        />}
                </Media.Body>

                <span className="messageItem__date time_date">{item.createdAt ? dateHelper(item.createdAt) : "just now"} </span>
            </Media>
        </div>
    )
}

export default ChatMessageItem
