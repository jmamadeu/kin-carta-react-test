import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      submitted: true,
    });

    const body = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    });

    fetch('localhost:8000/users/authenticate', {
      method: 'POST',
      body,
    })
      .then((err) => console.log(err))
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  }

  render() {
    const { username, password, submitted } = this.state;

    return (
      <div className='col-md-6 col-md-offset-3'>
        {this.state.error && (
          <div className='alert alert-danger' key={'12'}>
            {this.state.error}
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

function mapStateToProps(state) {}

export { LoginPage as TestLoginPage };
