import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import CustomDropdown from '../../layout/CustomDropdown';
import SwitchCheckBox from '../inputs/SwitchCheckBox';
import options from "../../constants/options"
import BoxWrapper from '../../layout/BoxWrapper';
import FilterParams from './FilterParams';
import { initState_search } from "../../constants/initStates";
import "./style.css"

const FilterByOptions = () => {
    const { push } = useHistory();
    const { search } = useLocation();
    const searchParam = new URLSearchParams(search);
    const [defaultFilters, setDefaultFilters] = useState(initState_search);

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

    const deleteMultiParam = async ({ target }) => {
        const { name, value } = target;
        setDefaultFilters({ ...defaultFilters, [name]: [...defaultFilters[name], value] })
        push({ search: queryString.stringify({ ...searchParam, [name]: searchParam.getAll(name).filter(el => el !== value) }) })
    }

    const deleteParam = ({ target }) => {
        const { name } = target;
        setDefaultFilters({ ...defaultFilters, [name]: initState_search[name] })
        searchParam.delete(name);

        push({ search: searchParam.toString() })
    }



    return (
        <>
            <BoxWrapper box_class="filterByOptions">
                {/* <CustomDropdown items={defaultFilters.style} btn_title="style" btn_class="fa fa-caret-down" onClick={handleSelect} /> */}
                <CustomDropdown items={defaultFilters.garment} btn_title="garment" btn_class="fa fa-caret-down" onClick={handleSelect} />
                <CustomDropdown items={defaultFilters.category} btn_title="category" btn_class="fa fa-caret-down" onClick={handleSelect} />
                <section className="filterByOptions__price">
                    <span className="clickElem mr-2">price</span>
                    <CustomDropdown items={options.price.min} btn_name="min" btn_title={<>${defaultFilters.min}</>} btn_class="fa fa-arrow-down" onClick={handlePrice} />
                    <span className="clickElem mx-2">-</span>
                    <CustomDropdown items={options.price.max} btn_name="max" btn_title={<>${defaultFilters.max}</>} btn_class="fa fa-arrow-up" onClick={handlePrice} />
                </section>
                <SwitchCheckBox label="worldwide" value={defaultFilters.worldwide} />
            </BoxWrapper>
            <FilterParams selectedParam={{}} deleteMultiParam={deleteMultiParam} deleteParam={deleteParam} />

        </>
    )
}




export default FilterByOptions;
