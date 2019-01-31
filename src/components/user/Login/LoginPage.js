import React, { Component } from 'react'

import LoginForm from './LoginForm'
// import '../../../assets/loginpage/css/loginpage.css'
// import { url } from 'inspector';

class LoginPage extends Component {
	render() {
		return (
    		<div>
				<div className="limiter">
					<div className="container-login100">
						<LoginForm/>
					</div>
				</div>
      		</div>
    	)
  	}
}

export default LoginPage;
