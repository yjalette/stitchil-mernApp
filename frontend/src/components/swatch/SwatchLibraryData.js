import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { SWATCH_LIBRARY_QUERY } from './graphql/queries'
import SwatchLibrary from './SwatchLibrary'

const SwatchLibraryData = ({ swatchButton }) => {
    const [values, setValues] = useState({})
    const { data, updateQuery } = useQuery(SWATCH_LIBRARY_QUERY, {
        variables: {}
    });

    useEffect(() => {
        if (data) setValues(data.swatch_library)
    }, [data])

    // if (!data || !data.gig) return <div>loading ...</div>

    const addNewSwatchCache = newSwatch => {
        updateQuery(prev => {
            return {
                swatch_library: [newSwatch, ...prev.swatch_library]
            }
        })
    }

    const updateCache = swatch => {
        updateQuery(prev => {
            const newState = [...prev.swatch_library]
            const index = prev.swatch_library.findIndex(sw => sw._id === swatch._id);
            newState.splice(index, 1, swatch)
            return {
                swatch_library: newState
            }
        })
    }

    const handleDeleteSwatch = id => {
        setValues(values.filter(val => val._id !== id))
    }

    return <SwatchLibrary
        swatches={values}
        addNewSwatchCache={addNewSwatchCache}
        updateCache={updateCache}
        swatchButton={swatchButton}
        handleDeleteSwatch={handleDeleteSwatch} />
}

export default SwatchLibraryData
