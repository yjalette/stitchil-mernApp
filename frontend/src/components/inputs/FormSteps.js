
import React from 'react'
import useSlides from '../../custom_hooks/useSlides';
import CustomButton from '../../layout/button/CustomButton';

const FormSteps = ({ steps }) => {
    const { activeIndex, handleBackward, handleForward } = useSlides(0, steps);
    return (
        <>
            {steps[activeIndex]}
            <div className="formSteps__buttons">
                {activeIndex !== 0 && <CustomButton onClick={handleBackward} icon="fa fa-arrow-left" btn_class="btn-icon-text btn-back">go back</CustomButton>}
                {activeIndex + 1 !== steps.length &&
                    <CustomButton onClick={handleForward} icon="fa fa-arrow-right" btn_class="btn-icon-text btn-forward">
                        continue
                    </CustomButton>}
            </div>
        </>
    )

}



export default FormSteps
