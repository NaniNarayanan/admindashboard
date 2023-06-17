import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../src/pages/adminprofile/profilecard.css";




  const ProfileCard = () =>{


    const [profileName, setProfileName] = useState("");
    const [profileCell, setProfileCell] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [profileEmail, setProfileEmail] = useState("");

 const profileData = async () => {
    try {
      const res = await axios.get("https://randomuser.me/api/");
      setProfileCell(res.data.results[0].cell);
      setProfileEmail(res.data.results[0].email);
      setProfileImage(res.data.results[0].picture.large);
      setProfileName(
        `${res.data.results[0].name.first} ${res.data.results[0].name.last}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profileData();
  }, []);
    return(
        <div className="main">
                <button className="btn-primary" style={{width:"100px", marginLeft:"10%"}} onClick={() => profileData()}>New Person</button>
            <div className="card">
                <img src={profileImage} style={{ width: "50%", height:"50%", marginLeft:"25%" }} />
                <h1>{profileName}</h1>
                <p className="title">{profileEmail}</p>
                <p>{profileCell}</p>
                    <p>
                        <button className="btn-primary">Contact</button>
                    </p>
            </div>
      </div>
    )
  }

  export default ProfileCard;