import React from 'react';
import { Col, Row, Image, Container } from 'react-bootstrap';
import CustomButton from '../../layout/button/CustomButton';
import Heroimage from './Heroimage';

const HeroBox = ({ onClick }) => {
        return (
                <Container fluid className="landing__herobox herobox__wrapper blurred-box">
                        <Row className="herobox">
                                <Col lg={8} md={7} sm={12} className="flex-center flex-column herobox__col ">
                                        <section className="landing__content ">
                                                <h1 className="landing__title gradient-text">
                                                        From Design To Creation
                                        </h1>
                                                <span className="landing__subtitle subtitle"> Create clothing you'll love to wear. </span>
                                                <div className="herobox__btn-group">
                                                        <CustomButton
                                                                btn_class="btn-click"
                                                                onClick={() => onClick("buyers")} >learn more</CustomButton>
                                                        <CustomButton
                                                                btn_class="btn-click"
                                                                onClick={() => onClick("designers")} >designers</CustomButton>
                                                </div>
                                        </section>

                                        <div className="herobox__footer">
                                                <Image src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105434/homepage/ilustration_pkvf52.svg" alt="heroimage" className="heroimage herobox__footer-img" />
                                        </div>
                                </Col>
                                <Col lg={4} md={5} sm={12} className="heroimage__col herobox__col flex-center"  >
                                        <Heroimage />
                                </Col>
                        </Row>
                </Container >
        )
}

export default HeroBox;

