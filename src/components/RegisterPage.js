import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../actions/user.actions';
import { store } from '../helpers';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, value) {
    // handle input change and dispatch register
    this.setState({
      user: {
        ...this.state.user,
        [key]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      submitted: true,
    });

    try {
      store.dispatch(userActions.register({ ...this.state.user }));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit} name='form'>
          <div
            className={
              'form-group' + (submitted && !user.username ? ' has-error' : '')
            }>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className='form-control username'
              name='username'
              onChange={(e) => this.handleChange('username', e.target.value)}
            />
            {submitted && !user.username && (
              <div className='help-block'>Username is required</div>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.password ? ' has-error' : '')
            }>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              onChange={(e) => this.handleChange('password', e.target.value)}
            />
            {submitted && !user.password && (
              <div className='help-block'>Password is required</div>
            )}
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>Register</button>
            <Link to='/login' className='btn btn-link'>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

// complete the below function
function mapStateToProps(state) {
  return { userRegistration: state.registration };
}

const registrationPageRedux = connect(mapStateToProps)(RegisterPage);

export {
  RegisterPage as TestRegisterPage,
  registrationPageRedux as RegisterPage,
};
