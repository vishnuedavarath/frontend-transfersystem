import { userConstants } from '../__constants/UserConstants';
import { userService } from '../__services/userService';
import { alertActions } from './alertActions';
import { history } from '../__helpers/history';

export const userActions = {
    login,
    logout,
	getAll,
    passchng,
    submitStations
};

function login(penNum, password) {
    return dispatch => {
        dispatch(request({ penNum }));

        userService.login(penNum, password).then(
            user => {
                dispatch(success(user));
                if(!localStorage.getItem('firsttime')){
                    history.push('/passchng');
                }
                else{
                    history.push('./profile');
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
        /*todo*/    user => {
            console.log(user);
                dispatch(pwsuccess(user));
                history.push('/profile');
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

// function getfirst() {
//     return dispatch => {
//         dispatch(getfirstrequest());

//         userService.getisfirst().then(
//         /*todo*/    user => {
//                 dispatch(getfirstsuccess(user));
//                 history.push('/profile');
//             },
//             error => {
//                 dispatch(getfirstfailure(error));
//                 dispatch(alertActions.error(error));
//             }
//         );
//     };
// }

function submitStations(opt1, opt2, opt3,user) {
    return dispatch => {
        dispatch(pwrequest({ opt1, opt2, opt3 }));
        
        userService.chngpass(opt1, opt2, opt3, user).then(
        /*todo*/    user => {
                dispatch(pwsuccess(user));
                history.push('/');
            },
            error => {
                dispatch(pwfailure(error));
                // dispatch(alertActions.error(error));
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

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll().then(
            users => dispatch(success(users)),
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: userConstants.GETALL_REQUEST };
    }
    function success(users) {
        return { type: userConstants.GETALL_SUCCESS, users };
    }
    function failure(error) {
        return { type: userConstants.GETALL_FAILURE, error };
    }
}
