import React from 'react';
import { Row, Col } from 'react-bootstrap';

const goal = 'Our goal is to make bespoke clothing affordable and accessible for the masses, and to support independent designers and tailors. So-called "Fast Fashion" is built upon exploitative labor practices, and the clothing is of low quality which produces waste. We believe that convenient, high quality bespoke clothing that supports independent designers with a livable wage is a much more sustainable approach to fashion.'
const about = 'Stitchil connects people with fashion designers and provide a framework for ordering bespoke clothing, from design to creation. Customers can either choose a designer to work with directly, or put out a request for an item which designers will then bid on- the customer then chooses the most attractive bid (based on cost, time, etc.) and the winning designer begins work on the items. The app will be the middleman for this transaction, providing a portal for the customer to send measurements, see progress, and request alterations- all without leaving their home.'

const About = () => (
    <section className="">
        <Row className="">
            <Col sm={12} xl={6} className="flex-center flex-column py-4" >
                <h1>About Us</h1>
                <p className="text-light"><br />{about}<br /><br />{goal}</p>
            </Col>
            <Col sm={12} xl={6} className="">
                {/* <Image src={picture} alt="about_image" className="w-100 h-100" /> */}
            </Col>
        </Row>
    </section>
)



export default About;