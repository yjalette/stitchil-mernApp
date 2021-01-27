import React from 'react'
import CommentData from '../../components/comment/CommentData'
import ItemDetails from '../../components/items/ItemDetails'
import BoxWrapper from '../../layout/BoxWrapper'
import CustomButton from '../../layout/button/CustomButton'
import ListItem from '../../layout/ListItem'
import SectionWrapper from '../../layout/SectionWrapper'

const ProductGrid = ({ product }) => {
    console.log(product)
    return (
        <>
            <SectionWrapper>
                <ItemDetails gallery={product.gallery}>
                    <BoxWrapper>
                        <ListItem field="title" content={product.title} />
                        <ListItem field="description" content={product.description} />
                    </BoxWrapper>
                    <BoxWrapper>
                        <CustomButton btn_class="btn-click">for sale</CustomButton>
                        <ListItem field="price: " content="55" />
                    </BoxWrapper>
                </ItemDetails>
            </SectionWrapper>
            <SectionWrapper>
                <CommentData />
            </SectionWrapper>
        </>
    )
}

export default ProductGrid