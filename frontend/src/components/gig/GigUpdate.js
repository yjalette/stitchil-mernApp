import React, { useContext } from 'react'
import ListingContext from '../../context/Listing-context'
import GigForms from './GigForms';


const GigUpdate = () => {
    const listing = useContext(ListingContext);
    console.log(listing)
    return <GigForms />
}



export default GigUpdate
