import { useState } from "react";
import { Component } from "react";
import "./index.css";

import Card from "../card";
const constants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN-PROGRESS",
};

class MusicCard extends Component {
  state = {
    songsData: [],
    apiConst: constants.initial,
    searchInput: "",
    playList: [],
  };

  componentDidMount() {
    this.getSongsList();
  }

  getSongsList = async () => {
    this.setState({ apiConst: constants.inProgress });
    const url = "https://cms.samespace.com/items/songs";

    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      const formatedData = data.data.map((eachItem) => ({
        accent: eachItem.accent,
        artist: eachItem.artist,
        cover: eachItem.cover,
        dateCreated: eachItem.date_created,
        dateUpdated: eachItem.date_updated,
        id: eachItem.id,
        name: eachItem.name,
        sort: eachItem.sort,
        status: eachItem.status,
        topTrack: eachItem.top_track,
        url: eachItem.url,
        userCreated: eachItem.user_created,
        userUpdated: eachItem.user_updated,
      }));

      this.setState({ songsData: formatedData, apiConst: constants.success });
    } else {
      this.setState({ apiConst: constants.failure });
    }
  };

  onClickSearch = () => {
    const { searchInput, songsData } = this.state;
    const filterSearchlist = songsData.filter((eachSong) => {
      return eachSong.name.toLowerCase() === searchInput.toLowerCase();
    });
    if (searchInput.length === 0) {
      this.setState({ songsData: songsData });
    } else {
      this.setState({ songsData: filterSearchlist });
    }
  };

  onPlaylistadd = (id) => {
    const { songsData, searchInput, playList } = this.state;
    const filterId = songsData.filter((eachSong) => {
      return eachSong.id === id;
    });

    this.setState((prevState) => ({
      playList: [...prevState.playList, filterId],
    }));
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  apiView = () => {
    const { apiConst } = this.state;
    switch (apiConst) {
      case constants.success:
        return this.successView();
      case constants.failure:
        return null;
      case constants.inProgress:
        return null;
      default:
        return null;
    }
  };

  successView = () => {
    const { songsData, searchInput } = this.state;

    return (
      <div>
        <div>
          <button type="button" className="playlist-button">
            playList
          </button>
          <input
            type="search"
            placeholder="Search a song"
            className="input-search"
            onChange={this.onChangeSearchInput}
            value={searchInput}
          />
          <button
            onClick={this.onClickSearch}
            type="button"
            className="search-button"
          >
            Search
          </button>
        </div>
        <ul className="list-container">
          {songsData.map((eachSong) => (
            <Card
              key={eachSong.id}
              eachSongsItem={eachSong}
              addToplaylist={this.onPlaylistadd}
            />
          ))}
        </ul>
      </div>
    );
  };

  render() {
    return <>{this.apiView()}</>;
  }
}

export default MusicCard;
