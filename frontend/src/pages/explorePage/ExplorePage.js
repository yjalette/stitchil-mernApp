import React, { useContext } from 'react'
import PageWrapper from '../../layout/PageWrapper'
import AuthContext from '../../context/Auth-context';
import ExploreData from './ExploreData'
import ExploreHeader from './ExploreHeader';
import './style.css'

const ExplorePage = () => {
    const { user } = useContext(AuthContext);
    return (
        <PageWrapper page_class="explore">
            <ExploreHeader />
            <ExploreData />
        </PageWrapper>
    )
}

export default ExplorePage
