import React from 'react';
import { useHistory } from 'react-router-dom';
import CustomCarousel from '../../layout/CustomCarousel';
import { heroSlides } from './consts'
import ListItem from '../../layout/ListItem';
import CustomButton from '../../layout/button/CustomButton';
import PictureFlag from '../../components/pictures/PictureFlag';

const style = { backgroundImage: `url("https://res.cloudinary.com/dgxa9gpta/image/upload/v1602105434/homepage/iphone_vw9pja.png")` };

const Heroimage = () => {
    const { push } = useHistory();

    function displaySlide(slide) {
        return (
            <>
                <div className="hpSlides__header">
                    <h5 className="hpSlides__username mb-0">@{slide.username}</h5>
                    <CustomButton btn_class="btn-icon-text btn-star"
                        icon="fa fa-star"
                        onClick={() => push("/explore/gigs")}
                    >5
                   </CustomButton>
                </div>
                <img
                    className="hpSlides__img"
                    src={slide.url}
                    alt="slide"
                />
                <div className="hpSlides__content">
                    <h3 className="hpSlides__fullname ml-3">{slide.fullName} <PictureFlag countryCode={slide.country} /></h3>
                    <div >
                        <ListItem field="experience: " content={slide.experience} />
                        <ListItem field="skills: " content={slide.skills} />
                    </div>
                    <CustomButton btn_class="btn-icon-text hpSlides__btn align-self-end mr-2"
                        icon="fa fa-angle-double-right "
                        onClick={() => push("/explore/gigs")}
                    >see more
                   </CustomButton>
                </div>

            </>
        )
    }

    return (
        <section style={style} className="backgroundImg flex-center hpSlides__container">
            <div className="hpSlides__wrapper">
                <CustomCarousel slides={heroSlides} getSlide={displaySlide} slides_class="hpSlides" />
            </div>
        </section>
    )
}



export default Heroimage

