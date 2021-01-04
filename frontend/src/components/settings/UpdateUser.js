import React, { useEffect, useState } from 'react';

import UpdateForm from './UpdateForm';

const initState = { username: "", email: "", fullname: "", country: "" }

const UpdateUser = ({ data }) => Object.keys(initState).map(key => <UpdateForm key={key} label={key} value={data && data.user[key] || ""} />)


export default UpdateUser
