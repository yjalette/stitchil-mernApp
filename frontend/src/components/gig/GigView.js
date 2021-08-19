import React from 'react'
import GigData from './GigData'
import GigSelect from './GigSelect'

const GigView = () => {
    return (
        <GigData>
            <GigSelect />
        </GigData>
    )
}

{/* <GigData
            compReceiver={({ values }) => {
                return <GigSelect
                    item={values.item}
                    package_options={values.packages}
                    shipping_options={values.shipping_options} />
            }}
        /> */}


export default GigView
