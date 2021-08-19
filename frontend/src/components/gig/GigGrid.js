import React from 'react'
import { Row, Col } from 'react-bootstrap';
import BoxWrapper from '../../layout/BoxWrapper';
import ListItem from '../../layout/ListItem';
import SectionHeader from '../../layout/SectionHeader'
import ThumbGallery from '../../layout/ThumbGallery';
import CustomForm from '../../layout/CustomForm'
import PackageDetails from '../package/PackageDetails'
import PackageSelect from '../package/PackageSelect';
import FabricItem from '../fabric/FabricItem';

const GigGrid = ({
    item,
    onSubmit,
    packages,
    selected_fabricId,
    selected_package_type,
    selected_shipping,
    handlePackage,
    handleFabric }) => {
    const total = packages && selected_package_type && packages.find(pack => selected_package_type === pack.type).price
    const selected_package = packages && packages.find(pack => pack.type === selected_package_type)

    return (
        <Row className="gigGrid">
            <Col xl={6} className="gigGrid__gallery">
                <ThumbGallery items={item.gallery} />
            </Col>
            <Col xl={6} className="gigGrid__description">
                <BoxWrapper>
                    <SectionHeader title={item.title.toUpperCase()} />
                    <ListItem field="about" content={item.description} />
                </BoxWrapper>
                <CustomForm
                    submitTitle={`continue $${total}`}
                    onSubmit={onSubmit}
                >
                    <BoxWrapper>
                        <PackageSelect
                            selected_package_type={selected_package_type}
                            packages_types={packages.map(pack => pack.type)}
                            onChange={handlePackage}
                        />
                        {selected_package && <PackageDetails
                            selected_package={selected_package}
                            fabric_selection={
                                <div>
                                    <ListItem field="fabric options" />
                                    <div className="gigGrid__fabrics">

                                        {selected_package.fabrics.map(fabric => {
                                            return <FabricItem
                                                key={fabric.name}
                                                mod_class={`gigGrid ${fabric._id === selected_fabricId && "selected"}`}
                                                selected_fabricId={selected_fabricId}
                                                selectFabric={() => handleFabric(fabric)}
                                                fabric={fabric} />
                                        })}
                                    </div>
                                </div>
                            }

                        />}
                    </BoxWrapper>
                    {selected_shipping && <BoxWrapper box_class="flex-center shippingDetails ">
                        <ListItem
                            field="shipping"
                            icon="fas fa-shipping-fast"
                            content={`${selected_shipping.shippingCarrier} 
                     ${selected_shipping.mailClass} +$${selected_shipping.shippingPrice}`} />
                    </BoxWrapper>}
                    <BoxWrapper>
                        <ListItem field="your total is " content={`$${total} + shipping`} />
                    </BoxWrapper>
                </CustomForm>
            </Col>
        </Row>
    )
}

export default GigGrid
