import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends React.Component {
  render() {
    const { artistName, image, albumName, collectionId } = this.props;
    return (
      <li>
        <img alt={ albumName } src={ image } />
        <h2>{ albumName }</h2>
        <h3>{ artistName }</h3>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Ir para álbum
        </Link>
      </li>
    );
  }
}

CardAlbum.propTypes = {
  artistName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default CardAlbum;
