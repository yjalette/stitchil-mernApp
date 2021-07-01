import React from 'react'

const SwatchGrid = ({ values }) => {
    return (
        <div>
            {values && values.length > 0 && values.map((value, key) => {
                console.log(value)
                return (
                    <div key={key}>
                        <img src={value.image} className="w-25" />
                    </div>
                )
            })}
        </div>
    )
}

export default SwatchGrid
