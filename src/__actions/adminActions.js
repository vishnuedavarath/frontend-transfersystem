import { adminConstants } from "../__constants/AdminConstants";
import { adminService } from "../__services/adminService";
import { alertActions } from "./alertActions";
import { history } from "../__helpers/history";

export const adminActions = {
  loginAdmin,
  logoutAdmin,
  passchngadmin,
  getfirstAdmin
};
function loginAdmin(penNum, password) {
  return dispatch => {
    dispatch(request({ penNum }));

    adminService.loginAdmin(penNum, password).then(
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
          history.push("/admin/passchng");
        } else {
          console.log("Reached Profile");
          history.push("/admin");
        }
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: adminConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: adminConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: adminConstants.LOGIN_FAILURE, error };
  }
}
function logoutAdmin() {
  adminService.logoutAdmin();
  return { type: adminConstants.LOGOUT };
}

function passchngadmin(newpassword) {
  return dispatch => {
	dispatch(pwrequest({ newpassword }));
	console.log(newpassword);

    adminService.chngpassadmin(newpassword).then(
      user => {
        console.log(user);
        dispatch(pwsuccess(user));
        history.push("/admin");
      },
      error => {
        dispatch(pwfailure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function pwrequest(user) {
    return { type: adminConstants.CHANGE_PASSWORD_REQUEST, user };
  }
  function pwsuccess(user) {
    return { type: adminConstants.CHANGE_PASSWORD_SUCCESS, user };
  }
  function pwfailure(error) {
    return { type: adminConstants.CHANGE_PASSWORD_FAILURE, error };
  }
}

function getfirstAdmin() {
  return dispatch => {
    dispatch(getfirstrequest());

    adminService.getfirstAdmin().then(
      user => {
        dispatch(getfirstsuccess(user));
      },
      error => {
        dispatch(getfirstfailure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function getfirstrequest() {
    return { type: adminConstants.GET_FIRST_REQUEST };
  }
  function getfirstsuccess() {
    return { type: adminConstants.GET_FIRST_SUCCESS };
  }
  function getfirstfailure(error) {
    return { type: adminConstants.GET_FIRST_FAILURE, error };
  }
}
