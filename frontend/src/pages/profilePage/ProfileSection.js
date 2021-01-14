import React from 'react'
import { useParams } from 'react-router-dom';

import GigIndex from './ProfileGig/GigIndex';
import PortfolioIndex from './profilePortfolio/PortfolioIndex';
import ReviewData from './profileReviews/ReviewsData';


const ProfileSection = ({ section }) => {
    // const { section } = useParams();
    return (
        <div className={`profileSection profilSection-${section}`}>
            {section === "reviews" && <ReviewData />}
            {section === "portfolio" && <PortfolioIndex section={section} />}
            {section === "gigs" && <GigIndex section={section} />}

            {/* {section === "gigs" && <ProfileGigs resData={sectionData && sectionData} />} */}
        </div>
    )
}

export default ProfileSection
