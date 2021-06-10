import React, { useState } from 'react';
import { Form } from 'react-bootstrap'
import CustomButton from '../../layout/button/CustomButton';

const FormSearch = ({ handleSearch, placeholder, btn_class }) => {
    const [str, setStr] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        handleSearch(str);
        setStr("");
    }

    return (
        <Form className="searchForm" onSubmit={handleSubmit} inline>
            <Form.Control type="text" placeholder={placeholder} className="searchForm__input" value={str} onChange={({ target }) => setStr(target.value)} />
            <CustomButton onClick={handleSubmit} btn_class={`${btn_class || "btn-icon"} ml-2`} icon="fas fa-search" />
        </Form>
    )
}

export default FormSearch