import "./index.css";

const Card = (props) => {
  const { eachSongsItem, addToplaylist } = props;
  const { name, artist, id } = eachSongsItem;
  const addToList = () => {
    addToplaylist(id);
  };

  return (
    <div className="music-card">
      <div className="music-cover">
        <p>{name} image</p>
      </div>
      <p className="song-name">Song: {name}</p>
      <p className="song-name">Artist: {artist}</p>
      <button onClick={addToList} type="button" className="add-button">
        Add to playlist
      </button>
    </div>
  );
};

export default Card;
