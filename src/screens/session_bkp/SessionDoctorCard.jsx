import React, { useState, useEffect } from 'react';
import './css/style.css';
import './css/session_waiting_room.css';

export default function SessionDoctorCard({data}) { 
    const borderColor1 = { borderColor: "#0856cb", }
    const bgColor2 = { backgroundColor: "#07cbc4", }
    return (
        <div className="text-left liveSsnDocBox">
            <div className="full_width liveSsnDocBoxIn">
                <div className="liveSsnDocPic">
                    <span className="liveSsnDocPicGrph1" style={bgColor2}></span>
                    <span className="liveSsnDocPicGrph2" style={borderColor1}></span>
                    <div className="full_width liveSsnDocPicIn">
                        <img src={data.session_doctor_image} className="object_fit_cover" alt="image" />
                    </div>
                </div>
                <div className="full_width liveSsnDocContent">
                    <h4 className="font_18px colorBlack font600">{data.session_doctor_name}</h4>
                    <p>{data.subtitle}</p>
                </div>
            </div>
        </div>
    )
}

