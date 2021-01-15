import React from 'react';
import FormInput from '../../../components/inputs/FormInput';

const FilterPriceRange = ({ price, onPriceChange }) => (
    <section className="exploreFilter__price">
        <FormInput label="min" type="number" value={price.min} onChange={onPriceChange} />
        <FormInput label="max" type="number" value={price.max} onChange={onPriceChange} />
    </section>
)


export default FilterPriceRange
