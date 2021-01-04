import React from 'react';

import "./../style.css"

const IconButton = ({ onClick, icon_class }) => <i className={`${icon_class} customIcon`} onClick={onClick} />

export default IconButton;