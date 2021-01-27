import React from 'react'
import useSlides from '../../custom_hooks/useSlides';
import CustomButton from '../../layout/button/CustomButton';
import GroupButton from '../../layout/button/GroupButton';


const FormSteps = ({ steps }) => {
    const { activeIndex, handleBackward, handleForward } = useSlides(0, steps)
    return (
        <>
            {steps[activeIndex] || null}
            <GroupButton>
                <CustomButton onClick={handleBackward} icon="fa fa-arrow-left" btn_class="btn-icon" />
                <CustomButton onClick={handleForward} icon="fa fa-arrow-right" btn_class="btn-icon" />
            </GroupButton>
        </>
    )

}



export default FormSteps
