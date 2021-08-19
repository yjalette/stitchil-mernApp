import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FABRIC_LIBRARY_QUERY } from './graphql/queries'
import FabricLibrary from './FabricLibrary'

const FabricLibraryData = ({ fabricButton }) => {
    const [values, setValues] = useState({})
    const { data, updateQuery } = useQuery(FABRIC_LIBRARY_QUERY, {
        variables: {}
    });

    useEffect(() => {
        if (data) setValues(data.fabric_library)
    }, [data])

    // if (!data || !data.gig) return <div>loading ...</div>

    const addNewFabricCache = newFabric => {

        updateQuery(prev => {
            console.log(prev)
            return {
                fabric_library: [newFabric, ...prev.fabric_library]
            }
        })
    }

    const updateCache = fabric => {
        updateQuery(prev => {
            const newState = [...prev.fabric_library]
            const index = prev.fabric_library.findIndex(sw => sw._id === fabric._id);
            newState.splice(index, 1, fabric)
            return {
                fabric_library: newState
            }
        })
    }

    const handleDeleteFabric = id => {
        setValues(values.filter(val => val._id !== id))
    }

    return <FabricLibrary
        fabrics={values}
        addNewFabricCache={addNewFabricCache}
        updateCache={updateCache}
        fabricButton={fabricButton}
        handleDeleteFabric={handleDeleteFabric} />
}

export default FabricLibraryData
