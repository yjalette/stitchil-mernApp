import React from 'react'
import CustomButton from '../../layout/button/CustomButton'
import FormGroup from '../inputs/FormGroup'
import FabricLibraryData from '../fabric/FabricLibraryData'
import GroupButton from '../../layout/button/GroupButton'
import FabricItem from '../fabric/FabricItem'

const PackageFormFabrics = ({ fabrics, addFabric, deleteFabric }) => {
    console.log(fabrics)
    const fabricButton = value => {
        const isSelected = fabrics && fabrics.length > 0 && fabrics.find(fabric => fabric._id === value._id);
        const toggleFunc = () => {
            isSelected
                ? deleteFabric(value._id)
                : addFabric(value)
        }
        return (
            <CustomButton
                btn_class={`btn-click position-center packageFormFabric__btn ${isSelected && "selected"}`}
                onClick={toggleFunc}
            ></CustomButton>
        )
    }


    return (
        <div className="packageFormFabric">
            <FormGroup
                label="fabrics "
                input_component={
                    fabrics && fabrics.length > 0 && fabrics.map((fabric, i) => {
                        return (
                            <FabricItem
                                key={fabric.name}
                                fabric={fabric}
                                mod_class="packageForm"
                            />
                        )
                    })
                }
            />
            <GroupButton group_class="justify-content-end">
                <FabricLibraryData fabricButton={fabricButton} />
            </GroupButton>

        </div>
    )
}

export default PackageFormFabrics
