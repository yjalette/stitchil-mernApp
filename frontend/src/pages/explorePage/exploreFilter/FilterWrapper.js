import React from 'react';
import FilterOptions from './FilterOptions';
import FilterPriceRange from './FilterPriceRange';
import defaultFilters from './defaultFilters';
import SwitchCheckBox from '../../../components/inputs/SwitchCheckBox';

const FilterWrapper = ({ filters, onFilter, price, onPriceChange, children }) => (
    <div className="exploreFilter__wrapper">
        <div className="exploreFilter flex-center justify-content-between w-100">
            <section className="exploreFilter__fiters">
                {Object.keys(defaultFilters).map((elem, i) => <FilterOptions
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
        {children}
    </div>
)

export default FilterWrapper;
