import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
            <p data-testid="header-user-name">
              {user.name}
            </p>
          ) : <Loading />
        }
      </header>
    );
  }
}

export default Header;
