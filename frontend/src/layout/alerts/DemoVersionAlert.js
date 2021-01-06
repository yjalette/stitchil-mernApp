import React, {useEffect, useState} from 'react'
import { Jumbotron } from 'react-bootstrap'
import {withRouter} from 'react-router-dom';
import CustomModal from '../CustomModal'

const DemoVersionAlert = ({history}) => {
    const [show, setShow] =  useState(true);

    useEffect(() => {
       setTimeout(()=> {
        setShow(false);
        // history.goBack();
       }, 5000)
    }, [])

    if(!show) return null

    return (
        <CustomModal modal_class="alertDemo" modal_size="sm" displayWithoutBtn={true}>
            <Jumbotron className="alertDemo__box">
            <h3 className="alertDemo__text">Sorry! This content is not accessible in the demo</h3>
            </Jumbotron>
        </CustomModal>
            
    )
}

export default withRouter(DemoVersionAlert);
