import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
  }

  componentDidMount() {
    const { trackId } = this.props;
    this.isItChecked(trackId);
  }

  isItChecked = (id) => {
    const favSongsList = JSON.parse(localStorage.getItem('favorite_songs'));
    if (favSongsList.length > 0) {
      const isIt = favSongsList.some((song) => song.trackId === id);
      this.setState({ isChecked: isIt });
    }
  }

  render() {
    const { trackName, previewUrl, trackId, loadScreen } = this.props;
    const { isChecked } = this.state;
    return (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            checked={ isChecked }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ loadScreen }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  loadScreen: PropTypes.func.isRequired,
};

export default MusicCard;
