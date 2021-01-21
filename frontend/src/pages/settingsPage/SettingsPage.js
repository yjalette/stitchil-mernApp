import React from 'react';
import { useParams } from 'react-router-dom';

import "./style.css";
import PageMenu from '../../layout/PageMenu';
import AccountIndex from './settingsAccount/AccountIndex';
import DemoVersionAlert from '../../layout/alerts/DemoVersionAlert';
import SecurityPassword from '../../components/security/SecurityPassword';
import PageWrapper from '../../layout/PageWrapper';
import SectionHeader from '../../layout/SectionHeader';
import SectionWrapper from '../../layout/SectionWrapper';

const SettingsPage = () => {
    const { section } = useParams();
    return (
        <PageWrapper page_class="settings">
            <PageMenu items={["account", "security", "notifications"]} />
            <SectionHeader title={section}></SectionHeader>
            <SectionWrapper>
                {section === "account" && <AccountIndex />}
                {section === "security" && <SecurityPassword />}
                {section === "notifications" && <DemoVersionAlert />}
            </SectionWrapper>
        </PageWrapper>

    )
}

export default SettingsPage






