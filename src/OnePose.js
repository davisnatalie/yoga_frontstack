import React, { useState, useEffect } from 'react';
import { API_URL } from './constants';

function OnePose() {

    const [pose, setPose] = useState({
        english_name: "",
        sanskrit_name_adapted: "",
        debutsanskrit_name: "",
        translation_name: "",
        pose_description: "",
        pose_benefits: "",
})

    useEffect(() => {
        fetch(`${API_URL}/getPoseByName/${english_name}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(async res => {
                let result = await res.json()
                setPose(result.payload)
            })
    }, [english_name])



    return ( 
        <>
        <h1>{pose.english_name}</h1>

        {pose.sanskrit_name_adapted}
        {pose.debutsanskrit_name}
        {pose.translation_name}
        {pose.pose_description}
        {pose.pose_benefits}
        </>
     );
}

export default OnePose;

