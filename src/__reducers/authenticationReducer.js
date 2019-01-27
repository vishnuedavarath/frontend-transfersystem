import { userConstants } from "../__constants/UserConstants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.CHANGE_PASSWORD_REQUEST:
      return {
        changingpw: true,
        user: action.user
      };
    case userConstants.CHANGE_PASSWORD_SUCCESS:
      return {
        changedpw: true,
        user: action.user
      };
    case userConstants.CHANGE_PASSWORD_FAILURE:
      return {};

    default:
      return state;
  }
}
