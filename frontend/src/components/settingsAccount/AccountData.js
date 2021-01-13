import React, { useEffect, useState } from 'react'
import useGetData from '../../custom_hooks/useGetData';
import useQueryHook from '../../custom_hooks/useQueryHook';
import { ACCOUNT_QUERY } from '../../pages/settingsPage/graphql/queries';
import AccountEmail from './AccountEmail';
import AccountGeneral from './AccountGeneral';
import AccountUsername from './AccountUsername';

const AccountData = () => {
    const [values, setValues] = useState({})
    const { data } = useQueryHook(ACCOUNT_QUERY);

    useEffect(() => {
        if (data) setValues(data.userAccount);
    }, [data]);

    return (
        <>
            <AccountGeneral currValues={{ fullname: values.fullname, languages: values.languages, country: values.country }} />
            <AccountUsername currValue={values.username} />
            <AccountEmail currValue={values.email} />
        </>
    )
}

export default AccountData
