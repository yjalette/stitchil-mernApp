import React, { useContext } from 'react'
import { Row, Tab, Col, Nav } from 'react-bootstrap'
import ListingContext from '../../context/Listing-context'
import BoxWrapper from '../../layout/BoxWrapper'
import AttributesCreate from '../attributes/AttributesCreate'
import FileMultiUpdate from '../file/FileMultiUpdate'
import FileMultiUpload from '../file/FileMultiUpload'
import ListingPublish from '../listing/ListingPublish'
import ProductUpdate from '../product/ProductUpdate'
import ShippingCreate from '../shipping/ShippingCreate'
import ShippingUpdate from '../shipping/ShippingUpdate'
import VariationCreate from '../variation/VariationCreate'
import VariationUpdate from '../variation/VariationUpdate'
import "./style.css"

const GigForms = () => {
    const {
        state,
        updateQuery } = useContext(ListingContext);

    if (!state) return <div>...loading</div>;
    return (
        <div>

            <Tab.Container id="left-tabs-example" defaultActiveKey="details">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="details">Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="gallery">Gallery</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="attributes">Attributes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    disabled={!state.gallery || !state.gallery.length}
                                    eventKey="variations">Variations</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    disabled={!state.variations || !state.variations.length}
                                    eventKey="shipping">Shipping</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    disabled={!state.variations ||
                                        !state.variations.length ||
                                        !state.shipping_options ||
                                        !state.shipping_options.length}
                                    eventKey="publish">Publish</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="details">
                                <ProductUpdate product={state.details} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="gallery">
                                <BoxWrapper>
                                    <div className="py-3">
                                        <h6>Gallery</h6>
                                        {state.gallery &&
                                            !!state.gallery.length &&
                                            <FileMultiUpdate prevFiles={state.gallery} />
                                        }
                                    </div>
                                    <div className="py-3">
                                        <h6>new uploads</h6>
                                        <FileMultiUpload docId={state._id} />
                                    </div>
                                </BoxWrapper>
                            </Tab.Pane>
                            <Tab.Pane eventKey="attributes">
                                <BoxWrapper>
                                    <div className="py-3">
                                        <h6>Attributes</h6>
                                        <AttributesCreate garment_type="dress" />
                                    </div>

                                </BoxWrapper>
                            </Tab.Pane>
                            <Tab.Pane eventKey="variations">
                                <BoxWrapper>
                                    {state.variations &&
                                        !!state.variations.length &&
                                        state.variations.map(v => {
                                            return (
                                                <div key={v._id} className="gigForms__container">
                                                    <VariationUpdate
                                                        variation={v}
                                                        updateQuery={updateQuery}
                                                    />
                                                </div>
                                            )
                                        })}
                                    <div className="p-3">
                                        <VariationCreate
                                            updateQuery={updateQuery} />
                                    </div>
                                </BoxWrapper>

                            </Tab.Pane>
                            <Tab.Pane eventKey="shipping">
                                <BoxWrapper>
                                    {state.shipping_options &&
                                        !!state.shipping_options.length &&
                                        state.shipping_options.map(shipping => {
                                            return (
                                                <div key={shipping._id} className="gigForms__container">
                                                    <ShippingUpdate
                                                        shipping={shipping}
                                                        updateQuery={updateQuery} />
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="p-3">
                                        <ShippingCreate
                                            updateQuery={updateQuery} />
                                    </div>
                                </BoxWrapper>
                            </Tab.Pane>
                            <Tab.Pane eventKey="publish">
                                <ListingPublish />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default GigForms
