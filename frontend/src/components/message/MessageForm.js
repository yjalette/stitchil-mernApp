import React from 'react';
import { Col, Form, Media, Row } from 'react-bootstrap';

import IconButton from '../../layout/buttons/IconButton';
import FormTextarea from '../inputs/FormTextarea';


const MessageForm = ({ message, onSubmit, onChange, children, msg_class }) => console.log(message) || (
    <Media className={`messageForm-wrapper ${msg_class}`}>
        <Form className="messageForm d-flex flex-column">
            {children}
            <Row className="flex-center messageForm__body">
                <Col xs={10}>
                    <FormTextarea label="message" value={message} placeholder="write here ..." onChange={onChange} />
                </Col>
                <Col xs={2}>
                    <IconButton onClick={onSubmit} icon_class="fa fa-paper-plane ml-3" />
                </Col>
            </Row>
        </Form>
    </Media>
)

export default MessageForm;




