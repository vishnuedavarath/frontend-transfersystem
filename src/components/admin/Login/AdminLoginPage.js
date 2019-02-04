import React, { Component } from 'react'

import AdminLoginForm from './AdminLoginForm'
import '../../../assets/loginpage/css/loginform.css';
// import { url } from 'inspector';

class AdminLoginPage extends Component {
	render() {
		return (
    		<div>
				<div className="limiter">
					<div className="container-login100">
						<AdminLoginForm/>
					</div>
				</div>
      		</div>
    	)
  	}
}

export default AdminLoginPage;
