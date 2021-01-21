import React from 'react';
import { Row } from 'react-bootstrap';

import { guarantees, howItWorks, questions, whyStitch, tagLines } from './consts';

import Guarantees from './Guarantees';
import CustomAccordion from '../../layout/CustomAccordion';
import Tagline from '../../layout/Tagline';
import RoundCard from '../../layout/card/RoundCard';


const HomePage = ({ display }) => (
    <div className="homepage">
        <Tagline title={tagLines[display]["Unique Everything"]} />
        {/* <ExploreMenu /> */}
        <Tagline title={tagLines[display]["How It Works"]} />
        <Row className="flex-center justify-content-around section-wrapper">
            {whyStitch[display].map(item => <RoundCard key={item.title} item={item} />)}
        </Row>
        <Tagline title={tagLines[display]["Secure shopping"]} />
        <Guarantees content={guarantees[display]} />
        <Tagline title={tagLines[display]["Have Questions?"]} />
        <CustomAccordion className="qa" items={questions[display]} />
    </div>
)

export default HomePage;


//  Buy directly from someone who put their heart and soul into making something special.