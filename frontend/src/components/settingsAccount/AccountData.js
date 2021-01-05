import React, { useEffect, useState } from 'react'
import useGetData from '../../custom_hooks/useGetData';
import AccountEmail from './AccountEmail';
import AccountGeneral from './AccountGeneral';
import AccountUsername from './AccountUsername';

const initState = { fullname: "", country: [], languages: [] }

const AccountData = () => {
    const [values, setValues] = useState(initState)
    const { data, getData, updateQuery } = useGetData("account");

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (data) setValues(data.userAccount);
    }, [data]);

    console.log(values)
    return (
        <>
            {/* {Object.keys(values).map(val => <AccountUpdate key={val} 
            label={val} 
            value={values[val]} />
            )} */}
            <AccountGeneral values={{fullname: values.fullname, languages: values.languages, country: values.country}}/>
            <AccountUsername currValue={values.username}/>
           <AccountEmail currValue={values.email}/>
        </>
    )
}

export default AccountData
