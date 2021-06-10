import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { emptyBox } from '../../constants/messages-user';
import AuthContext from '../../context/Auth-context';

const EmptyResultAlert = ({ type, alert_class, includeText }) => {
    const { user } = useContext(AuthContext);
    const { username } = useParams();
    return (
        <Container className={`emptyAlert flex-center flex-column p-5 w-100 h-100 ${alert_class}`}>
            <i className="fa fa-frown-o emptyAlert__icon" />
            <h5 className="emptyAlert__title">{emptyBox[type].title}</h5>
            { includeText && <p className="emptyAlert__text">{emptyBox[type].text[user === username ? "user" : "notUser"]}</p>}
        </Container>
    )
}

export default EmptyResultAlert