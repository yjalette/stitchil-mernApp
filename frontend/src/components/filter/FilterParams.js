import React from 'react'
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import BoxWrapper from '../../layout/BoxWrapper';
import CustomButton from '../../layout/button/CustomButton';

const FilterParams = ({ deleteParam, deleteMultiParam }) => {
    const { search } = useLocation();
    const selectedParam = useRef(null)
    // useEffect(() => {
    //     if (search) selectedParam.current = queryString.parse(search)
    // }, [search])
    console.log(queryString.parse(search))
    return (
        <>
            <section className="filterParams-box">
                {queryString.parse(search) && Object.values(queryString.parse(search)).length > 0 && Object.keys(queryString.parse(search)).map((paramKey) => {
                    const params = queryString.parse(search);
                    if (!params[paramKey]) return null
                    if (Array.isArray(params[paramKey])) {
                        return params[paramKey].map(el => paramBox(paramKey, el, deleteMultiParam))
                    }
                    return paramBox(paramKey, params[paramKey], deleteParam)
                })}
            </section>
        </>
    )
}

function paramBox(paramKey, paramVal, onChange) {
    return (
        <CustomButton
            key={Math.random() * 100}
            btn_class="btn-icon-text filterParams__item"
            onClick={onChange}
            icon="fas fa-times"
            btn_otherProps={{
                value: paramVal,
                name: paramKey
            }}
        >{paramVal}</CustomButton>

    )
}

export default FilterParams
