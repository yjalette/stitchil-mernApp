import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { measurements } from '../homePage/consts';

const Instructions = () => {
    const [gender, setGender] = useState('male');

    const [options, selectOption] = useState({
        title: "",
        content: ""
    });

    const handleSwitch = e => {
        setGender(e.target.value)
    }

    const handleSelect = e => {
        selectOption({
            [e.target.name]: e.target.value
        })

    }

    const picture = gender === "female" ? "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105666/measurements/female_howtomeasure_v5k7sx.png" : "https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105629/measurements/male_howtomeasure_lp1pik.png";



    // console.log(myObj)
    return (
        <Row className="p-3">
            <Col md={6} className="flex-center">
                <img src={picture} alt="measurements" className="measurements-img" />
            </Col>
            <Col md={6} className="flex-center flex-column">
                <div className="d-flex">
                    {['male', 'female'].map(value => (
                        <label className="p-2" key={value}>
                            <input type="radio" name="gender" value={value} onChange={handleSwitch} checked={gender === value} />{value}
                        </label>
                    ))}
                </div>
                <div className="d-flex">
                    <select name="title" onChange={handleSelect}>
                        {measurements[gender].map(category => <option value={category.title} key={category.title}>{category.title}</option>)}
                    </select>
                </div>
                <span>{options.title ? Object.values(measurements[gender].find(obj => obj.title === options.title))[1] : measurements[gender][0].content}</span>
            </Col>

        </Row>
    )
}

export default Instructions
