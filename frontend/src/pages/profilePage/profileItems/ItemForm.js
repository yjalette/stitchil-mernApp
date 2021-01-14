import React, { useContext } from 'react';

import ProfileItemContext from '../../../context/ProfileItem-context';
import useSlides from '../../../custom_hooks/useSlides';
import CustomForm from '../../../layout/CustomForm';
import CustomModal from '../../../layout/CustomModal'

const ItemForm = ({ form_title, onSubmit, onCancel, form_props }) => {
    const { comp } = useContext(ProfileItemContext);
    const { activeIndex, handleBackward, handleForward } = useSlides(0, comp.ItemFormParts(form_props))

    return (

        <CustomModal
            modal_title={form_title}
            modal_class="itemForm-modal"
            modal_size="lg"
            onClose={onCancel}
            displayWithoutBtn={true}
            modal_footer={(
                <div className="itemForm__controllers">
                    {activeIndex !== 0 && <i onClick={handleBackward} className="fa fa-long-arrow-left clickText" />}
                    {activeIndex !== comp.ItemFormParts(form_props).length - 1 && <i onClick={handleForward} className="fa fa-long-arrow-right clickText" />}
                    {/* {activeIndex !== 0 && <IconButton onClick={handleBackward} icon_class="fa fa-arrow-left" />}
                    {activeIndex !== comp.ItemFormParts(form_props).length - 1 && <IconButton onClick={handleForward} icon_class="fa fa-arrow-right" />} */}
                </div>
            )}>
            <CustomForm form_class={`itemForm ${activeIndex !== comp.ItemFormParts(form_props).length - 1 && "hideButtons"}`}
                submitTitle="save"
                onSubmit={onSubmit}
                onCancel={onCancel}>
                {comp.ItemFormParts(form_props)[activeIndex]}
            </CustomForm>
        </CustomModal>
    )
}

export default ItemForm


