import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BoxWrapper from '../../layout/BoxWrapper';
import SearchBox from '../inputs/SearchBox';

const SearchKeywords = () => {
    const [value, setValue] = useState("");
    const { search } = useLocation();
    const { push } = useHistory();
    const searchParam = new URLSearchParams(search);

    useEffect(() => {
        if (value) {
            searchParam.set("keywords", value);
            push({ search: searchParam.toString() })
        }
    }, [value])

    return (
        <BoxWrapper>
            <SearchBox onClick={value => setValue(value)} />
        </BoxWrapper>
    )
}

export default SearchKeywords
