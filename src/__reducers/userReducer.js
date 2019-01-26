import { userConstants } from '../__constants/UserConstants';

export function stations(state = {}, action) {
    switch (action.type) {
    case userConstants.GETALL_REQUEST:
        return {
        loading: true
        };
    case userConstants.GETALL_SUCCESS:
        return {
        items: action.stations
        };
    case userConstants.GETALL_FAILURE:
        return { 
        error: action.error
        };
    default:
        return state
    }
}
