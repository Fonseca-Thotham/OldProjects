import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albumSongs: [],
    artist: '',
    album: '',
    loading: false,
    favMusic: [],
  }

  componentDidMount = async () => {
    this.getSongs();
    const savedMusic = await getFavoriteSongs();
    this.setState({ favMusic: savedMusic });
  }

  editFavorite = async (fullSong) => {
    const { favMusic } = this.state;
    this.setState({ loading: true });
    const favSong = favMusic.some((song) => (
      song.trackId === fullSong.trackId
    ));
    if (favSong) {
      const newFavMusic = favMusic.filter((song) => song.trackId !== fullSong.trackId);
      this.setState({ favMusic: newFavMusic });
      await removeSong(fullSong);
      this.setState({ loading: false });
    } else {
      this.setState((prevState) => ({
        favMusic: [...prevState.favMusic, fullSong],
      }));
      await addSong(fullSong);
      this.setState({ loading: false });
    }
  };

  getSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const songsOnly = result[0];
    const { artistName, collectionName } = songsOnly;
    this.setState({ albumSongs: result, artist: artistName, album: collectionName });
  }

  someFunction = (fullSong) => {
    const { favMusic } = this.state;
    const favSong = favMusic.some((song) => (
      song.trackId === fullSong.trackId
    ));
    return favSong;
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
              song={ song }
              loadScreen={ () => this.editFavorite(song) }
              check={ this.someFunction }
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
