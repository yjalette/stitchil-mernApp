import React from 'react'
import BoxWrapper from '../../layout/BoxWrapper'
import ListItem from '../../layout/ListItem';
import FabricData from '../fabric/FabricData';
import FabricItem from '../fabric/FabricItem';

const PackageOptions = ({ packages, active_package }) => {
    console.log(active_package)
    // const pack_types = packages.map(pack => pack.type)
    // const { setActiveIndex, activeIndex } = useSlides(
    //     0, pack_types
    //     , { pagination: true });

    // const handleSlide = package_type => {
    //     const index = pack_types.findIndex(pack_type => pack_type === package_type);
    //     setActiveIndex(index)
    // }

    return (
        <>
            {/* <CustomMenu
                items={pack_types}
                handleClick={handleSlide}
                activeComponent={pack_types[activeIndex]}
                nav_class="vertical"
            ></CustomMenu> */}
            {/* <CustomDropdown
                btn_title="packages"
                items={pack_types}
                dropdown_item={(item, index) => {
                    return <DropdownItem key={index}>{item}</DropdownItem>
                }}>

            </CustomDropdown> */}

            {active_package && <BoxWrapper>
                <ListItem field="price" content={`$${active_package.price}`} />
                <ListItem field="delivery" content={`${active_package.delivery} days`} />
                <ListItem field="fabric options">
                    <FabricData
                        ids={active_package.fabrics}
                        childComponent={(fabrics) => {
                            fabrics && fabrics.map((fabric, i) => {
                                return (
                                    <FabricItem
                                        fabric={fabric} />
                                )
                            })

                        }} />
                </ListItem>
            </BoxWrapper>}
        </>
    )
}

export default PackageOptions
