import { userConstants } from "../__constants/UserConstants";
import { userService } from "../__services/userService";
import { alertActions } from "./alertActions";
import { history } from "../__helpers/history";

export const userActions = {
  login,
  logout,
  getAllStation,
  passchng,
  getfirst,
  getProfile,
  submitPrevStations,
  submitStations,
  reqtype
};

function login(penNum, password) {
  return dispatch => {
    dispatch(request({ penNum }));

    userService.login(penNum, password).then(
      user => {
        dispatch(success(user));
        var p = localStorage.getItem("firsttime");
        var first;
        switch (p) {
          case "true":
            first = true;
            break;
          case "false":
            first = false;
            break;
          default:
            break;
        }
        if (first) {
          console.log("Reached Passchange");
          history.push("/passchng");
        } else {
          console.log("Reached Profile");
          history.push("/");
        }
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
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
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
// const user = localStorage.getItem('user');
function passchng(newpassword) {
  return dispatch => {
    dispatch(pwrequest({ newpassword }));

    userService.chngpass(newpassword).then(
      user => {
        console.log(user);
        dispatch(pwsuccess(user));
        history.push("/");
      },
      error => {
        dispatch(pwfailure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function pwrequest(user) {
    return { type: userConstants.CHANGE_PASSWORD_REQUEST, user };
  }
  function pwsuccess(user) {
    return { type: userConstants.CHANGE_PASSWORD_SUCCESS, user };
  }
  function pwfailure(error) {
    return { type: userConstants.CHANGE_PASSWORD_FAILURE, error };
  }
}

function getfirst() {
  return dispatch => {
    dispatch(getfirstrequest());

    userService.getisfirst().then(
      user => {
        dispatch(getfirstsuccess());
      },
      error => {
        dispatch(getfirstfailure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function getfirstrequest() {
    return { type: userConstants.GET_FIRST_REQUEST };
  }
  function getfirstsuccess() {
    return { type: userConstants.GET_FIRST_SUCCESS };
  }
  function getfirstfailure(error) {
    return { type: userConstants.GET_FIRST_FAILURE, error };
  }
}

function submitPrevStations(opt1, opt2, opt3, user) {
  return dispatch => {
    dispatch(submitprevstationrequest({ opt1, opt2, opt3 }));

    userService.chngpass(opt1, opt2, opt3, user).then(
      user => {
        dispatch(submitprevstationsuccess(user));
        history.push("/");
      },
      error => {
        dispatch(submitprevstationfailure(error));
        // dispatch(alertActions.error(error));
      }
    );
  };

  function submitprevstationrequest(user) {
    return { type: userConstants.SUBMIT_STATION_REQUEST, user };
  }
  function submitprevstationsuccess(user) {
    return { type: userConstants.SUBMIT_STATION_SUCCESS, user };
  }
  function submitprevstationfailure(error) {
    return { type: userConstants.SUBMTI_STATION_FAILURE, error };
  }
}
function submitStations(opt1, opt2, opt3, isgen,isreq) {
  return dispatch => {
    dispatch(submitstationrequest({ opt1, opt2, opt3,isgen,isreq }));

    userService.submitStations(opt1, opt2, opt3).then(
      user => {
        dispatch(submitstationsuccess(user));
      },
      error => {
        dispatch(submitstationfailure(error));
        // dispatch(alertActions.error(error));
      }
    );
  };

  function submitstationrequest(user) {
    return { type: userConstants.SUBMIT_STATION_REQUEST, user };
  }
  function submitstationsuccess(user) {
    return { type: userConstants.SUBMIT_STATION_SUCCESS, user };
  }
  function submitstationfailure(error) {
    return { type: userConstants.SUBMTI_STATION_FAILURE, error };
  }
}

function getAllStation() {
  return dispatch => {
    dispatch(getAllStationRequest());

    userService.getStations().then(
      stations => dispatch(getAllStationSuccess(stations)),
      error => {
        dispatch(getAllStationFailure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function getAllStationRequest() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function getAllStationSuccess(stations) {
    return { type: userConstants.GETALL_SUCCESS, stations };
  }
  function getAllStationFailure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getProfile() {
  return dispatch => {
    // dispatch(getProfileRequest());

    userService.getProfile().then(
      profile => dispatch(getProfileSuccess(profile)),
      error => {
        dispatch(getProfileFailure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

//   function getProfileRequest() {
//     return { type: userConstants.GET_PROFILE_REQUEST };
//   }
  function getProfileSuccess(profile) {
    return { type: userConstants.GET_PROFILE_SUCCESS, profile };
  }
  function getProfileFailure(error) {
    return { type: userConstants.GET_PROFILE_FAILURE, error };
  }
}

function reqtype(gen, req) {
  return dispatch => {
	  if(gen){
		dispatch({type:'IS_GENERAL_TRANSFER',gen});
	  }
	  else{
	
		dispatch({type:'IS_REQUEST_TRANSFER',req});
	  }

  }
}
