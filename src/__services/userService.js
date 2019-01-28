// import config from 'config';
import { authHeaderPost } from "../__helpers/AuthHeaderPost";
import { authHeaderGet } from "../__helpers/AuthHeaderGet";
var jwt_decode = require("jwt-decode");

export const userService = {
  login,
  logout,
  chngpass,
  getStations,
  getisfirst,
  getProfile,
  submitStation,
  submitPrevStation
};

function login(penNum, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ penno: penNum, password: password })
  };

  return fetch(`http://68.183.86.24:3000/user/login`, requestOptions)
    .then(handleResponseLogin)
    .then(user => {
      // console.log(JSON.stringify(user));
      // console.log(user.token);
      // login successful if there's a jwt token in the response
      let decoded = jwt_decode(user.token);
      console.log(decoded);
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("firsttime", decoded.isFirstTime);
        console.log(typeof decoded.isFirstTime);
        console.log(localStorage.getItem("user"));
        console.log(localStorage.getItem("firsttime"));
      }

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
function chngpass(newpassword) {
  const requestOptions = {
    method: "POST",
    headers: authHeaderPost(),
    body: JSON.stringify({ password: newpassword })
  };

  return fetch(
    `http://68.183.86.24:3000/user/setpassword`,
    requestOptions
  ).then(handleResponse);
}

function getisfirst() {
  const requestOptions = {
    method: "GET",
    headers: authHeaderGet()
  };

  return fetch(`http://68.183.86.24:3000/user/firsttime`, requestOptions);
}

function getProfile() {
  const requestOptions = {
    method: "GET",
    headers: authHeaderGet()
  };

  return fetch(
    `http://68.183.86.24:3000/user/profile`,
    requestOptions
  ).then(
	  handleResponse)
  .then(
	  profile =>{
		  return profile;
	  }
  )
}

function getStations() {
  const requestOptions = {
    method: "GET",
    headers: authHeaderGet()
  };

  return fetch(`http://68.183.86.24/user/station`, requestOptions).then(
    handleResponse
  );
}

function submitStation(opt1, opt2, opt3, isgen, isreq) {
  const requestOptions = {
    method: "POST",
    headers: authHeaderPost,
    body: JSON.stringify({ opt1: opt1, opt2: opt2, opt3: opt3 })
  };
  if (isgen) {
    return fetch(`http://68.183.86.24:3000/user/gentransfer`, requestOptions).then(
      handleResponse
    );
  }
  if (isreq) {
    return fetch(`http://68.183.86.24:3000/user/reqtransfer`, requestOptions).then(
      handleResponse
    );
  }
}

function submitPrevStation(opt1, opt2, opt3) {
  const requestOptions = {
    method: "POST",
    headers: authHeaderPost,
    body: JSON.stringify({ opt1: opt1, opt2: opt2, opt3: opt3 })
  };
  return fetch(`http://68.183.86.24:3000/user/previous`, requestOptions).then(
    handleResponse
  );
}

function handleResponseLogin(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log(response);
    // console.log(response.token);
    // console.log(data);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        Location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function handleResponse(response) {
	console.log('handling')
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log(response);
    // console.log(response.token);
    console.log(data);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
