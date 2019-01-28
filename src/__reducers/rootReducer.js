import { combineReducers } from "redux";
import { alert } from "./alertReducer"
import { authentication } from "./authenticationReducer";
import { profile } from "./profileReducer"
import { transfer } from "./transferReducer"
// import { users } from "./userReducer";

export default combineReducers({
	alert,
	authentication,
	profile,
	transfer
})
