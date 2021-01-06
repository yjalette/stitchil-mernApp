import React  from 'react';
import { useParams } from 'react-router-dom';

import "./style.css";
import PageMenu from '../../layout/PageMenu';
import AccountIndex from '../../components/settingsAccount/AccountIndex';
import SecurityIndex from '../../components/settingsSecurity/SecurityIndex';
import DemoVersionAlert from '../../layout/alerts/DemoVersionAlert';

const SettingsPage = () => {
    const { section, token } = useParams();
    return (
        <section className="settings flex-center flex-column">
            <h3 className="settings__title gradient-text">Settings</h3>
            <PageMenu items={["account", "security", "notifications"]} />
            <div className="settings__section ">
                {section === "account" && <AccountIndex />}
                {section === "security" && <SecurityIndex />}
                {section === "notifications" && <DemoVersionAlert/>}
            </div>
        </section>

    )
}

export default SettingsPage






