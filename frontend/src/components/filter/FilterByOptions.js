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
import CustomButton from '../../layout/button/CustomButton';
import { useToggle } from '../../custom_hooks/useToggle';
import { Dropdown, Form } from 'react-bootstrap';

const FilterByOptions = () => {
    const [open, toggle] = useToggle(false);
    const { push } = useHistory();
    const { search } = useLocation();
    const [selected, setSelected] = useState({});

    useEffect(() => {
        if (search) setSelected(queryString.parse(search))
    }, [search])

    const handleSelect = ({ target }) => {
        const { name, value } = target;
        if (target.checked) {
            setSelected({
                ...selected,
                [name]: selected[name] ? [...selected[name], value] : [value]
            })
        }
        else {
            setSelected({
                ...selected,
                [name]: selected[name].filter(el => el !== value)
            });
        }
    }

    const handlePrice = ({ target }) => {
        const { name, value } = target;
        setSelected({
            ...selected,
            [name]: value
        })
    }


    const handleSearch = () => {
        push({ search: queryString.stringify(selected) })
        toggle();
    }

    console.log(selected)

    if (!open) return <CustomButton btn_class="btn-click" onClick={() => toggle()}>filter</CustomButton>

    return (
        <>
            <BoxWrapper box_class="filterByOptions">
                {['garment', 'style', 'category'].map(k => <CustomDropdown
                    key={k}
                    items={options[k]}
                    btn_title={k}
                    btn_class="fas fa-caret-down"
                    dropdown_item={(item, i) => <Form.Check
                        key={i}
                        type="checkbox"
                        label={item}
                        name={k}
                        value={item}
                        checked={selected[k] ? selected[k].includes(item) : false}
                        className="customDropdown__item"
                        onChange={handleSelect} />}
                />)}
                <section className="filterByOptions__price">
                    <span className="clickElem mr-2">price</span>
                    {['min', 'max'].map(k => <CustomDropdown
                        key={k}
                        btn_name={k}
                        btn_title={<>${selected[k] ? selected[k] : k === 'min' ? 0 : 1000}</>}
                        btn_class={`filterByOptions__price-${k}`}
                        items={options.price[k]}
                        dropdown_item={(item, i) => (
                            <Dropdown.Item
                                key={i}
                                as="button"
                                name={k}
                                value={item}
                                onClick={handlePrice}>
                                {item}
                            </Dropdown.Item>
                        )}
                    />)}
                </section>
                <SwitchCheckBox label="worldwide" value={selected.worldwide || true} />
                <CustomButton btn_class="btn-click" onClick={handleSearch}>find</CustomButton>
            </BoxWrapper>
            <FilterParams />

        </>
    )
}




export default FilterByOptions;
