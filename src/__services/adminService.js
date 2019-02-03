import { AdminAuthHeaderPost } from "../__helpers/AuthHeaderPost";
import { AdminAuthHeaderGet } from "../__helpers/AuthHeaderGet";
var jwt_decode = require("jwt-decode");

export const adminService = {
  loginAdmin,
  logoutAdmin,
  chngpassadmin,
  getfirstAdmin,
  GenList,
  openModal,
  genAllot,
  ReqList,
  reqAllot,
  addAdmin,
  searchAdmin,
  editAdmin,
  adminDelete,
  addUser,
  searchUser,
  editUser,
  userDelete,
  addStation,
  searchStation,
  editStation,
  stationDelete,
  userPassword,
  adminPassword,
};
function loginAdmin(penNum, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ penno: penNum, password: password })
  };

  return fetch(`http://68.183.86.24:3000/admin/login`, requestOptions)
    .then(handleResponseLogin)
    .then(user => {
      // console.log(JSON.stringify(user));
      // console.log(user.token);
      // login successful if there's a jwt token in the response
      console.log(user.token);
      let decodedAdmin = jwt_decode(user.token);
      console.log(decodedAdmin);
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("admin", JSON.stringify(user));
        localStorage.setItem("firsttime", decodedAdmin.isFirstTime);
        console.log(typeof decodedAdmin.isFirstTime);
        console.log(localStorage.getItem("admin"));
        console.log(localStorage.getItem("firsttime"));
      }

      return user;
    });
}

function logoutAdmin() {
  // remove user from local storage to log user out
  localStorage.removeItem("admin");
}

