import { userConstants } from '../constants';
import { userService } from '../services/user.service';

export const userActions = {
  login,
  logout,
  register,
};

function request(user) {
  return { type: userConstants.LOGIN_REQUEST, user };
}

function success(user) {
  return { type: userConstants.LOGIN_SUCCESS, user };
}

function failure(error) {
  return { type: userConstants.LOGIN_FAILURE, error };
}

function login(username, password) {
  // return the promise using fetch which adds to localstorage on resolve

  return async function loginThunk(dispatch, getState) {
    try {
      dispatch(request({ username }));
      const response = await userService.login(username, password);
      dispatch(success({ ...response }));
    } catch (error) {
      dispatch(failure(error));
    }
  };
}

function logout() {
  // complete this function
  userService.logout();

  return { type: userConstants.LOGOUT };
}

function register(user) {
  // return the promise using fetch which dispatches appropriately

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }

  return async function registerThunk(dispatch, getState) {
    try {
      console.log(user);
      dispatch(request(user));
      const response = await userService.register(user);
      dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
    }
  };
}
