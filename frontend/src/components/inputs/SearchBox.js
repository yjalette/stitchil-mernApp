import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

const SearchBox = ({ onClick, box_class }) => {
    const [str, setStr] = useState("");
    return (
        <Form className={`search-box ${box_class}`} inline>
            <Form.Control type="text" placeholder="search..." className="mr-sm-2" value={str} onChange={({ target }) => setStr(target.value)} />
            <i className="fa fa-search customIcon" onClick={() => onClick(str)} />
        </Form>

    )
}

export default SearchBox


