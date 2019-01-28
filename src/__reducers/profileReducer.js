import { userConstants } from "../__constants/UserConstants";

export function profile(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_PROFILE_REQUEST:
      return {


      };
    case userConstants.GET_PROFILE_SUCCESS:
      return {
		
		profile : action.profile
      };
    case userConstants.GET_PROFILE_FAILURE:
      return {};
    default:
      return state;
  }
}