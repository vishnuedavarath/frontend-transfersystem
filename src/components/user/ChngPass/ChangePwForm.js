import React, { Component } from "react";

import { connect } from "react-redux";

import { userActions } from "../../../__actions/userActions";
require("../../../assets/changepass/css/chngpwform.css");

class ChangePwForm extends Component {
  constructor(props) {
    super(props);
    // console.log(this.state);
    this.state = {
      password: "",
      newPassword: "",
      rePassword: "",
      submitted: false,
      error: ""
    };
    // console.log(this.state);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { password, newPassword, rePassword } = this.state;
    const { dispatch } = this.props;
    if (password && newPassword && rePassword) {
      if (newPassword === rePassword) {
        dispatch(userActions.passchng(newPassword));
      }
      else {
        this.setState({error : "Retyped and New passwords should be same"})
      }
      // dispatch(userActions.getfirst());
    }
  }

  render() {
    console.log();
    const { password, newPassword, rePassword } = this.state;
    return (
      <div className="ChngPgDiv1">
        <header className="profileHeader">
          <h3 className="profileHeaderHead">Kerala Police</h3>
          <div className="profileRight">
            &nbsp;&nbsp;
            <button className="profileLogout" onClick={this.handleclick}>
              Logout
            </button>
          </div>
        </header>
        <div className="ChngPgContent">
          <div className="ChngPgDiv2">
            <h1 className="ChngPgH">Change Password </h1>
            <br />
            <form
              name="form"
              classNames="ChngPgForm1"
              onSubmit={this.handleSubmit}
            >
              <div>
                {/* <label htmlFor="password">Current Password:</label> */}
                <input
                  type="password"
                  className="ChngPgInput"
                  name="password"
                  value={password}
                  placeholder="Current Password"
                  onChange={this.handleChange}
                />
              </div>

              <div>
                {/* <label htmlFor="newPassword">New Password</label> */}
                <input
                  type="password"
                  className="ChngPgInput"
                  name="newPassword"
                  value={newPassword}
                  placeholder="New Password"
                  onChange={this.handleChange}
                />
              </div>

              <div>
                {/* <label htmlFor="rePassword">Retype New Password</label> */}
                <input
                  type="password"
                  className="ChngPgInput"
                  name="rePassword"
                  value={rePassword}
                  placeholder="Retype New Password"
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <button className="ChngPgButton">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingin } = state.authentication;
  return {
    loggingin
  };
}

export default connect(mapStateToProps)(ChangePwForm);
