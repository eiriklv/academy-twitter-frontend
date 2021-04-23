import React from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/session';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signupForm: {
        handle: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
      isSigningUp: false,
      error: null,
    };
  }

  handleInputChange(field, event) {
    this.setState({
      signupForm: {
        ...this.state.signupForm,
        [field]: event.target.value,
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { history } = this.props;

    const {
      name,
      handle,
      password,
      confirmPassword
    } = this.state.signupForm;

    this.setState({
      isSigningUp: true,
      error: null
    });

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const result = await registerUser({
        name,
        handle,
        password,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.token) {
        throw new Error('No token received - try again');
      }

      localStorage.setItem('twitter_clone_token', result.token);
      history.push('/');
    } catch (error) {
      this.setState({ error, isSigningUp: false });
    }
  }

  render() {
    const { isSigningUp, error } = this.state;

    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Signup</h1>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>
              Full name:
              <input
                type="text"
                value={this.state.signupForm.name}
                onChange={this.handleInputChange.bind(this, 'name')}
              />
              </label>
          </div>
          <div>
            <label>
              Handle (username):
              <input
                type="text"
                value={this.state.signupForm.handle}
                onChange={this.handleInputChange.bind(this, 'handle')}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={this.state.signupForm.password}
                onChange={this.handleInputChange.bind(this, 'password')}
              />
            </label>
          </div>
          <div>
            <label>
              Confirm password:
              <input
                type="password"
                value={this.state.signupForm.confirmPassword}
                onChange={this.handleInputChange.bind(this, 'confirmPassword')}
              />
            </label>
          </div>
          <div>
            <button type="submit">Sign up</button>
          </div>
          <div>
            {isSigningUp && <p>Signing up...</p>}
            {error && <p>Unable to sign up: {error.message}</p>}
          </div>
          <div>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
