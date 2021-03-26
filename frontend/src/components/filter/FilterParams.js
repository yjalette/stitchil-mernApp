import React from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import CustomButton from '../../layout/button/CustomButton';

const FilterParams = () => {
    const { push } = useHistory();
    const { search } = useLocation();
    const searchParam = new URLSearchParams(search);

    const deleteMultiParam = async ({ target }) => {
        const { name, value } = target;
        push({
            search:
                queryString.stringify({
                    ...searchParam,
                    [name]: searchParam.getAll(name).filter(el => el !== value)
                })
        })
    }

    const deleteParam = ({ target }) => {
        const { name } = target;
        searchParam.delete(name);
        push({ search: searchParam.toString() })
    }
    return (
        <>
            <section className="filterParams-box">
                <section className="filterParams-box">
                    {queryString.parse(search)
                        && Object.values(queryString.parse(search)).length > 0
                        && Object.keys(queryString.parse(search))
                            .map((paramKey) => {
                                const params = queryString.parse(search);
                                if (!params[paramKey]) return null
                                if (Array.isArray(params[paramKey])) {
                                    return params[paramKey].map(el => paramBox(paramKey, el, deleteMultiParam))
                                }
                                return paramBox(paramKey, params[paramKey], deleteParam)
                            })}
                </section>
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


{/* <section className="filterParams-box">
{queryString.parse(search) && Object.values(queryString.parse(search)).length > 0 && Object.keys(queryString.parse(search))
    .map((paramKey) => {
        const params = queryString.parse(search);
        if (!params[paramKey]) return null
        if (Array.isArray(params[paramKey])) {
            return params[paramKey].map(el => paramBox(paramKey, el, deleteMultiParam))
        }
        return paramBox(paramKey, params[paramKey], deleteParam)
    })}
</section> */}