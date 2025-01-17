import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../../assets/loginpage/css/loginform.css";
import { adminActions } from "../../../__actions/adminActions";

import { history } from "../../../__helpers/history";
import { alertActions } from "../../../__actions/alertActions";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    // reset login status
    this.props.dispatch(adminActions.logoutAdmin());
    this.state = {
      penNum: "",
      password: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { penNum, password } = this.state;
    const { dispatch } = this.props;
    if (penNum && password) {
      dispatch(adminActions.loginAdmin(penNum, password));
    }
  }

  render() {
    const { alert } = this.props;
    const { penNum, password, submitted } = this.state;
    return (
      <div className="wrap-login100 p-t-190 p-b-30">
        <form
          name="form"
          className="login100-form"
          onSubmit={this.handleSubmit}
        >
          <div className="login100-form-icon">
            <img
              src={require("../../../assets/loginpage/img/Kerala_Police_Logo.png")}
              alt="KP Logo"
            />
          </div>

          <span className="login100-form-title p-t-20 p-b-45">
            Admin Log In
          </span>
          <br />

          <input
            className="input100"
            type="text"
            name="penNum"
            value={penNum}
            placeholder="PEN Number"
            onChange={this.handleChange}
          />
          {submitted && !penNum && (
            <div className="help-input100 m-b-10">PEN Number is required</div>
          )}
          <br />

          <input
            className="input100"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          {submitted && !password && (
            <div className="help-input100 m-b-10">Password is required</div>
          )}
          <br />

          <div className="help-input100 m-b-10">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
          </div>
          <div className="container-login100-form-btn p-t-10">
            <button className="login100-form-btn">Login</button>
          </div>
          <br />
          <div className="text-center w-full p-t-25 p-b-230">
            <Link to="/forgot" className="txt1">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { loggingin } = state.authentication;
  const { dispatch,alert } = state;
  return {
    dispatch,
    alert
  };
}

export default connect(mapStateToProps)(LoginForm);

// export { connectedLoginForm as LoginForm }
