import React from 'react';
import { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import options from '../../constants/options';
import CustomButton from '../../layout/button/CustomButton';
import CustomDropdown from '../../layout/CustomDropdown';
import FormInput from '../inputs/FormInput';
import SelectInput from '../inputs/SelectInput';
import SwitchCheckBox from '../inputs/SwitchCheckBox';

const SearchFilter = () => {
    const { push } = useHistory();
    const { search } = useLocation();
    const searchParam = new URLSearchParams(search)

    const [defaultFilters, setDefaultFilters] = useState({
        styles: options.styles,
        category: options.category,
        min: 0,
        max: 1000,
        worldwide: true
    });

    const handleSelect = ({ target }) => {
        const { name, value } = target;
        setDefaultFilters({
            ...defaultFilters,
            [name]: defaultFilters[name].filter(elem => elem !== value)
        })
        searchParam.append(name, value);
        push({ search: searchParam.toString() })
        // console.log(searchParam.toString())
        // searchData(name, value)
    }

    const handlePrice = ({ target }) => {
        const { name, value } = target;
        setDefaultFilters({
            ...defaultFilters,
            [name]: value
        })

        searchParam.set(name, value)
        push({ search: searchParam.toString() })
        // searchData(name, value)
    }

    function searchData(label, val) {
        push({ search: search ? `${search}&${label}=${val}` : `${label}=${val}` })
    }

    console.log(search)

    return (
        <>
            <div className="exploreFilter flex-center justify-content-between w-100">
                <section className="exploreFilter__fiters">
                    <CustomDropdown items={defaultFilters.styles} btn_title="styles" btn_class="menuButton fa fa-caret-down" onClick={handleSelect} />
                    <CustomDropdown items={defaultFilters.category} btn_title="category" btn_class="menuButton fa fa-caret-down" onClick={handleSelect} />
                </section>
                <section className="exploreFilter__price">
                    {/* <SelectInput options={options.price_range} label="min" defaultValue={defaultFilters.min} className="menuButton fa fa-caret-down" onChange={handlePrice} /> */}
                    <CustomDropdown items={options.price_range} btn_title="min" btn_class="menuButton fa fa-caret-down" onClick={handlePrice} />
                    <CustomDropdown items={options.price_range} btn_title="max" btn_class="menuButton fa fa-caret-down" onClick={handlePrice} />
                </section>
                <section>
                    <SwitchCheckBox label="worldwide" value={defaultFilters.worldwide} />
                </section>
            </div>
        </>
    )

}
export default SearchFilter;
