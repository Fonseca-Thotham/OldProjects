import React from 'react';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: false,
    favMusic: [],
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const savedMusic = await getFavoriteSongs();
    this.setState({ favMusic: savedMusic, loading: false });
  }

  someFunction = (fullSong) => {
    const { favMusic } = this.state;
    const favSong = favMusic.some((song) => (
      song.trackId === fullSong.trackId
    ));
    return favSong;
  }

  editFavorite = async (fullSong) => {
    const { favMusic } = this.state;
    this.setState({ loading: true });
    const newFavMusic = favMusic.filter((song) => song.trackId !== fullSong.trackId);
    await removeSong(fullSong);
    this.setState({ favMusic: newFavMusic, loading: false });
  };

  render() {
    const { loading, favMusic } = this.state;
    const contentScreen = (
      <section>
        {favMusic
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
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : contentScreen}
      </div>
    );
  }
}
export default Favorites;
