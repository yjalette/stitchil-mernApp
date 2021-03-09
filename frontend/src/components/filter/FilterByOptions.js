import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import CustomButton from '../../layout/button/CustomButton';
import CustomDropdown from '../../layout/CustomDropdown';
import SwitchCheckBox from '../inputs/SwitchCheckBox';
import { initState_search } from "../../constants/initStates";
import options from "../../constants/options"
import "./style.css"
import SectionWrapper from '../../layout/SectionWrapper';
import BoxWrapper from '../../layout/BoxWrapper';

const FilterByOptions = () => {
    const { push } = useHistory();
    const { search } = useLocation();
    const searchParam = new URLSearchParams(search);
    const [defaultFilters, setDefaultFilters] = useState(initState_search);
    const [selectedParam, setSelectedParam] = useState({});

    useEffect(() => {
        if (search) setSelectedParam(queryString.parse(search))
    }, [search])

    const handleSelect = ({ target }) => {
        const { name, value } = target;
        setDefaultFilters({ ...defaultFilters, [name]: defaultFilters[name].filter(elem => elem !== value) })
        searchParam.append(name, value);
        push({ search: searchParam.toString() })
    }

    const handlePrice = ({ target }) => {
        const { name, value } = target;
        setDefaultFilters({ ...defaultFilters, [name]: value })
        searchParam.set(name, value)
        push({ search: searchParam.toString() })
    }

    const deleteOptionParam = async ({ target }) => {
        const { name, value } = target;
        const newState = { ...selectedParam, [name]: selectedParam[name].filter(p => p !== value) }
        setSelectedParam(newState)
        setDefaultFilters({ ...defaultFilters, [name]: [...defaultFilters[name], value] })
        push({ search: queryString.stringify(newState) })
    }

    const deleteParam = ({ target }) => {
        const { name } = target;
        setSelectedParam({ ...setSelectedParam, [name]: null })
        setDefaultFilters({ ...defaultFilters, [name]: initState_search[name] })
        searchParam.delete(name);
        push({ search: searchParam.toString() })
    }

    return (
        <>
            <BoxWrapper box_class="filterByOptions">
                <CustomDropdown items={defaultFilters.styles} btn_title="styles" btn_class="fa fa-caret-down" onClick={handleSelect} />
                <CustomDropdown items={defaultFilters.category} btn_title="category" btn_class="fa fa-caret-down" onClick={handleSelect} />
                <section className="filterByOptions__price">
                    <span className="clickElem mr-2">price</span>
                    <CustomDropdown items={options.price.min} btn_name="min" btn_title={<>${defaultFilters.min}</>} btn_class="fa fa-arrow-down" onClick={handlePrice} />
                    <span className="clickElem mx-2">-</span>
                    <CustomDropdown items={options.price.max} btn_name="max" btn_title={<>${defaultFilters.max}</>} btn_class="fa fa-arrow-up" onClick={handlePrice} />
                </section>
                <SwitchCheckBox label="worldwide" value={defaultFilters.worldwide} />
            </BoxWrapper>
            {Object.values(selectedParam).length > 0 && <BoxWrapper box_class="filterParams">
                {Object.keys(selectedParam).map((paramKey) => {
                    if (!selectedParam[paramKey]) return null
                    if (Array.isArray(selectedParam[paramKey])) return selectedParam[paramKey].map(el => paramBox(paramKey, el, deleteOptionParam))
                    return paramBox(paramKey, selectedParam[paramKey], deleteParam)
                })}
            </BoxWrapper>}
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


export default FilterByOptions;
