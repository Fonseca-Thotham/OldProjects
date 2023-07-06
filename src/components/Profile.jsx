import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state ={
    userInfo: {},
    loading: false,
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ userInfo: user, loading: false });
  }

  render() {
    const { loading, userInfo } = this.state;
    const contentScreen = (
      <div>
        <img data-testid="profile-image" alt={ userInfo.name } src={ userInfo.image } />
        <h2>
          Nome
          <br />
          <strong>{ userInfo.name }</strong>
        </h2>
        <h2>
          Email
          <br />
          <strong>{ userInfo.email }</strong>
        </h2>
        <h2>
          Descrição
          <br />
          <strong>{ userInfo.description }</strong>
        </h2>
        <Link
          to="/profile/edit"
        >
          Editar perfil
        </Link>
      </div>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : contentScreen}
      </div>
    );
  }
}

export default Profile;
