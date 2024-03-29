import React from 'react';
import PageWrapper from '../../layout/PageWrapper';
import SectionHeader from '../../layout/SectionHeader';
import SectionNav from '../../components/navbar/SectionNav';
import "./style.css";
import SectionWrapper from '../../layout/SectionWrapper';

const SettingsPage = ({ section, children }) => (
    <PageWrapper mod_class="settings">
        <SectionWrapper>
            <SectionNav currSection={section} items={["account", "security", "notifications"]} />
        </SectionWrapper>
        {/* <SectionWrapper>
            <SectionHeader title={section} />
        </SectionWrapper> */}
        <SectionWrapper>
            {children}
        </SectionWrapper>
    </PageWrapper>
)


export default SettingsPage






