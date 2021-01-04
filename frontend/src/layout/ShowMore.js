import React from 'react';

import { useToggle } from '../custom_hooks/useToggle';

const ShowMore = ({ maxWords, content, content_class }) => {
    const [open, toggle] = useToggle(false);

    return (
        <span className={content_class || "listItem__content"}>
            {open ? content : content.slice(0, maxWords)}
            <span className="clickText" onClick={toggle}>{open ? "-" : "..."}</span></span>
    )
}

export default ShowMore
