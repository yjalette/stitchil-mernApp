import React from 'react';
import { Col, Form, Media, Row } from 'react-bootstrap';
import CustomButton from '../../layout/button/CustomButton';
import FormTextarea from '../inputs/FormTextarea';

const MessageForm = ({ message, onSubmit, onChange, children, msg_class }) => console.log(message) || (
    <Media className={`messageForm-wrapper ${msg_class}`}>
        {children}
        <Form className="messageForm d-flex flex-column">
            <Row className="flex-center messageForm__body">
                <Col xs={10}>
                    <FormTextarea label="message" value={message} placeholder="write here ..." onChange={onChange} />
                </Col>
                <Col xs={2}>
                    <CustomButton onClick={onSubmit} btn_class="btn-icon ml-3" icon="fa fa-paper-plane" />
                </Col>
            </Row>
        </Form>
    </Media>
)

export default MessageForm;




