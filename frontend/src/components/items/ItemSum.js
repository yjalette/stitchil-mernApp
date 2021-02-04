import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import CustomButton from '../../layout/button/CustomButton';
import ListItem from '../../layout/ListItem';

const ItemSum = ({ itemId, header, highlights, coverImage, sideMenu }) => {
    const { section } = useParams();
    const { push } = useHistory();
    return (
        <Card className="itemSum">
            <Card.Header>
                <Card.Title className="itemSum__title" >
                    <CustomButton btn_class="btn-icon-text" icon="fa fa-angle-double-right" onClick={() => push(`/view-${section}-item/${itemId}`)}>
                        {header.title}
                    </CustomButton>
                </Card.Title>
                {header.other}
            </Card.Header>
            <Card.Body className="itemSum__body" >
                <Card.Img className="itemSum__img" src={coverImage} />
                <Container className="itemSum__overlay">
                    <div className="itemSum__menu">
                        {sideMenu}
                    </div>
                    {/* <CustomButton btn_class="btn-click">details</CustomButton> */}
                </Container>
            </Card.Body>
            <Card.Footer className="itemSum__footer" >{highlights.map((item, index) => <ListItem key={index} {...item} />)}</Card.Footer>
        </Card>
    )
}

export default ItemSum
