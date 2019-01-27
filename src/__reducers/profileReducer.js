import { userConstants } from "../__constants/UserConstants";

export function profile(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_PROFILE_REQUEST:
      return {
        type: "profile-requested",


      };
    case userConstants.GET_PROFILE_SUCCESS:
      return {
		type: "profile-success",
		profile : action.profile
      };
    case userConstants.GET_PROFILE_FAILURE:
      return {};
    default:
      return state;
  }
}