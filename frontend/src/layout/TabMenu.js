import React from 'react'
import { Row, Col, ListGroup, Tab } from 'react-bootstrap'

const TabMenu = ({ titles, items }) => {
    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#1">
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        {titles.map((title, i) => {
                            return (
                                <ListGroup.Item key={i} action href={`#${i}`}>
                                    {title}
                                </ListGroup.Item>
                            )
                        })}

                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        {items.map((item, i) => {
                            return (
                                <Tab.Pane key={i} eventKey={`#${i}`}>
                                    {item}
                                </Tab.Pane>
                            )
                        })}

                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default TabMenu
