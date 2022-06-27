import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { nomeMusica, songUrl } = this.props;
    return (
      <section>
        <p>{ nomeMusica }</p>
        <audio data-testid="audio-component" src={ songUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  nomeMusica: PropTypes.string.isRequired,
  songUrl: PropTypes.string.isRequired,
};

export default MusicCard;
