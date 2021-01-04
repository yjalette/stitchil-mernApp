import React from 'react'
import { Row, Col } from 'react-bootstrap'

import UserAvatar from '../../components/user/UserAvatar'
import SearchBox from '../../components/inputs/SearchBox'


const ChatHeader = ({ chatUser, onSearch }) => {
    console.log(chatUser)
    return (
        <Row className="chatHeader">
            <Col lg={4}>
                {chatUser && <SearchBox onClick={onSearch} />}
            </Col>
            <Col lg={8}>
                {chatUser && <UserAvatar username={chatUser.username} profileImage={chatUser.profileImage} />}
            </Col>
        </Row>


    )
}

export default ChatHeader
