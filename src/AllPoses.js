import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './constants';
import './App.css';
import { Link } from 'react-router-dom';

function AllPoses() {
  const [serverData, setServerData] = useState([]);
  const [selectedPose, setSelectedPose] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/allPoses`)
      .then((res) => {
        console.log(res.data.payload);
        setServerData(res.data.payload);
      })
      .catch((error) => {
        console.error('Error fetching poses:', error);
      });
  }, []);

  const handleSelectChange = (event) => {
    setSelectedPose(event.target.value);
  };

  let selectedPoseData = null;

  if (selectedPose) {
    selectedPoseData = serverData.find((pose) => pose.english_name === selectedPose);
  }

  return (
    <>
      <h3>Select a Pose to view more information.</h3>
      <select value={selectedPose} onChange={handleSelectChange}>
        <option value="">Select a Pose</option>
        {serverData.length > 0 ? (
          serverData
            .slice()
            .sort((a, b) => a.english_name.localeCompare(b.english_name))
            .map((pose) => (
              <option key={pose._id} value={pose.english_name}>
                {pose.english_name}
              </option>
            ))
        ) : (
          <option value="" disabled>
            Loading...
          </option>
        )}
      </select>

      {selectedPoseData && (
        <div className="selected-pose-info">
          <h4>{selectedPoseData.english_name}</h4>
          <div className="pose-details">
            <div className="pose-description">
              <p>Sanskrit Name Adapted: {selectedPoseData.sanskrit_name_adapted}</p>
              <p>Debut Sanskrit Name: {selectedPoseData.debutsanskrit_name}</p>
              <p>Translation Name: {selectedPoseData.translation_name}</p>
              <p>Pose Description: {selectedPoseData.pose_description}</p>
              <p>Pose Benefits: {selectedPoseData.pose_benefits}</p>
            </div>
            {selectedPoseData.url_svg && (
              <div className="pose-image">
                <img
                  src={selectedPoseData.url_svg}
                  alt={selectedPoseData.english_name}
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>  
  )
}

export default AllPoses;
