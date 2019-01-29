
const initialState ={ isreq: false ,isgen: false }
export function transfer(state = initialState, action) {
	switch (action.type) {
	  case 'IS_GENERAL_TRANSFER':
		return {
			isgen: true
		};
	  case 'IS_REQUEST_TRANSFER':
		return {
		  isgen: false
		};
  
	  default:
		return state;
	}
  }
  