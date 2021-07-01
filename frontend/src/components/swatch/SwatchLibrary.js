import React from 'react'
import { Image } from 'react-bootstrap'
import CustomModal from '../../layout/CustomModal'
import BoxWrapper from '../../layout/BoxWrapper'
import SectionWrapper from '../../layout/SectionWrapper'
import CustomPopover from '../../layout/CustomPopover'
import ListItem from '../../layout/ListItem'
import GroupButton from '../../layout/button/GroupButton'
import SwatchCreate from './SwatchCreate'
import SwatchUpdate from './SwatchUpdate'
import SwatchDelete from './SwatchDelete'

const SwatchLibrary = ({ swatches, updateCache, handleDeleteSwatch, swatchButton, addNewSwatchCache }) => {
    return (
        <CustomModal
            modal_title="my swatches"
            modal_class="swatchLibrary__modal"
            btn_class="btn-icon-text fas fa-images mr-2"
            btn_title="add / edit my swatches"
        >
            <SectionWrapper section_class="swatchLibrary">
                <BoxWrapper box_class="swatchLibrary__create">
                    <SwatchCreate addNewSwatchCache={addNewSwatchCache} />
                </BoxWrapper>
                {swatches && swatches.length > 0 && swatches.map((swatch, index) => {
                    return (
                        <BoxWrapper key={index} box_class="swatchLibrary">
                            <CustomPopover
                                placement="top"
                                popover_class="swatchLibrary-popover"
                                content={
                                    <div className="swatchLibrary-popover-box">
                                        <ListItem field="fabric" content={swatch.fabric} />
                                        <ListItem field="color" content={swatch.color} />
                                        <ListItem field="descr" content={swatch.description} />
                                    </div>
                                }
                            >
                                <Image src={swatch.image} className="swatchLibrary__img" />
                            </CustomPopover>
                            {
                                swatchButton ? swatchButton(swatch)
                                    :
                                    <GroupButton group_class="justify-content-around">
                                        <SwatchUpdate swatch={swatch} updateCache={updateCache} />
                                        <SwatchDelete swatchId={swatch._id} removeFromState={handleDeleteSwatch} />
                                    </GroupButton>
                            }

                        </BoxWrapper>
                    )
                })}
            </SectionWrapper>
        </CustomModal>
    )
}

export default SwatchLibrary
