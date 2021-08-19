import React from 'react'
import CustomModal from '../../layout/CustomModal'
import BoxWrapper from '../../layout/BoxWrapper'
import SectionWrapper from '../../layout/SectionWrapper'
import GroupButton from '../../layout/button/GroupButton'
import FabricCreate from './FabricCreate'
import FabricUpdate from './FabricUpdate'
import FabricDelete from './FabricDelete'
import FabricItem from './FabricItem'

const FabricLibrary = ({ fabrics, updateCache, handleDeleteFabric, fabricButton, addNewFabricCache }) => {
    console.log(fabrics)
    return (
        <CustomModal
            modal_title="my fabrics"
            modal_class="fabricLibrary__modal"
            btn_class="btn-icon-text fas fa-images mr-2"
            btn_title="add / edit my fabrics"
        >
            <SectionWrapper mod_class="fabricLibrary">
                {fabrics && fabrics.length > 0 && fabrics.map((fabric, index) => {
                    return (
                        <BoxWrapper key={index} box_class="fabricLibrary">
                            {
                                fabricButton ? fabricButton(fabric)
                                    :
                                    <GroupButton group_class="justify-content-around">
                                        <FabricUpdate fabric={fabric} updateCache={updateCache} />
                                        <FabricDelete fabricId={fabric._id} removeFromState={handleDeleteFabric} />
                                    </GroupButton>
                            }
                            <FabricItem fabric={fabric} mod_class="fabricLibrary" />
                        </BoxWrapper>
                    )
                })}
                <BoxWrapper mod_class="fabricLibrary__create">
                    <FabricCreate addNewFabricCache={addNewFabricCache} />
                </BoxWrapper>
            </SectionWrapper>
        </CustomModal>
    )
}

export default FabricLibrary
