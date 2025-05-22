import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { loginAction, LoginPayload } from '../store/userSlice';

interface LoginState {
  email: string;
  password: string;
}

interface LoginDispatchProps {
  login: (credentials: LoginPayload) => void;
}

type Props = LoginDispatchProps;

class Login extends Component<Props, LoginState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    } as Pick<LoginState, keyof LoginState>);
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials: LoginPayload = {
      email: this.state.email,
      password: this.state.password
    };
    
    // Dispatch the login action with the form data
    this.props.login(credentials);
  }

  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="input"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, unknown, AnyAction>): LoginDispatchProps => {
  return {
    login: (credentials: LoginPayload) => {
      dispatch(loginAction(credentials as any));
    }
  };
};

export default connect(null, mapDispatchToProps)(Login); 