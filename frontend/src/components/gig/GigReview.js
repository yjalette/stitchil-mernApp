import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import BoxWrapper from '../../layout/BoxWrapper'
import CustomButton from '../../layout/button/CustomButton'
import CustomAlert from '../../layout/CustomAlert'
import ListItem from '../../layout/ListItem'
import SectionHeader from '../../layout/SectionHeader'
import SectionWrapper from '../../layout/SectionWrapper'
import ItemPublish from '../items/ItemPublish'
import PictureZoom from '../pictures/PictureZoom'
import GigVariantItem from './GigVariantItem'
import "./style.css"

const GigReview = (props) => {
    const { overview, images, variants } = props;
    const { currForm } = useParams()
    const { pathname } = useLocation()
    const { push } = useHistory();

    const validate = () => {
        if (!variants || !images) return false
        else {
            return variants.length > 0 && images.length > 0
        }

    }

    const handleClick = ({ target }) => {
        return push(pathname.replace(currForm, target.name));
    }


    return (
        <>
            <ItemPublish validate={validate}>
                <SectionWrapper section_class="gigPublish content">
                    {displayHeader("overview", handleClick)}
                    <BoxWrapper box_class="overview">
                        {overview
                            && Object.values(overview).length > 0
                            && Object.keys(overview)
                                .map((field, index) => displayOverviewItem(overview, field))}
                    </BoxWrapper>
                    {displayHeader("images", handleClick)}
                    <BoxWrapper box_class="images">
                        {images
                            && images.length > 0
                            ?
                            images.map((url, index) => <PictureZoom
                                key={index}
                                url={url}
                                elem_class="thumb" />)
                            :
                            displayAlert("images")
                        }
                    </BoxWrapper>
                    {displayHeader("variants", handleClick)}
                    <BoxWrapper box_class="variants">
                        {variants
                            && variants.length > 0
                            ?
                            variants.map((variant, index) => <GigVariantItem
                                key={index}
                                variant={variant} />)
                            :
                            displayAlert("variants")
                        }
                    </BoxWrapper>
                </SectionWrapper>
            </ItemPublish>
        </>
    )
}

const overview_excluded = ["_id", "__typename", "gallery", "group", "coverImage"]

function displayHeader(title, onClick) {
    return (
        <SectionHeader title={title}>
            <CustomButton
                btn_class="btn-icon ml-3"
                icon="fas fa-pencil-alt"
                btn_otherProps={{
                    name: title
                }}
                onClick={onClick}
            ></CustomButton>
        </SectionHeader>
    )
}

function displayOverviewItem(obj, field) {
    if (overview_excluded.includes(field)) return null
    if (!obj[field]) return null
    if (Array.isArray(obj[field]) && obj[field].length === 0) return null
    return <ListItem key={field} field={field} content={obj[field]} />
}

function displayAlert(missingSection) {
    return <CustomAlert
        alert_variant="danger"
    >missing {missingSection}</CustomAlert>
}

export default GigReview
