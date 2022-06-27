import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, loadScreen, check, song } = this.props;
    const screenContent = (
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
            id={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ check(song) }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ loadScreen }
          />
        </label>
      </section>
    );

    return (
      <div>
        { screenContent}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  loadScreen: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired

  ,
};

export default MusicCard;