function chngpassadmin(newpassword) {
  const requestOptions = {
    method: "POST",
    headers: AdminAuthHeaderPost(),
    body: JSON.stringify({ password: newpassword })
  };
  console.log(requestOptions);
  return fetch(
    `http://68.183.86.24:3000/admin/setpassword`,
    requestOptions
  ).then(handleResponse);
}
function getfirstAdmin() {
  const requestOptions = {
    method: "GET",
    headers: AdminAuthHeaderGet()
  };

  return fetch(`http://68.183.86.24:3000/admin/firsttime`, requestOptions);
}
function GenList(des) {
  const requestOptions = {
    method: "GET",
    headers: AdminAuthHeaderGet()
  };
  console.log(des);
  return fetch("http://68.183.86.24:3000/admin/genlist/" + des, requestOptions)
    .then(handleResponse)
    .then(list => {
      return list;
    });
}
function ReqList(des) {
  const requestOptions = {
    method: "GET",
    headers: AdminAuthHeaderGet()
  };
  console.log(des);
  return fetch("http://68.183.86.24:3000/admin/reqlist/" + des, requestOptions)
    .then(handleResponse)
    .then(list => {
      return list;
    });
}
function openModal(des, cur, op1, op2, op3) {
  const req = {
    designation: des,
    current: cur,
    code1: op1,
    code2: op2,
    code3: op3
  };
  const requestOptions = {
    method: "GET",
    headers: AdminAuthHeaderGet()
  };
  console.log(req);
  return fetch(
    "http://68.183.86.24:3000/admin/returnstation?designation=" +
      des +
      "&current=" +
      cur +
      "&code1=" +
      op1 +
      "&code2=" +
      op2 +
      "&code3=" +
      op3,
    requestOptions
  )
    .then(handleResponse)
    .then(data => {
      return data;
    });
}
function genAllot(pen, stat, des) {
  const requestOptions = {
    method: "POST",
    headers: AdminAuthHeaderPost(),
    body: JSON.stringify({ penno: pen, allotedStation: stat, designation: des })
  };
  console.log(requestOptions);
  return fetch(`http://68.183.86.24:3000/admin/allot`, requestOptions).then(
    handleResponse
  );
}
function reqAllot(pen, stat, des) {
  const requestOptions = {
    method: "POST",
    headers: AdminAuthHeaderPost(),
    body: JSON.stringify({ penno: pen, allotedStation: stat, designation: des })
  };
  console.log(requestOptions);
  return fetch(`http://68.183.86.24:3000/admin/allot`, requestOptions).then(
    handleResponse
  );
}
function addAdmin(penno, name, password, privilege) {
  console.log(AdminAuthHeaderPost());
  const requestOptions = {
    method: "POST",
    headers: AdminAuthHeaderPost(),
    body: JSON.stringify({
      penno: penno,
      name: name,
      privilege: privilege,
      password: password
    })
  };
  console.log(requestOptions);
  return fetch(
    `http://68.183.86.24:3000/admin/adminactions`,
    requestOptions
  ).then(handleResponse);
}
function searchAdmin(penno) {
  const requestOptions = {
    method: "GET",
    headers: AdminAuthHeaderGet()
  };
  return fetch(
    "http://68.183.86.24:3000/admin/adminactions/" + penno,
    requestOptions
  )
    .then(handleResponse)
    .then(data => {
      return data;
    });
}
function editAdmin(penno, name, privilege, id) {
  const requestOptions = {
    method: "PATCH",
    headers: AdminAuthHeaderPost(),
    body: JSON.stringify({
      userId: id,
      penno: penno,
      name: name,
      privilege: privilege
    })
  };
  console.log(requestOptions);
  return fetch(
    `http://68.183.86.24:3000/admin/adminactions`,
    requestOptions
  ).then(handleResponse);
}
function adminDelete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: AdminAuthHeaderGet()
  };
  console.log(requestOptions);
  return fetch(
    "http://68.183.86.24:3000/admin/signup/" + id,
    requestOptions
  ).then(handleResponse);
}
function addUser(penno, name, password, designation) {
  const requestOptions = {
    method: "POST",
    headers: AdminAuthHeaderPost(),
    body: JSON.stringify({
      penno: penno,
      name: name,
      designation: designation,
      password: password
    })
  };
  console.log(requestOptions);
  return fetch(
    `http://68.183.86.24:3000/admin/useractions`,
    requestOptions
  ).then(handleResponse);
}
function searchUser(name) {
  const requestOptions = {
    method: "GET",
    headers: AdminAuthHeaderGet()
  };
  console.log(requestOptions);
  return fetch(
    "http://68.183.86.24:3000/admin/useractions/" + name,
    requestOptions
  )
    .then(handleResponse)
    .then(data => {
      return data;
    });
}
function editUser(id, penno, name, designation) {
  const requestOptions = {
    method: "PATCH",
    headers: AdminAuthHeaderPost(),
    body: JSON.stringify({
      userId: id,
      penno: penno,
      name: name,
      designation: designation
    })
  };
  console.log(requestOptions);
  return fetch(
    `http://68.183.86.24:3000/admin/useractions`,
    requestOptions
  ).then(handleResponse);
}
function userDelete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: AdminAuthHeaderGet()
  };
  console.log(requestOptions);
  return fetch(
    "http://68.183.86.24:3000/admin/useractions/" + id,
    requestOptions
  ).then(handleResponse);
}
function addStation(code, name, si, asi, scpo, tscpo, cpo, wcpo) {
  const requestOptions = {
    method: "POST",
    headers: AdminAuthHeaderPost(),
    body: JSON.stringify({
      statCode: code,
      name: name,
      si: si,
      asi: asi,
      scpo: scpo,
      tscpo: tscpo,
      cpo: cpo,
      wcpo: wcpo
    })
  };
  console.log(requestOptions);
  return fetch(`http://68.183.86.24:3000/admin/station`, requestOptions).then(
    handleResponse
  );
}
function searchStation(name) {
  const requestOptions = {
    method: "GET",
    headers: AdminAuthHeaderGet()
  };
  return fetch(
    "http://68.183.86.24:3000/admin/searchstation?station=" + name,
    requestOptions
  )
    .then(handleResponse)
    .then(data => {
      return data;
    });
}
function editStation(id, code, name, si, asi, scpo, tscpo, cpo, wcpo) {
  const requestOptions = {
    method: "PATCH",
    headers: AdminAuthHeaderPost(),
    body: JSON.stringify({
      statId: id,
      statCode: code,
      name: name,
      si: si,
      asi: asi,
      scpo: scpo,
      tscpo: tscpo,
      cpo: cpo,
      wcpo: wcpo
    })
  };
  console.log(requestOptions);
  return fetch(`http://68.183.86.24:3000/admin/station`, requestOptions).then(
    handleResponse
  );
}
function stationDelete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: AdminAuthHeaderGet()
  };
  console.log(requestOptions);
  return fetch(
    "http://68.183.86.24:3000/admin/station/" + id,
    requestOptions
  ).then(handleResponse);
}
function userPassword(id,password){
	const requestOptions = {
		method: "POST",
		headers: AdminAuthHeaderPost(),
		body: JSON.stringify({
		  userId:id,
		  password:password
		})
	  };
	  console.log(requestOptions);
	  return fetch(`http://68.183.86.24:3000/admin/uspassreset`, requestOptions).then(
		handleResponse
	  );
}
function adminPassword(id,password){
	const requestOptions = {
		method: "POST",
		headers: AdminAuthHeaderPost(),
		body: JSON.stringify({
		  userId:id,
		  password:password
		})
	  };
	  console.log(requestOptions);
	  return fetch(`http://68.183.86.24:3000/admin/adpassreset`, requestOptions).then(
		handleResponse
	  );
}

function handleResponseLogin(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log(response);
    console.log(data.message);
    // console.log(response.token);
    // console.log(data);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logoutAdmin();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function handleResponse(response) {
  console.log("handling");
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log(response);
    // console.log(response.token);
    console.log(data);
    if (!response.ok) {
      if (response.status === 401) {
		// auto logout if 401 response returned from api
		console.log('ada mwona')
        logoutAdmin();
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
