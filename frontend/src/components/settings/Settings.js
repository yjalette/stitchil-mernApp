import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "./settings.css";


import UpdatePassword from './UpdatePassword';
import PageMenu from '../navbar/PageMenu';
import UpdateUser from './UpdateUser';
import useGetData from '../../custom_hooks/useGetData';


const Settings = () => {
    const { section, token } = useParams();
    const { data, getData } = useGetData("account");

    useEffect(() => {
        getData();
    }, [data])


    if (token) return <UpdatePassword token={token} />

    return (
        <section className="settings flex-center flex-column">
            <h3 className="settings__title gradient-text">Settings</h3>
            <PageMenu links={["account", "security", "notifications"]} />
            <div className="settings__section ">
                {section === "account" && <UpdateUser data={data} />}
                {(section === "security") && <UpdatePassword />}
            </div>
        </section>

    )
}


// inputs={inputs} setInputs={setInputs} errors={errors} handleChange={handleChange} handleCancel={handleCancel} handleSubmit={onSubmit} 


export default Settings





