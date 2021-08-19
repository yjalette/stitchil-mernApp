import React from 'react'
import FormGroup from '../inputs/FormGroup'
import SelectInput from '../inputs/SelectInput'

const PackageSelect = ({ selected_package_type, packages_types, onChange }) => {
    return (
        <FormGroup label="package" input_component={packages_types &&
            selected_package_type &&
            <SelectInput
                defaultValue={selected_package_type}
                options={packages_types}
                input_props={{
                    value: selected_package_type || "",
                    name: "selected_package_type",
                    onChange: onChange
                }}
            />} />
    )
}

export default PackageSelect
