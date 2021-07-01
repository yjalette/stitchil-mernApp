import React from 'react'
import { Form, Image } from 'react-bootstrap'
import CustomButton from '../../layout/button/CustomButton'
import FormGroup from '../inputs/FormGroup'
import SwatchLibraryData from '../swatch/SwatchLibraryData'
import GroupButton from '../../layout/button/GroupButton'
import CustomPopover from '../../layout/CustomPopover'

const PackageFormSwatches = ({ swatches, addSwatch, deleteSwatch }) => {

    const swatchButton = value => {
        const isSelected = swatches && swatches.length > 0 && swatches.find(swatch => swatch._id === value._id);
        const btn_title = isSelected ? "deselect" : "select"
        const toggleFunc = () => {
            isSelected
                ? deleteSwatch(value._id)
                : addSwatch(value)
        }
        return (
            <CustomButton
                btn_class={`btn-click mt-2 ${isSelected && "red"}`}
                onClick={toggleFunc}
            >{btn_title}</CustomButton>
        )
    }

    return (
        <div className="packageFormSwatches">
            <FormGroup
                label="swatches: "
                input_component={swatches &&
                    swatches.length > 0 &&
                    swatches.map((swatch, index) => {
                        console.log(swatch)
                        return (
                            <Form.Label key={index} className="ml-2 d-flex">
                                <Image src={swatch.image} className="packageFormSwatches__img" />
                            </Form.Label>
                        )
                    })
                } />
            <GroupButton group_class="justify-content-end">
                <SwatchLibraryData swatchButton={swatchButton} />
            </GroupButton>

        </div>
    )
}

export default PackageFormSwatches
