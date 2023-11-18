import React, { useState } from 'react';
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';

function CreatePose() {

    const [english_name, setEnglishName] = useState('');
    const [sanskrit_name_adapted, setSanskritNameAdapted] = useState('');
    const [debutsanskrit_name, setDebutsanskritName] = useState('');
    const [translation_name, setTranslationName] = useState('');
    const [pose_description, setPoseDescription] = useState('');
    const [pose_benefits, setPoseBenefits] = useState('');
    const [url_svg, setUrlSvg] = useState('');
    const [url_png, setUrlPng] = useState('');
    const [url_svg_alt, setUrlSvgAlt] = useState('');

    const navigate = useNavigate();

    async function postPose () {
            let newPose = {
                english_name: english_name,
                sanskrit_name_adapted: sanskrit_name_adapted,
                debutsanskrit_name: debutsanskrit_name,
                translation_name: translation_name,
                pose_description: pose_description,
                pose_benefits: pose_benefits,
                url_svg: url_svg,
                url_png: url_png,
                url_svg_alt: url_svg_alt
            }

            try {
                const response = await fetch(`${API_URL}/addPose`, {
                    method: "post",
                    body: JSON.stringify(newPose),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Failed to add pose');
                }
        
                const serverResponse = await response.json();
                navigate(`/allPoses`);
        
                setEnglishName('');
                setSanskritNameAdapted('');
                setDebutsanskritName('');
                setTranslationName('');
                setPoseDescription('');
                setPoseBenefits('');
                setUrlSvg('');
                setUrlPng('');
                setUrlSvgAlt('');
            } catch (error) {
                // Display an alert or log the error message
                alert(`Failed to add pose: ${error.message}`);
                console.error('Failed to add pose:', error);
            }
        }

    function handleOnSubmit(event){
        event.preventDefault();
        
        postPose();
    }

    return (
        <>
        <h3> Fill out the form to add Asanas to Database. </h3>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <br></br>
          <input type="text" value={english_name} onChange={(e) => setEnglishName(e.target.value)} placeholder="English Name (Required)" />
          <br></br>
          <input type="text" value={sanskrit_name_adapted} onChange={(e) => setSanskritNameAdapted(e.target.value)} placeholder="Sanskrit Name Adapted (Required)" />
          <br></br>
          <input type="text" value={debutsanskrit_name} onChange={(e) => setDebutsanskritName(e.target.value)} placeholder="Debut Sanskrit Name" />
          <br></br>
          <input type="text" value={translation_name} onChange={(e) => setTranslationName(e.target.value)} placeholder="Translation Name (Required)" />
          <br></br>
          <textarea value={pose_description} onChange={(e) => setPoseDescription(e.target.value)} placeholder="Pose Description (Required)"></textarea>
          <br></br>
          <textarea value={pose_benefits} onChange={(e) => setPoseBenefits(e.target.value)} placeholder="Pose Benefits (Required)"></textarea>
          <br></br>
          <input type="text" value={url_svg} onChange={(e) => setUrlSvg(e.target.value)} placeholder="URL SVG" />
          <br></br>
          <input type="text" value={url_png} onChange={(e) => setUrlPng(e.target.value)} placeholder="URL PNG" />
          <br></br>
          <input type="text" value={url_svg_alt} onChange={(e) => setUrlSvgAlt(e.target.value)} placeholder="URL SVG Alt" />
          <br></br>
          <br></br>
          <button type="submit">Submit</button>
        </form>
        
        </>
      );
}

export default CreatePose;