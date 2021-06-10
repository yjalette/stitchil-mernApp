import React from 'react';
import { Alert } from 'react-bootstrap';

const InlineAlert = ({ content, variant, alert_class, timeOut }) => <Alert variant={variant} className={`${alert_class} inlineAlert`}>{content}</Alert>

export default InlineAlert