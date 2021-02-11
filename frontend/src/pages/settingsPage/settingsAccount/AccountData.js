import React, { useEffect, useState } from 'react'

import useQueryHook from '../../../custom_hooks/useQueryHook';
import { ACCOUNT_QUERY } from '../graphql/queries';
import AccountEmail from './AccountEmail';
import AccountGeneral from './AccountGeneral';
import AccountUsername from './AccountUsername';
import BoxWrapper from './../../../layout/BoxWrapper';

const AccountData = () => {
    const [values, setValues] = useState({})
    const { data } = useQueryHook(ACCOUNT_QUERY);

    useEffect(() => {
        if (data) setValues(data.userAccount);
    }, [data]);

    return (
        <>
            <BoxWrapper>
                <AccountGeneral currValues={{ fullname: values.fullname, languages: values.languages, country: values.country }} />
            </BoxWrapper>
            <BoxWrapper>
                <AccountUsername currValue={values.username} />
            </BoxWrapper>
            <BoxWrapper>
                <AccountEmail currValue={values.email} />
            </BoxWrapper>
        </>
    )
}

export default AccountData
