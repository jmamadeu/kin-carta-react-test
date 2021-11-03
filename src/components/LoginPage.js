import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../actions/user.actions';
import { history, store } from '../helpers';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirect() {
    if (this.props.userStatus.loggedIn) {
      history.push('/');
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      submitted: true,
    });

    if (!this.state.username || !this.state.password) return;

    try {
      store.dispatch(
        userActions.login(this.state.username, this.state.password)
      );

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { username, password, submitted } = this.state;

    return (
      <div className='col-md-6 col-md-offset-3'>
        {this.props.userStatus.error && (
          <div className='alert alert-danger' key={'12'}>
            {this.props.userStatus.error}
          </div>
        )}

        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} name='form'>
          <div
            className={
              'form-group' + (submitted && !username ? ' has-error' : '')
            }>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className='form-control username'
              name='username'
              onChange={(e) => {
                this.handleChange('username', e.target.value);
              }}
            />
            {submitted && !username && (
              <div className='help-block'>Username is required</div>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !password ? ' has-error' : '')
            }>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              onChange={(e) => {
                this.handleChange('password', e.target.value);
              }}
            />
            {submitted && !password && (
              <div className='help-block'>Password is required</div>
            )}
          </div>
          <div className='form-group'>
            <button className='btn btn-primary mr-2'>Login</button>

            <Link to='/register' className='btn btn-link'>
              Register
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const loginPageWithRedux = connect((state) => ({
  userStatus: state.authentication,
}))(LoginPage);

export { LoginPage as TestLoginPage, loginPageWithRedux as LoginPage };
