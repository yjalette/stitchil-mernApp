import React from 'react'
import useSlides from '../../custom_hooks/useSlides';
import CustomButton from '../../layout/button/CustomButton';
import GroupButton from '../../layout/button/GroupButton';


const FormSteps = ({ steps }) => {
    const { activeIndex, handleBackward, handleForward } = useSlides(0, steps);

    return (
        <>
            {steps[activeIndex]}
            <GroupButton>
                {activeIndex !== 0 && <CustomButton onClick={handleBackward} icon="fa fa-arrow-left" btn_class="btn-icon btn-back" />}
                {activeIndex + 1 !== steps.length && <CustomButton onClick={handleForward} icon="fa fa-arrow-right" btn_class="btn-icon btn-forward" />}
            </GroupButton>
        </>
    )

}



export default FormSteps
