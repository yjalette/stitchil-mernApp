import React, { useContext } from 'react'
import PageWrapper from '../../layout/PageWrapper'
import AuthContext from '../../context/Auth-context';
import ExploreData from './ExploreData'
import './style.css'
import ExploreHeader from './ExploreHeader';
import ExploreFetch from './ExploreFetch';

const ExplorePage = () => {
    const { user } = useContext(AuthContext);
    return (
        <PageWrapper page_class="explore">
            {user && <ExploreHeader />}
            <ExploreFetch />
            {/* <ExploreData /> */}
        </PageWrapper>
    )
}

export default ExplorePage
