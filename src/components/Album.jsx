import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albumSongs: [],
    artist: '',
    album: '',
    loading: false,
    favMusic: [],
  }

  componentDidMount() {
    this.getSongs();
  }

  addFavorite = async (event, songID) => {
    const { albumSongs, favMusic } = this.state;
    this.setState({ loading: true });
    const favorite = albumSongs.find((song) => (
      song.trackId === songID
    ));
    if (favMusic.includes(favorite)) {
      const newFavMusic = favMusic.filter((song) => song.trackId !== songID);
      this.setState({ favMusic: newFavMusic });
      await removeSong(favorite);
    }
    if (!favMusic.includes(favorite)) {
      favMusic.push(favorite);
      await addSong(favorite);
    }
    this.setState({ loading: false });
  };

  getSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const songs = result[0];
    const { artistName, collectionName } = songs;
    this.setState({ albumSongs: result, artist: artistName, album: collectionName });
  }

  render() {
    const { albumSongs, artist, album, loading } = this.state;
    const contentScreen = (
      <section>
        <div>
          <h3 data-testid="artist-name">{ artist }</h3>
          <h1 data-testid="album-name">{ album }</h1>
        </div>
        {albumSongs
          .filter((song) => (
            song.trackId
          ))
          .map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              loadScreen={ (event) => this.addFavorite(event, song.trackId) }
            />
          ))}
      </section>
    );
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : contentScreen}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
