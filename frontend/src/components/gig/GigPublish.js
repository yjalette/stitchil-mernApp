import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import BoxWrapper from '../../layout/BoxWrapper'
import CustomButton from '../../layout/button/CustomButton'
import ListItem from '../../layout/ListItem'
import SectionHeader from '../../layout/SectionHeader'
import SectionWrapper from '../../layout/SectionWrapper'
import PictureZoom from '../pictures/PictureZoom'
import GigVariantItem from './GigVariantItem'
import "./style.css"

const GigPublish = ({ overview, images, variants }) => {
    const { currForm } = useParams()
    const { pathname } = useLocation()
    const { push } = useHistory();

    const handleClick = ({ target }) => {
        return push(pathname.replace(currForm, target.name));
    }
    return (
        <>
            <SectionHeader title="please review below and publish when you're ready " />
            <SectionWrapper section_class="gigPublish content">
                {displayHeader("overview", handleClick)}
                <BoxWrapper box_class="overview">
                    {overview
                        && Object.values(overview).length > 0
                        && Object.keys(overview)
                            .map((field, index) => displayOverviewItem(overview, field))
                    }
                </BoxWrapper>
                {displayHeader("images", handleClick)}
                <BoxWrapper box_class="images">
                    {images
                        && images.length > 0
                        && images
                            .map((url, index) => <PictureZoom key={index} imageUrl={url} elem_class="gigPublish__thumb" />)
                    }
                </BoxWrapper>
                {displayHeader("variants", handleClick)}
                <BoxWrapper box_class="variants">
                    {variants
                        && variants.length > 0
                        && variants
                            .map((variant, index) => <GigVariantItem key={index} variant={variant} />)
                    }
                </BoxWrapper>
            </SectionWrapper>
            <SectionWrapper >
                <CustomButton
                    btn_class="btn-click"
                    onClick={handleClick}
                >publish</CustomButton>
            </SectionWrapper>
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
export default GigPublish
