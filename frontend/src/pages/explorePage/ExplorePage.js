import React, { useContext } from 'react'
import PageWrapper from '../../layout/PageWrapper'
import AuthContext from '../../context/Auth-context';
import ExploreData from './ExploreData'
import ExploreHeader from './ExploreHeader';
import './style.css'

const ExplorePage = () => {

    return (
        <PageWrapper page_class="explore">
            <ExploreData />
        </PageWrapper>
    )
}

export default ExplorePage
