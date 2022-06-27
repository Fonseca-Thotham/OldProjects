import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Button from './Button';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    nome: '',
    isBtnDisabled: true,
    loading: false,
    loggedIn: false,
  }

  btnValidation = () => {
    const { nome } = this.state;
    const minLetters = 3;
    console.log(nome.length);
    if (nome.length >= minLetters) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, this.btnValidation);
  }

  handleSubmit = () => {
    const { nome } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: nome });
      this.setState({ loading: false, loggedIn: true });
    });
  }

  render() {
    const { nome, isBtnDisabled, loading, loggedIn } = this.state;

    const logInScreen = (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="login-name-input">
          Nome:
          <input
            type="text"
            name="nome"
            data-testid="login-name-input"
            id="login-name-input"
            onChange={ this.handleChange }
            value={ nome }
          />
        </label>
        <Button
          id="login-submit-button"
          isBtnDisabled={ isBtnDisabled }
          innerText="Entrar"
          onClick={ this.handleSubmit }
        />
      </form>
    );

    return (
      <div data-testid="page-login">

        { loading ? <Loading /> : logInScreen }
        { loggedIn && <Redirect to="/search" /> }

      </div>
    );
  }
}

export default Login;
