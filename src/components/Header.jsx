import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  state = {
    user: '',
    loaded: false,
  }

  async componentDidMount() {
    const returnedObj = await getUser();
    this.setState({
      user: returnedObj,
      loaded: true,
    });
  }

  render() {
    const { loaded, user } = this.state;
    return (
      <header data-testid="header-component">
        {
          (loaded) ? (
            <>
              <p data-testid="header-user-name">
                {user.name}
              </p>
              <nav>
                <Link to="/search" data-testid="link-to-search" />
                <Link to="/favorites" data-testid="link-to-favorites" />
                <Link to="/profile" data-testid="link-to-profile" />
              </nav>
            </>
          ) : <Loading />
        }
      </header>
    );
  }
}

export default Header;
