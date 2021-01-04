import React from 'react'
import { useParams } from 'react-router-dom';

import ItemIndex from '../../components/profileItems/ItemIndex';
import ReviewIndex from '../../components/profileReviews/ReviewIndex';


const ProfileSection = ({ section }) => {
    // const { section } = useParams();
    return (
        <div className={`profileSection profilSection-${section}`}>
            {section === "reviews" && <ReviewIndex />}
            {section === "portfolio" && <ItemIndex section={section} />}
            {section === "gigs" && <ItemIndex section={section} />}

            {/* {section === "gigs" && <ProfileGigs resData={sectionData && sectionData} />} */}
        </div>
    )
}

export default ProfileSection
