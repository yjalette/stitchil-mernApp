import React from 'react'
import { PROFILE_PORTFOLIO_QUERY } from '../graphql/queries'
import ItemData from '../profileItems/ItemData'

const PortfolioIndex = () => {

    return <ItemData query={PROFILE_PORTFOLIO_QUERY} />
}

export default PortfolioIndex
