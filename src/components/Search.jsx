import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Button from './Button';
import CardAlbum from './CardAlbum';
import Header from './Header';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    inputName: '',
    searchName: '',
    isBtnDisabled: true,
    loading: false,
    artistAPI: [],
    hasSearched: false,
  };

  btnValidation = () => {
    const { inputName } = this.state;
    const min = 2;
    if (inputName.length >= min) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, this.btnValidation);
  };

  handleSearch = () => {
    const { inputName } = this.state;
    this.setState({ loading: true, searchName: inputName }, async () => {
      const APIreturn = await searchAlbumsAPI(inputName);
      this.setState({
        inputName: '', loading: false, hasSearched: true, artistAPI: APIreturn });
    });
  };

  render() {
    const { inputName, isBtnDisabled,
      loading, artistAPI, searchName, hasSearched } = this.state;

    const searchForm = (
      <form>
        <label htmlFor="search-artist-input">
          <input
            type="text"
            name="inputName"
            data-testid="search-artist-input"
            id="search-artist-input"
            onChange={ this.handleChange }
            value={ inputName }
          />
        </label>
        <Button
          id="search-artist-button"
          isBtnDisabled={ isBtnDisabled }
          innerText="Pesquisar"
          onClick={ this.handleSearch }
        />
      </form>
    );

    const searchResult = (
      <>
        <h1>
          { `Resultado de álbuns de:  ${searchName}` }
        </h1>
        <ul>
          { artistAPI.length > 0
            ? artistAPI.map((album) => (
              <CardAlbum
                key={ album.collectionId }
                artistName={ album.artistName }
                image={ album.artworkUrl100 }
                albumName={ album.collectionName }
                collectionId={ album.collectionId }
              />
            ))
            : <p>Nenhum álbum foi encontrado</p>}
        </ul>
      </>
    );

    return (
      <div data-testid="page-search">
        <Header />
        <div>{ loading ? <Loading /> : searchForm}</div>
        <div>{ hasSearched ? searchResult : null}</div>
      </div>
    );
  }
}

export default Search;
