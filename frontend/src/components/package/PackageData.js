import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { PACKAGES_QUERY } from './graphql/queries'
import PackageGrid from './PackageGrid'

const PackageData = () => {
    const { itemId } = useParams()
    const [values, setValues] = useState({})
    const { data, updateQuery } = useQuery(PACKAGES_QUERY, {
        variables: { itemId },
        skip: !itemId
    });

    useEffect(() => {
        if (data) setValues(data.packages)
    }, [data])

    const addNewPackageCache = (newPackage) => {
        updateQuery(prev => {
            return {
                packages: [...prev.packages, newPackage]
            }
        })
    }

    const updateCache = (updatedPackage) => {
        updateQuery(prev => {
            const newState = [...prev.packages]
            const index = values.findIndex(val => val.type === updatedPackage.type);
            newState.splice(index, 1, updatedPackage)
            return {
                packages: newState
            }
        })
    }
    return <PackageGrid values={values} updateCache={updateCache} addNewPackageCache={addNewPackageCache} />
}

export default PackageData
