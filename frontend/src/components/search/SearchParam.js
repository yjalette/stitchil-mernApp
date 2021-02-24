import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import options from '../../constants/options';
import CustomButton from '../../layout/button/CustomButton';

const SearchParam = () => {
    const { push } = useHistory();
    const { search } = useLocation();
    const [selectedParam, setSelectedParam] = useState({});

    useEffect(() => {
        if (search) setSelectedParam(queryString.parse(search))
    }, [search])

    const handleChange = ({ target }) => {
        console.log(target.name)
        setSelectedParam({
            ...setSelectedParam,
            [paramKey]: selectedParam[paramKey]
        })
    }


    return (
        <>
            {Object.values(selectedParam).length !== 0 && Object.keys(selectedParam).map((paramKey, index) => {
                if (Array.isArray(selectedParam[paramKey])) return selectedParam[paramKey].map(el => paramBox(paramKey, el, () => setSelectedParam({
                    ...selectedParam,
                    [paramKey]: selectedParam[paramKey].filter(p => p !== el)
                })))

                return paramBox(paramKey, selectedParam[paramKey], handleChange)
            })}
        </>
    )
}


const paramBox = (paramKey, paramVal, onChange) => (
    <CustomButton
        key={Math.random() * 100}
        btn_class="btn-icon-text exploreParam__selected"
        onClick={onChange}
        icon="fa fa-close"
        btn_otherProps={{
            value: paramVal,
            name: paramKey
        }}
    >{paramVal}</CustomButton>

)

export default SearchParam
