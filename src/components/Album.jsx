import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    albumSongs: [],
    artist: '',
    album: '',
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const songs = result[0];
    const { artistName, collectionName } = songs;
    this.setState({ albumSongs: result, artist: artistName, album: collectionName });
  }

  render() {
    const { albumSongs, artist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
                nomeMusica={ song.trackName }
                songUrl={ song.previewUrl }
              />
            ))}
        </section>
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
