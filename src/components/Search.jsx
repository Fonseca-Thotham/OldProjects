import React from 'react';
import Button from './Button';
import Header from './Header';

class Search extends React.Component {
  state = {
    artist: '',
    isBtnDisabled: true,
  };

  btnValidation = () => {
    const { artist } = this.state;
    const min = 2;
    if (artist.length >= min) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, this.btnValidation);
  };

  render() {
    const { artist, isBtnDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              name="artist"
              data-testid="search-artist-input"
              id="search-artist-input"
              onChange={ this.handleChange }
              value={ artist }
            />
          </label>
          <Button
            id="search-artist-button"
            isBtnDisabled={ isBtnDisabled }
            innerText="Pesquisar"
            onClick={ this.handleSubmit }
          />
        </form>
      </div>
    );
  }
}

export default Search;
