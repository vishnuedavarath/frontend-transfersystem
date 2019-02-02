
function AdminAuthHeaderPost() {
    // return authorization header with jwt token
    let admin = JSON.parse(localStorage.getItem('admin'));

    if (admin && admin.token) {
        return { 'Content-Type': 'application/json',
        		  'Authorization': 'Bearer ' + admin.token };
    } else {
        return {};
    }
}

function authHeaderPost() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Content-Type': 'application/json',
        		  'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
module.exports = {AdminAuthHeaderPost, authHeaderPost}