import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import CustomButton from '../../layout/button/CustomButton'
import { form_names } from './constants';

const ItemFormNextStep = ({ group }) => {
    const { currForm } = useParams();
    const { pathname } = useLocation();
    const { push } = useHistory()
    const next_form = form_names[group][form_names[group].indexOf(currForm) + 1]
    return (
        <CustomButton
            btn_class="btn-text"
            onClick={() => push(pathname.replace(currForm, next_form))}>
            next step: {next_form}
        </CustomButton>
    )
}

export default ItemFormNextStep
