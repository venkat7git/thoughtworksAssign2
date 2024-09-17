import { useState } from "react";
import MusicCard from "../musicCard";

import "./index.css";

const MusicHome = () => {
  return (
    <div className="main-container">
      <h1 className="main-heading">Music Playlist Manager</h1>
      
      <MusicCard />
    </div>
  );
};

export default MusicHome;
