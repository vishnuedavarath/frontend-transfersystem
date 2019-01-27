import { combineReducers } from "redux";
import { alert } from "./alertReducer"
import { authentication } from "./authenticationReducer";
// import { users } from "./userReducer";

export default combineReducers({
	alert,
	authentication
})
