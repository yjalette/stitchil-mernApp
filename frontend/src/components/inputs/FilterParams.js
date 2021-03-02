import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import CustomButton from '../../layout/button/CustomButton';
import { initState_search } from "../../constants/initStates";
import "./style.css"
import SectionWrapper from '../../layout/SectionWrapper';

const FilterParams = () => {
    const { push } = useHistory();
    const { search } = useLocation();
    const searchParam = new URLSearchParams(search);
    const [selectedParam, setSelectedParam] = useState({});

    useEffect(() => {
        if (search) setSelectedParam(queryString.parse(search))
    }, [search])

    const deleteOptionParam = async ({ target }) => {
        const { name, value } = target;
        const newState = { ...selectedParam, [name]: selectedParam[name].filter(p => p !== value) }
        setSelectedParam(newState)
        push({ search: queryString.stringify(newState) })
    }

    const deleteParam = ({ target }) => {
        const { name } = target;
        setSelectedParam({ ...setSelectedParam, [name]: null })
        searchParam.delete(name);
        push({ search: searchParam.toString() })
    }

    return (
        <>
            {Object.values(selectedParam).length > 0 && <SectionWrapper section_class="filterParams">
                {Object.keys(selectedParam).map((paramKey) => {
                    if (!selectedParam[paramKey]) return null
                    if (Array.isArray(selectedParam[paramKey])) return selectedParam[paramKey].map(el => paramBox(paramKey, el, deleteOptionParam))
                    return paramBox(paramKey, selectedParam[paramKey], deleteParam)
                })}
            </SectionWrapper>}
        </>
    )
}

function paramBox(paramKey, paramVal, onChange) {
    return (
        <CustomButton
            key={Math.random() * 100}
            btn_class="btn-icon-text filterParams__item"
            onClick={onChange}
            icon="fa fa-close"
            btn_otherProps={{
                value: paramVal,
                name: paramKey
            }}
        >{paramVal}</CustomButton>

    )
}


export default FilterParams;
