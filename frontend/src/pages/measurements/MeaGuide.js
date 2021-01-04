import React from 'react';

const tip = "When taking these measurements, use a cloth tape measure, not a metal one. Make sure that, when you circle your chest, waist, or hips, the tape is level and neither too tight nor too loose. Also measure yourself on your bare skin, not over clothes. And this may sound silly, but don’t trust your memory — be sure to write the measurements down!"

const MeaGuide = () => (
    <>
        <div className="flex-center align-items-center column m-2">
            <img src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602103659/homepage/tailorSuitYellow_sfa5ss.jpg" alt="tailor img" className="w-50" />
            <div className="flex-center flex-column justify-content-around">
                <h3 className="">Measurements</h3>
                <p className="text-dark ">Most people have a good idea what their measurements are, but rather than assume you know, get an accurate measurement. Going to a tailor will give you more accurate measurements, but you can certainly get a close approximation handling the measuring tape yourself. The process for getting your body measurements is simple.</p>
                <div className="flex-center w-100">
                    <button className="w-25 black-btn">Women</button>
                    <button className="w-25 black-btn">Men</button>
                </div>
            </div>
        </div>
        <p className="border p-2 flex-center mt-5"><i className="fa fa-lightbulb-o p-2 font-large"></i>{tip}</p>
    </>
)

export default MeaGuide;

// style={{backgroundColor: "#f3e963"}}