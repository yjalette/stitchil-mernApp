import React from 'react'
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';


const buttonVariants = {
    hover: {
        // borderTopColor: ['#170535', '#170535', '#170535', '#170535'],
        // borderRightColor: [null, '#170535', '#170535', '#170535'],
        // borderBottomColor: [null, null, '#170535', '#170535'],
        borderColor: [null, '#f00', '#170535'],


    }
}

const ClickButton = ({ title, onClick }) => <motion.button
    // variants={buttonVariants}
    // whileHover="hover"
    // transition={{ duration: 2, times: [.4, .8, 1.2, 1.6] }}
    className="clickButton" onClick={onClick}>{title}</motion.button>


export default ClickButton
