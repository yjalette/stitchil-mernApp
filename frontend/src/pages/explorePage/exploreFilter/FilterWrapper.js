import React from 'react';
import FilterItem from './FilterItem';
import FilterPriceRange from './FilterPriceRange';
import defaultFilters from './defaultFilters';
import FilterSelected from './FilterSelected';
import SwitchCheckBox from '../../../components/inputs/SwitchCheckBox';
import SectionHeader from '../../../layout/SectionHeader';

const FilterWrapper = ({ filters, onFilter, price, onPriceChange, deleteSearchParam, clearButton }) => (
    <div className="exploreFilter__wrapper">
        <div className="exploreFilter flex-center justify-content-between w-100">
            <section className="exploreFilter__fiters">
                {Object.keys(defaultFilters).map((elem, i) => <FilterItem
                    key={i}
                    onFilter={({ target }) => onFilter(elem, target.value)}
                    selectedOptions={filters[elem]}
                    defaultOptions={defaultFilters[elem]}
                    filterName={elem} />)}
            </section>
            <FilterPriceRange price={price} onPriceChange={onPriceChange} />
            <section>
                <SwitchCheckBox label="worldwide" value={filters.worldwide} />
            </section>
        </div>
        {filters && Object.values(filters).length > 0 &&
            <>
                <SectionHeader title={`results`} />
                <FilterSelected filters={filters} deleteSelected={deleteSearchParam}>
                    {clearButton}
                </FilterSelected></>}
    </div>
)

export default FilterWrapper;
