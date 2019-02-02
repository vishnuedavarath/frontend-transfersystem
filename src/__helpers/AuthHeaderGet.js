function AdminAuthHeaderGet() {
  // return authorization header with jwt token
  let admin = JSON.parse(localStorage.getItem("admin"));

  if (admin && admin.token) {
    return {
      Authorization: "Bearer " + admin.token
    };
  } else {
    return {};
  }
}

function authHeaderGet() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return {
      Authorization: "Bearer " + user.token
    };
  } else {
    return {};
  }
}



module.exports = {AdminAuthHeaderGet,authHeaderGet}